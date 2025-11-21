// src/api/posts.ts
import api from "@src/api/client";

export type ContentType = "TEXT" | "IMAGE";

export type PostBlockText = { type: "TEXT"; order: number; content: string };
export type PostBlockImage = { type: "IMAGE"; order: number; url: string };
export type PostBlock = PostBlockText | PostBlockImage;

export type PostSummary = {
  id: string;
  title: string;
  createdAt: string;
  author: { nickname: string };
  thumbnailUrl?: string;
  commentCount: number;
  excerpt?: string;
};

export type PageResult<T> = {
  data: T[];
  page: number;
  totalPages: number;
};

export type PostDetail = {
  id: string;
  title: string;
  createdAt: string;
  author: { nickname: string; avatarUrl?: string; introduction?: string };
  blocks: PostBlock[];
  comments: Array<{
    id: string;
    content: string;
    createdAt: string;
    mine?: boolean;
    author: { nickname: string; avatarUrl?: string };
  }>;
  mine?: boolean;
};

/* ---------- API 응답 타입 (로우 타입) ---------- */

type ApiPostContent = {
  contentOrder: number;
  content: string;
  contentType: string; // 백엔드에서 오는 raw 값 (TEXT/IMAGE 등)
};

type ApiPostListItem = {
  postId: string;
  title: string;
  nickName: string;
  profileUrl?: string;
  createdAt: string;
  commentCount: number;
  contents?: ApiPostContent[];
};

type ApiPostListData = {
  posts: ApiPostListItem[];
  pageMax: number;
};

type ApiPostListResponse = {
  code: number;
  message: string;
  data: ApiPostListData;
};

type ApiPostDetailComment = {
  commentId: number;
  content: string;
  nickName: string;
  profileUrl?: string;
  createdAt: string;
  isOwner: boolean;
};

type ApiPostDetailData = {
  postId: string;
  title: string;
  contents: ApiPostContent[];
  isOwner: boolean;
  comments: ApiPostDetailComment[];
  nickName: string;
  profileUrl?: string;
  introduction?: string;
  createdAt: string;
};

type ApiPostDetailResponse = {
  code: number;
  message: string;
  data: ApiPostDetailData;
};

/* ---------- 헬퍼 함수들 ---------- */

function normalizeContentType(raw: string | undefined | null): ContentType | undefined {
  const upper = (raw ?? "").toUpperCase();
  if (upper === "TEXT") return "TEXT";
  if (upper === "IMAGE") return "IMAGE";
  return undefined;
}

function sortContents(contents?: ApiPostContent[]): ApiPostContent[] {
  if (!contents) return [];
  return [...contents].sort((a, b) => a.contentOrder - b.contentOrder);
}

function mapApiPostToSummary(apiPost: ApiPostListItem): PostSummary {
  const sorted = sortContents(apiPost.contents);

  const firstText = sorted.find((c) => normalizeContentType(c.contentType) === "TEXT");
  const firstImage = sorted.find((c) => normalizeContentType(c.contentType) === "IMAGE");

  const excerpt = firstText?.content;
  const thumbnailUrl = firstImage?.content;

  return {
    id: apiPost.postId,
    title: apiPost.title,
    createdAt: apiPost.createdAt,
    author: { nickname: apiPost.nickName },
    thumbnailUrl,
    commentCount: apiPost.commentCount ?? 0,
    excerpt,
  };
}

function mapPageResult<T>(items: T[], page: number, totalPages: number): PageResult<T> {
  return {
    data: items,
    page,
    totalPages,
  };
}

function mapApiContentToBlock(content: ApiPostContent): PostBlock {
  const type = normalizeContentType(content.contentType);
  if (type === "IMAGE") {
    return {
      type: "IMAGE",
      order: content.contentOrder,
      url: content.content,
    };
  }
  // 디폴트: TEXT 처리
  return {
    type: "TEXT",
    order: content.contentOrder,
    content: content.content,
  };
}

function mapApiCommentToComment(c: ApiPostDetailComment) {
  return {
    id: String(c.commentId),
    content: c.content,
    createdAt: c.createdAt,
    mine: c.isOwner,
    author: {
      nickname: c.nickName,
      avatarUrl: c.profileUrl,
    },
  };
}

/* ---------- 실제 API 함수들 ---------- */

// 게시글 리스트 조회 (스웨거: GET /posts/all, /posts/all/token)
export async function getPosts(page: number, size: number): Promise<PageResult<PostSummary>> {
  // 🔥 지금은 토큰 유무 상관없이 공용 리스트 API만 사용
  // const hasToken = !!localStorage.getItem("accessToken");
  // const url = hasToken ? "/posts/all/token" : "/posts/all";

  const url = "/posts/all";

  const { data } = await api.get<ApiPostListResponse>(url, {
    params: { page, size },
  });

  const items = (data.data.posts ?? []).map(mapApiPostToSummary);
  const totalPages = data.data.pageMax ?? 0;

  return mapPageResult(items, page, totalPages);
}

// 게시글 상세 조회 (스웨거: GET /posts, /posts/token)
export async function getPostDetail(id: string): Promise<PostDetail> {
  const hasToken = !!localStorage.getItem("accessToken");
  const url = hasToken ? "/posts/token" : "/posts";

  const { data } = await api.get<ApiPostDetailResponse>(url, {
    params: { postId: id },
  });

  const d = data.data;

  const blocks: PostBlock[] = sortContents(d.contents).map(mapApiContentToBlock);

  const comments = (d.comments ?? []).map(mapApiCommentToComment);

  return {
    id: d.postId,
    title: d.title,
    createdAt: d.createdAt,
    author: {
      nickname: d.nickName,
      avatarUrl: d.profileUrl,
      introduction: d.introduction,
    },
    blocks,
    comments,
    mine: d.isOwner,
  };
}

export async function createPost(payload: {
  title: string;
  blocks: PostBlock[];
}): Promise<{ id?: string }> {
  const body = {
    title: payload.title,
    contents: payload.blocks.map((b) =>
      b.type === "IMAGE"
        ? { contentOrder: b.order, content: b.url, contentType: "IMAGE" }
        : { contentOrder: b.order, content: b.content, contentType: "TEXT" }
    ),
  };

  const { data } = await api.post<{
    code: number;
    message: string;
    data: { postId?: string };
  }>("/posts", body);

  return { id: data?.data?.postId };
}

export async function updatePost(
  id: string,
  payload: { title: string; blocks: PostBlock[] }
): Promise<unknown> {
  const body = {
    title: payload.title,
    contents: payload.blocks.map((b) =>
      b.type === "IMAGE"
        ? { contentOrder: b.order, content: b.url, contentType: "IMAGE" }
        : { contentOrder: b.order, content: b.content, contentType: "TEXT" }
    ),
  };

  const { data } = await api.patch<{
    code: number;
    message: string;
    data: unknown;
  }>("/posts", body, { params: { postId: id } });

  return data?.data;
}

export async function deletePost(id: string): Promise<unknown> {
  const { data } = await api.delete<{
    code: number;
    message: string;
    data: unknown;
  }>("/posts", {
    params: { postId: id },
  });

  return data?.data;
}

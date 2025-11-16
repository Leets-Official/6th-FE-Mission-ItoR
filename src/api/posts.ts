// src/api/posts.ts
import api from "./client";

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

export async function getPosts(page: number, size: number) {
  const hasToken = !!localStorage.getItem("accessToken");
  const url = hasToken ? "/posts/all/token" : "/posts/all";

  const { data } = await api.get<{
    code: number;
    message: string;
    data: {
      posts: Array<{
        postId: string;
        title: string;
        nickname: string;
        profileUrl?: string;
        createdAt: string;
        commentCount: number;
        contents?: Array<{
          contentOrder: number;
          content: string;
          contentType: "TEXT" | "IMAGE" | string;
        }>;
      }>;
      pageMax: number;
    };
  }>(url, { params: { page, size } });

  const items: PostSummary[] =
    data?.data?.posts?.map((p) => {
      const contents = p.contents ?? [];

      // contentOrder 기준으로 정렬
      const sorted = [...contents].sort(
        (a, b) => a.contentOrder - b.contentOrder
      );

      // 첫 번째 TEXT 블록을 excerpt로 사용
      const firstText = sorted.find(
        (c) => (c.contentType || "").toUpperCase() === "TEXT"
      );
      const excerpt = firstText?.content;

      // 첫 번째 IMAGE 블록을 썸네일로 사용 (있으면)
      const firstImage = sorted.find(
        (c) => (c.contentType || "").toUpperCase() === "IMAGE"
      );
      const thumbnailUrl = firstImage?.content;

      return {
        id: p.postId,
        title: p.title,
        createdAt: p.createdAt,
        author: { nickname: p.nickname },
        thumbnailUrl,
        commentCount: p.commentCount ?? 0,
        excerpt,
      } as PostSummary;
    }) ?? [];

  return {
    data: items,
    page,
    totalPages: data?.data?.pageMax ?? 0,
  } as PageResult<PostSummary>;
}

export async function getPostDetail(id: string) {
  const hasToken = !!localStorage.getItem("accessToken");
  const url = hasToken ? "/posts/token" : "/posts";

  const { data } = await api.get<{
    code: number;
    message: string;
    data: {
      postId: string;
      title: string;
      contents: Array<{
        contentOrder: number;
        content: string;
        contentType: "TEXT" | "IMAGE" | string;
      }>;
      isOwner: boolean;
      comments: Array<{
        commentId: string;
        content: string;
        nickname: string;
        profileUrl?: string;
        createdAt: string;
        isOwner: boolean;
      }>;
      nickname: string;
      profileUrl?: string;
      introduction?: string;
      createdAt: string;
    };
  }>(url, { params: { postId: id } });

  const d = data.data;

  const blocks: PostBlock[] = (d.contents ?? [])
    .sort((a, b) => a.contentOrder - b.contentOrder)
    .map((c) =>
      (c.contentType || "").toUpperCase() === "IMAGE"
        ? ({ type: "IMAGE", order: c.contentOrder, url: c.content } as PostBlockImage)
        : ({ type: "TEXT", order: c.contentOrder, content: c.content } as PostBlockText)
    );

  const comments =
    d.comments?.map((c) => ({
      id: c.commentId,
      content: c.content,
      createdAt: c.createdAt,
      mine: c.isOwner,
      author: { nickname: c.nickname, avatarUrl: c.profileUrl },
    })) ?? [];

  return {
    id: d.postId,
    title: d.title,
    createdAt: d.createdAt,
    author: { nickname: d.nickname, avatarUrl: d.profileUrl, introduction: d.introduction },
    blocks,
    comments,
    mine: d.isOwner,
  } as PostDetail;
}

export async function createPost(payload: { title: string; blocks: PostBlock[] }) {
  const body = {
    title: payload.title,
    contents: payload.blocks.map((b) =>
      b.type === "IMAGE"
        ? { contentOrder: b.order, content: b.url, contentType: "IMAGE" }
        : { contentOrder: b.order, content: b.content, contentType: "TEXT" }
    ),
  };
  const { data } = await api.post<{ code: number; message: string; data: { postId?: string } }>(
    "/posts",
    body
  );
  return { id: data?.data?.postId } as { id?: string };
}

export async function updatePost(id: string, payload: { title: string; blocks: PostBlock[] }) {
  const body = {
    title: payload.title,
    contents: payload.blocks.map((b) =>
      b.type === "IMAGE"
        ? { contentOrder: b.order, content: b.url, contentType: "IMAGE" }
        : { contentOrder: b.order, content: b.content, contentType: "TEXT" }
    ),
  };
  const { data } = await api.patch<{ code: number; message: string; data: unknown }>(
    "/posts",
    body,
    { params: { postId: id } }
  );
  return data?.data;
}

export async function deletePost(id: string) {
  const { data } = await api.delete<{ code: number; message: string; data: unknown }>("/posts", {
    params: { postId: id },
  });
  return data?.data;
}

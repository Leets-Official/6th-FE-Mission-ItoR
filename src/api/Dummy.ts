import Img from "@/assets/svgs/Img.png";

export interface Post {
  id: number;
  title: string;      // 게시글 제목
  content: string;    // 게시글 내용
  author: string;     // 작성자
  createdAt: string;  // 작성일
  commentsCount: number;
  photoUrl?: string;  // 사진 있을 때
}

export const dummyPosts: Post[] = [
  {
    id: 1,
    title: "16 Title one line",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Mapper가 어떻게 작동하는지 부터 다시 되짚어보며 문제를 해결해봤다.",
    author: "닉네임",
    createdAt: "2025-10-17",
    commentsCount: 3,
    photoUrl: Img,
  },
  {
    id: 2,
    title: "16 Title one line",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    author: "김철수",
    createdAt: "2025-10-16",
    commentsCount: 0,
  },
  {
    id: 3,
    title: "16 Title one line",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Mapper가 어떻게 작동하는지 부터 다시 되짚어보며 문제를 해결해봤다.",
    author: "이영희",
    createdAt: "2025-10-15",
    commentsCount: 5,
    photoUrl: Img,
  },
  {
    id: 4,
    title: "16 Title one line",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    author: "박민수",
    createdAt: "2025-10-14",
    commentsCount: 2,
  },
];

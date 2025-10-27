import Img from "@/assets/svgs/Img.png"; // 게시글/프로필 기본 이미지

export interface Comment {
  id: number;
  author: string;
  content: string;
  createdAt: string;
}

export interface Post {
  id: number;
  title: string;      
  content: string;    
  author: string;     
  createdAt: string;  
  commentsCount: number;
  comments?: Comment[];
  photoUrl?: string;      // 게시글 사진
  profileUrl?: string;    // 작성자 프로필 사진
  profileIntro?: string;  // 작성자 한줄소개
}

export const dummyPosts: Post[] = [
  {
    id: 1,
    title: "16 Title one line",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Mapper가 어떻게 작동하는지 부터 다시 되짚어보며 문제를 해결해봤다.",
    author: "닉네임",
    createdAt: "Fed 17. 2025.",
    commentsCount: 3,
    comments: [
      { id: 1, author: "철수", content: "응원합니다!", createdAt: "2025-10-17" },
      { id: 2, author: "영희", content: "좋은 글이에요!", createdAt: "2025-10-17" },
      { id: 3, author: "홍길동", content: "많이 배우고 갑니다.", createdAt: "2025-10-17" },
    ],
    photoUrl: Img,
    profileUrl: Img,
    profileIntro: "블로그 운영자 한줄소개 예시",
  },
  {
    id: 2,
    title: "16 Title one line",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    author: "홍길동",
    createdAt: "Fed 17. 2025.",
    commentsCount: 0,
    profileUrl: Img,
    profileIntro: "김철수 소개",
  },
  {
    id: 3,
    title: "16 Title one line",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Mapper가 어떻게 작동하는지 부터 다시 되짚어보며 문제를 해결해봤다.",
    author: "홍길동",
    createdAt: "Fed 17. 2025.",
    commentsCount: 2,
    comments: [
      { id: 1, author: "홍길동", content: "정말 유익한 글이에요.", createdAt: "2025-10-15" },
      { id: 2, author: "철수", content: "많이 배우고 갑니다.", createdAt: "2025-10-15" },
    ],
    photoUrl: Img,
    profileUrl: Img,
    profileIntro: "이영희 블로그 소개",
  },
  {
    id: 4,
    title: "16 Title one line",
    content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    author: "박민수",
    createdAt: "Fed 17. 2025.",
    commentsCount: 0,
    profileUrl: Img,
    profileIntro: "박민수 소개",
  },
];

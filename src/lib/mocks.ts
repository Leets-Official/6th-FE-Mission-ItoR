// 상세 페이지용
export type DetailBlock = { order: number; type: 'TEXT' | 'IMAGE'; value: string };

// 댓글 모델 명시
export type CommentModel = {
  id: number;
  content: string;
  nickName: string;
  createdAt: string;
  profileUrl?: string;
  mine?: boolean;
};

// 포스트 상세 데이터 타입
export type PostDetailData = {
  postId: number;
  title: string;
  contents: DetailBlock[];
  author: { nickName: string; profileUrl: string; introduction?: string };
  createdAt: string;
  comments: CommentModel[];
};

export const postDetailMock: PostDetailData = {
  postId: 101,
  title: '블로그 상세 페이지 데모',
  contents: [
    { order: 1, type: 'TEXT', value: '상세 페이지 UI 전용 목데이터입니다.' },
    { order: 2, type: 'IMAGE', value: 'https://picsum.photos/seed/detail-1/800/420' },
    { order: 3, type: 'TEXT', value: '텍스트와 이미지를 교차로 렌더링합니다.' },
    { order: 4, type: 'IMAGE', value: 'https://picsum.photos/seed/detail-2/800/420' },
  ],
  author: {
    nickName: 'saeryeom',
    profileUrl: 'https://i.pravatar.cc/100?img=12',
    introduction: '기록하는 개발자',
  },
  createdAt: new Date('2025-02-17').toISOString(),
  comments: [
    { id: 1, content: '좋은 글 잘 읽었습니다.', nickName: 'reader01', createdAt: new Date().toISOString() },
    { id: 2, content: '동감합니다!', nickName: 'saeryeom', mine: true, createdAt: new Date().toISOString() },
  ],
};

import { PostDetail } from '@/types/blog';

// 블로그 상세 페이지용 고정 데이터 (스웨거 구조에 맞춤)
export const mockPostDetail: PostDetail = {
  postId: 999,
  title: '테스트 블로그 상세 페이지',
  contents: [
    {
      contentOrder: 1,
      content: '이것은 상세 페이지 테스트를 위한 고정된 데이터입니다. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      contentType: 'TEXT',
    },
    {
      contentOrder: 2,
      content: 'https://picsum.photos/seed/blogdetail1/800/400',
      contentType: 'IMAGE',
    },
    {
      contentOrder: 3,
      content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      contentType: 'TEXT',
    },
    {
      contentOrder: 4,
      content: 'https://picsum.photos/seed/blogdetail2/800/400',
      contentType: 'IMAGE',
    },
    {
      contentOrder: 5,
      content: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 감사합니다!',
      contentType: 'TEXT',
    },
  ],
  isOwner: true,
  comments: [
    {
      commentId: 1,
      content: '정말 좋은 글이네요! 많은 도움이 되었습니다.',
      nickName: 'User1',
      profileUrl: 'https://i.pravatar.cc/150?img=1',
      createdAt: new Date('2024-10-14').toISOString(),
      isOwner: false,
    },
    {
      commentId: 2,
      content: '감사합니다. 잘 읽었습니다.',
      nickName: 'User2',
      profileUrl: 'https://i.pravatar.cc/150?img=2',
      createdAt: new Date('2024-10-14').toISOString(),
      isOwner: false,
    },
    {
      commentId: 3,
      content: '다음 글도 기대하겠습니다!',
      nickName: 'User3',
      profileUrl: 'https://i.pravatar.cc/150?img=3',
      createdAt: new Date('2024-10-14').toISOString(),
      isOwner: false,
    },
  ],
  nickName: 'TestUser',
  profileUrl: 'https://i.pravatar.cc/150?img=10',
  introduction: '안녕하세요. 테스트 유저입니다.',
  createdAt: new Date('2024-10-14').toISOString(),
};

// 댓글이 없는 게시물
export const mockPostDetailNoComments: PostDetail = {
  postId: 998,
  title: '댓글이 없는 블로그 게시물',
  contents: [
    {
      contentOrder: 1,
      content: '이 게시물에는 아직 댓글이 없습니다. 첫 번째 댓글을 달아주세요!',
      contentType: 'TEXT',
    },
    {
      contentOrder: 2,
      content: 'https://picsum.photos/seed/nocomments1/800/400',
      contentType: 'IMAGE',
    },
    {
      contentOrder: 3,
      content: '많은 관심과 응원 부탁드립니다.',
      contentType: 'TEXT',
    },
  ],
  isOwner: true,
  comments: [],
  nickName: 'TestUser',
  profileUrl: 'https://i.pravatar.cc/150?img=10',
  introduction: '안녕하세요. 테스트 유저입니다.',
  createdAt: new Date('2024-10-14').toISOString(),
};

// 내 댓글과 남의 댓글이 섞여있는 게시물
export const mockPostDetailWithMyComments: PostDetail = {
  postId: 997,
  title: 'CommentInput 테스트용 블로그 포스트',
  contents: [
    {
      contentOrder: 1,
      content: 'CommentInput 컴포넌트를 테스트하기 위한 블로그 포스트입니다. 내 댓글과 다른 사람의 댓글이 섞여 있어 더보기 아이콘이 조건부로 표시되는 것을 확인할 수 있습니다.',
      contentType: 'TEXT',
    },
    {
      contentOrder: 2,
      content: 'https://picsum.photos/seed/commenttest/800/400',
      contentType: 'IMAGE',
    },
    {
      contentOrder: 3,
      content: '댓글을 통해 자유롭게 의견을 나눠주세요!',
      contentType: 'TEXT',
    },
  ],
  isOwner: false,
  comments: [
    {
      commentId: 101,
      content: '좋은 글 감사합니다!',
      nickName: 'User1',
      profileUrl: 'https://i.pravatar.cc/150?img=1',
      createdAt: new Date('2025-02-17').toISOString(),
      isOwner: false,
    },
    {
      commentId: 102,
      content: '정말 유익한 내용이네요. 많은 도움이 되었습니다.',
      nickName: 'TestUser',
      profileUrl: 'https://i.pravatar.cc/150?img=10',
      createdAt: new Date('2025-02-18').toISOString(),
      isOwner: true,
    },
    {
      commentId: 103,
      content: '다음 글도 기대하겠습니다!',
      nickName: 'User2',
      profileUrl: 'https://i.pravatar.cc/150?img=2',
      createdAt: new Date('2025-02-19').toISOString(),
      isOwner: false,
    },
    {
      commentId: 104,
      content: '저도 비슷한 경험이 있어서 공감이 되네요.',
      nickName: 'TestUser',
      profileUrl: 'https://i.pravatar.cc/150?img=10',
      createdAt: new Date('2025-02-20').toISOString(),
      isOwner: true,
    },
    {
      commentId: 105,
      content: '질문이 하나 있는데, 혹시 추가 설명 가능할까요?',
      nickName: 'User3',
      profileUrl: 'https://i.pravatar.cc/150?img=3',
      createdAt: new Date('2025-02-21').toISOString(),
      isOwner: false,
    },
  ],
  nickName: 'BlogAuthor',
  profileUrl: 'https://i.pravatar.cc/150?img=20',
  introduction: '기술 블로그를 운영하고 있는 개발자입니다.',
  createdAt: new Date('2025-02-17').toISOString(),
};


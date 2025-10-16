import { faker } from '@faker-js/faker';

// 홍길동(깃로그)의 고정 포스트
const hongGilDongPost = {
  id: 1001,
  title: '깃로그와 함께하는 개발 여정',
  content: '안녕하세요, 깃로그입니다! 오늘은 개발자로서 성장하는 과정에서 배운 것들을 공유하고자 합니다.',
  nickName: '깃로그',
  createAt: new Date('2024-10-15').toISOString(),
  image: 'https://picsum.photos/seed/gitlog1/220/220',
  commentCount: 2,
  comments: [
    {
      id: 1,
      nickName: 'DevFan',
      profileImage: 'https://i.pravatar.cc/150?img=5',
      createAt: new Date('2024-10-15').toISOString(),
      content: '깃로그님 글 항상 잘 보고 있습니다!',
    },
    {
      id: 2,
      nickName: 'Coder123',
      profileImage: 'https://i.pravatar.cc/150?img=6',
      createAt: new Date('2024-10-15').toISOString(),
      content: '정말 공감되는 내용이네요. 감사합니다.',
    },
  ],
  profileImage: 'https://i.pravatar.cc/150?img=30',
};

export const mockPosts = [hongGilDongPost, ...Array.from({ length: 19 }, (_, i) => {
  const now = new Date();

  const randomMinutesAgo = faker.number.int({ min: 0, max: 7200 });
  const createdAt = new Date(now.getTime() - randomMinutesAgo * 60 * 1000).toISOString();

  const commentCount = faker.number.int({ min: 0, max: 50 });

  const comments = Array.from({ length: commentCount }, (_, idx) => ({
    id: idx + 1,
    nickName: faker.internet.username(),
    profileImage: faker.image.avatar(),
    createAt: createdAt,
    content: faker.lorem.sentence(),
  }));

  return {
    id: i + 2,
    title: faker.lorem.words(),
    content: Math.random() < 0.5 ? faker.lorem.paragraph() : faker.lorem.paragraphs(5),
    nickName: faker.internet.username(),
    createAt: createdAt,
    image: Math.random() < 0.5 ? `https://picsum.photos/seed/${faker.string.uuid()}/220/220` : undefined,
    commentCount: commentCount,
    comments: comments,
    profileImage: faker.image.avatar(),
  };
})];

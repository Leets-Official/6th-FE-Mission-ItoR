export interface PostContent {
  content: string
  contentType: 'TEXT' | 'IMAGE'
}

export interface Post {
  postId: string
  title: string
  nickName: string
  profileUrl: string
  createdAt: string
  commentCount: number
  contents: PostContent[]
}

import { useState } from "react";
import Header from "@/components/Header/Header";
import Avatar from "@/components/Avatar/Avatar";
import CommentSection from "@/components/Blog/CommentSection/CommentSection";
import * as S from "./PostDetail.styled";

export default function PostDetail() {
  const [isLogin, setIsLogin] = useState(false);

  const post = {
    title: "32 Title one line",
    nickName: "닉네임",
    createdAt: "Feb 17, 2025 · 19:20",
    profileUrl: "https://i.pravatar.cc/40?img=3",
    content: `
Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.

\`\`\`java
@Mapper
public interface TestMapper {
  void updateHuman(TestDto testDto, @MappingTarget Test test);
}
\`\`\`

It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

\`\`\`java
@Mapper
public interface HumanMapper {
  void updateHuman(HumanDto humanDto, @MappingTarget Human human);
}
\`\`\`
    `,
  };

  return (
    <div className={S.page}>
      <div className="fixed top-0 left-0 z-50 w-full">
        <Header title="GITLOG" variant="chatMenu" />
      </div>
      <div className="h-[70px]" />

      <main className={S.container}>
        <section className={S.group}>
          <h1 className={S.title}>{post.title}</h1>

          <div className={S.meta}>
            <Avatar src={post.profileUrl} size="xs" />
            <span className={S.nick}>{post.nickName}</span>
            <span className={S.date}>{post.createdAt}</span>
          </div>
        </section>

        <div className={S.divider} />

        <section className={S.group}>
          <article
            className={S.content}
            dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
          />
        </section>

        <div className={S.divider} />

        <section className={S.group}>
          <CommentSection
            isLoggedIn={isLogin}
            onLoginClick={() => setIsLogin(true)}
            onSubmit={(text) => alert(`댓글 등록: ${text}`)}
            postAuthorProfile={post.profileUrl}
            postAuthorName={post.nickName}
          />
        </section>
      </main>
    </div>
  );
}

function renderMarkdown(text: string) {
  return text
    .replace(/```(.*?)```/gs, '<pre class="code-block"><code>$1</code></pre>')
    .replace(/\n/g, "<br>");
}

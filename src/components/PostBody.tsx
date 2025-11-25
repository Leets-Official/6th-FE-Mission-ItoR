// src/components/PostBody.tsx
import React from "react";
import { S } from "@/styles/BlogDetail.styles";
import { ContentBlock } from "@/api/posts";

interface PostBodyProps {
  contents: ContentBlock[];
}

const PostBody: React.FC<PostBodyProps> = ({ contents }) => {
  const textContents = contents?.filter((c) => c.contentType === "TEXT") || [];
  const imageContents = contents?.filter((c) => c.contentType === "IMAGE") || [];

  return (
    <>
      <div className={S.postBody}>
        {textContents.map((block) => (
          <React.Fragment key={block.contentOrder}>
            {block.content.replace(/<[^>]*>?/gm, "")}
            {"\n"}
          </React.Fragment>
        ))}
      </div>

      {imageContents.map((img, idx) => (
        <div key={idx} className={S.postImageWrapper}>
          <img src={img.content} alt={`post-image-${idx}`} className={S.postImage} />
        </div>
      ))}
    </>
  );
};

export default PostBody;

// src/components/Editor.tsx
import React from 'react';
import LineEnd from '@/assets/svgs/LineEnd.svg?react';
import { S } from '@/styles/BlogWrite.styles';
import { EditorBlock } from '@/hooks/useBlogWrite';

interface EditorProps {
  title: string;
  setTitle: (title: string) => void;
  contents: EditorBlock[];
  textInputRefs: React.MutableRefObject<(HTMLTextAreaElement | null)[]>;
  setIsComposing: (isComposing: boolean) => void;
  handleContentChange: (frontendId: string, newText: string) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>, index: number) => void;
}

const Editor: React.FC<EditorProps> = ({
  title,
  setTitle,
  contents,
  textInputRefs,
  setIsComposing,
  handleContentChange,
  handleKeyDown,
}) => {
  return (
    <div className={S.editorContainer}>
      <input
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={S.titleInput}
      />

      <div className="mt-2 mb-2">
        <LineEnd />
      </div>

      <div className={S.editorWrapper}>
        {contents.map((block, index) => {
          if (block.contentType === 'TEXT') {
            return (
              <textarea
                ref={(el) => {
                  textInputRefs.current[index] = el;
                }}
                key={block.frontendId}
                placeholder={
                  index === 0 && contents.length === 1 && block.content === ''
                    ? '어떠한 것을 깨달았나요?'
                    : ''
                }
                value={block.content}
                onCompositionStart={() => setIsComposing(true)}
                onCompositionEnd={() => setIsComposing(false)}
                onChange={(e) => handleContentChange(block.frontendId, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={S.textBlock}
                rows={1}
              />
            );
          }
          if (block.contentType === 'IMAGE') {
            return (
              <img
                key={block.frontendId}
                src={block.content}
                alt={`post-image-${index}`}
                className={S.imageBlock}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default Editor;

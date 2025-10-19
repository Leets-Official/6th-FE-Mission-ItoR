// src/pages/WritePage.tsx
import React, { useEffect, useRef, useState } from 'react';
import imageIcon from '../assets/icons/image.svg';

const WritePage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const fileRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  const canPublish = title.trim().length > 0 && (body.trim().length > 0 || !!imageUrl);

  const openFile = () => fileRef.current?.click();
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setImageUrl(url);
  };

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    el.style.height = '0px';
    el.style.height = el.scrollHeight + 'px';
  }, [body]);

  const resetAll = () => {
    setTitle('');
    setBody('');
    setImageUrl(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  const publish = () => {
    if (!canPublish) return;
    alert('UI-only: 게시하기는 아직 서버 연동 전입니다.');
  };

  return (
    <div className="write-page">
      {/* 상단 헤더(메뉴 + GITLOG + 삭제/게시) */}
      <header className="write-header">
        <div className="write-header__inner">
          <div className="write-header__brand logo-text">GITLOG</div>
          <div className="write-header__actions">
            <button type="button" className="write-btn write-btn--delete" onClick={resetAll}>
              삭제하기
            </button>
            <button
              type="button"
              className="write-btn write-btn--publish"
              onClick={publish}
              disabled={!canPublish}
            >
              게시하기
            </button>
          </div>
        </div>
      </header>

      {/* 사진 추가 바 */}
      <div className="write-toolbar">
        <button type="button" className="write-toolbar__button" onClick={openFile}>
          <img src={imageIcon} alt="" className="write-toolbar__icon" />
          <span>사진 추가하기</span>
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="write-file"
          onChange={onFileChange}
        />
      </div>

      <main className="write-main">
        {/* 제목 */}
        <section className="write-title">
          <input
             value={title}
             onChange={(e) => setTitle(e.target.value)}
             placeholder="제목"
             className={`write-title__input ${title ? 'is-filled' : ''}`}
           />
        </section>

        {/* 제목/본문 사이 얇은 구분선 */}
        <div className="write-divider" role="separator" aria-hidden="true" />

        {/* 본문 */}
        <section className="write-body">
          <textarea
            ref={bodyRef}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="어떠한 것을 깨달았나요?"
            className="write-body__textarea"
          />
        </section>

        {/* 이미지 미리보기(선택 시) */}
        {imageUrl && (
          <section className="write-image">
            <img src={imageUrl} alt="preview" />
          </section>
        )}

        <div className="write-spacer-64" />
      </main>
    </div>
  );
};

export default WritePage;

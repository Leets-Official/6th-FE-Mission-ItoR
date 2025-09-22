import { CreateIcon } from '@/assets/icons/common';
import PostBody from '@/components/blog/post/PostBody';
import PostCard from '@/components/blog/post/PostCard';
import PostHeader from '@/components/blog/post/PostHeader';
import DropdownMenu from '@/components/common/Dropdown/DropdownMenu';
import Button from '@/components/common/button/Button';
import Divider from '@/components/common/divider/Divider';
import Modal from '@/components/common/modal/Modal';
import Modal2 from '@/components/common/modal/Modal2';
import PageHeader from '@/components/common/pageheader/PageHeader';
import PageHeaderLegacy from '@/components/common/pageheader/PageHeaderLegacy';
import Pagination from '@/components/common/pagination/Pagination';
import TextField from '@/components/common/text/TextField';
import Textarea from '@/components/common/text/Textarea';
import TextBox from '@/components/common/textbox/TextBox';
import ToastPositive from '@/components/common/toast/ToastPositive';
import ToastWarning from '@/components/common/toast/ToastWarning';
import Sidebar from '@/layout/Sidebar';
import React from 'react';

function Playground() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isModal2Open, setIsModal2Open] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center mb-8">Playground</h1>

        {/* PageHeader 테스트 */}
        <div className="bg-white rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">PageHeader 컴포넌트</h2>
          <div className="space-y-4">
            <PageHeader type="main" />
            <PageHeader type="detail" />
            <PageHeader type="write" />
          </div>
        </div>

        {/* PageHeaderLegacy 테스트 */}
        <div className="bg-white rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">PageHeaderLegacy 컴포넌트</h2>
          <div className="flex justify-center">
            <PageHeaderLegacy />
          </div>
        </div>

        {/* PostHeader 테스트 */}
        <div className="bg-white rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">PostHeader 컴포넌트</h2>
          <div className="flex justify-center">
            <PostHeader title="블로그 포스트 제목" subtitle="2024년 1월 15일 · 5분 읽기" />
          </div>
        </div>

        {/* PostCard 테스트 */}
        <div className="bg-white rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">PostCard 컴포넌트</h2>
          <div className="flex justify-center">
            <PostCard title="블로그 미리보기 제목" content="블로그 포스트의 미리보기 내용입니다." />
          </div>
        </div>

        {/* PostBody 테스트 */}
        <div className="bg-white rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">PostBody 컴포넌트</h2>
          <div className="flex justify-center">
            <PostBody content="블로그 글의 본문 내용입니다. 여기에 실제 블로그 포스트의 내용이 들어갑니다." />
          </div>
        </div>

        {/* Pagination 테스트 */}
        <div className="bg-white rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Pagination 컴포넌트</h2>
          <div className="flex justify-center">
            <Pagination />
          </div>
        </div>

        {/* Divider 테스트 */}
        <div className="bg-white rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Divider 컴포넌트</h2>
          <div className="flex justify-center">
            <Divider />
          </div>
        </div>

        {/* Toast 테스트 */}
        <div className="bg-white rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Toast 컴포넌트</h2>
          <div className="flex justify-center gap-4">
            <ToastPositive>저장되었습니다</ToastPositive>
            <ToastWarning>내용을 입력해주세요</ToastWarning>
          </div>
        </div>

        {/* Button 테스트 */}
        <div className="bg-white rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Button 컴포넌트</h2>
          <div className="flex justify-center gap-4 flex-wrap">
            {/* 기존 variant들을 정확히 재현 */}
            <Button intent="primary">기본 버튼 (토큰)</Button>
            <Button intent="gray" variant="ghost">
              Variant2 (토큰)
            </Button>
            <Button intent="gray" variant="ghost" className="bg-gray-light">
              Variant7 (토큰)
            </Button>
            <Button intent="gray" className="bg-dark text-white">
              Variant9 (토큰)
            </Button>

            {/* 커스텀 색상 테스트 */}
            <Button intent="primary">커스텀 파란색</Button>
            <Button intent="danger">커스텀 빨간색</Button>
            <Button intent="primary">토큰 사용</Button>

            {/* 호버 색상 테스트 */}
            <Button intent="primary">호버 효과</Button>

            {/* 아이콘과 함께 */}
            <Button showIcon icon={<CreateIcon />} intent="primary">
              아이콘 + 텍스트
            </Button>
            <Button showIcon icon={<CreateIcon />} intent="danger">
              호버 아이콘
            </Button>
          </div>
        </div>

        {/* TextBox 테스트 */}
        <div className="bg-white rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">TextBox 컴포넌트</h2>
          <div className="flex justify-center gap-4 flex-wrap">
            <TextBox>기본 텍스트박스</TextBox>
            <TextBox color="primary" borderColor="primary">
              파란색 텍스트박스
            </TextBox>
            <TextBox color="positive" borderColor="positive">
              초록색 텍스트박스
            </TextBox>
            <TextBox color="gray" borderColor="gray">
              회색 텍스트박스
            </TextBox>
            <TextBox showIcon color="primary" borderColor="primary">
              아이콘 + 텍스트
            </TextBox>
            <TextBox showIcon color="positive" borderColor="positive">
              Create 아이콘
            </TextBox>
          </div>
        </div>

        {/* TextField 테스트 */}
        <div className="bg-white rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">TextField 컴포넌트</h2>
          <div className="flex flex-col items-center gap-4">
            {/* 보더 variants */}
            <TextField variant="default" placeholder="Default border (#E6E6E6)" />
            <TextField variant="dark" placeholder="Dark border (#555)" />
            <TextField variant="light" placeholder="Light border (#E6E6E6)" />

            {/* 고정 크기: 656px */}

            {/* 텍스트 색상 */}
            <TextField textColor="black" placeholder="Black (#000)" />
            <TextField textColor="gray56" placeholder="Gray-56 (#909090)" />
            <TextField textColor="gray78" placeholder="Gray-78 (#C8C8C8)" />

            {/* 배경색 */}
            <TextField backgroundColor="transparent" placeholder="투명 배경 (기본)" />
            <TextField backgroundColor="filled" placeholder="Filled 배경 (Gray90)" />

            {/* 폰트 타입 */}
            <TextField fontSize="light" placeholder="14px light (기본)" />
            <TextField fontSize="medium" placeholder="24px medium" />

            {/* 상태 */}
            <TextField disabled placeholder="Disabled field" />
            <TextField fullWidth placeholder="Full width field" />
          </div>
        </div>

        {/* Textarea 테스트 */}
        <div className="bg-white rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Textarea 컴포넌트</h2>
          <div className="flex justify-center gap-4 flex-wrap">
            <Textarea title="제목" placeholder="Text field" hintText="주의 문구" />
            <Textarea title="폴더명" placeholder="폴더명을 입력하세요" hintText="폴더명을 입력해주세요" />
          </div>
        </div>

        {/* Sidebar 테스트 */}
        <div className="bg-white rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Sidebar 컴포넌트</h2>
          <div className="flex justify-center gap-8">
            <div className="flex flex-col items-center gap-2">
              <h3 className="text-sm font-medium">로그인 안됨</h3>
              <Sidebar isLoggedIn={false} />
            </div>
            <div className="flex flex-col items-center gap-2">
              <h3 className="text-sm font-medium">로그인 됨</h3>
              <Sidebar isLoggedIn={true} />
            </div>
          </div>
        </div>

        {/* Modal 테스트 */}
        <div className="bg-white rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">DropdownMenu 컴포넌트</h2>
          <div className="flex justify-center gap-8 flex-wrap">
            <DropdownMenu
              trigger={<Button>메뉴 열기</Button>}
              items={[
                { id: 'edit', label: '편집' },
                { id: 'copy', label: '복사' },
                { id: 'delete', label: '삭제' },
                { id: 'disabled', label: '비활성화됨', disabled: true },
              ]}
            />

            <DropdownMenu
              trigger={<Button intent="secondary">좌측 정렬 메뉴</Button>}
              position="left"
              items={[
                { id: 'profile', label: '프로필 보기' },
                { id: 'settings', label: '설정' },
                { id: 'logout', label: '로그아웃' },
              ]}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Modal 컴포넌트</h2>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button onClick={() => setIsModalOpen(true)}>모달 열기</Button>
            <Button onClick={() => setIsModal2Open(true)}>모달2 열기</Button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onDelete={() => setIsModalOpen(false)}>
        <h3 className="self-stretch text-sm font-semibold text-black">모달 제목</h3>
        <p className="self-stretch text-xs font-normal text-gray">모달 내용입니다.</p>
      </Modal>

      {/* Modal2 */}
      <Modal2 isOpen={isModal2Open} onClose={() => setIsModal2Open(false)} onDelete={() => setIsModal2Open(false)}>
        <h3 className="self-stretch text-sm font-semibold text-black">모달2 제목</h3>
      </Modal2>
    </div>
  );
}

export default Playground;

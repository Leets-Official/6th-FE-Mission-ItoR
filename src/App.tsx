import Button from "./components/ui/Button";
import SmallButton from "./components/ui/SmallButton";
import ToastButton from "./components/ui/ToastButton"; 
import PageHeader from "./components/ui/PageHeader";

function App() {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center gap-6 p-6 bg-gray-100">
      {/* 큰 버튼들 */}
      <div className="flex flex-col gap-4">
        <Button leftIcon variant="outlinePointWhite">깃로그 시작하기</Button>
        <Button leftIcon variant="outlineGrayWhite">깃로그 시작하기</Button>
        <Button leftIcon variant="solidWhite">깃로그 시작하기</Button>
        <Button leftIcon variant="outlineGrayGray90">깃로그 시작하기</Button>
        <Button leftIcon variant="solidGray90">깃로그 시작하기</Button>
        <Button leftIcon variant="solidDark">깃로그 시작하기</Button>
        <Button leftIcon variant="solidDarkAlt">깃로그 시작하기</Button>
      </div>

      {/* 작은 버튼들 */}
      <div className="flex flex-col gap-4">
        <SmallButton leftIcon variant="ghost">깃로그 시작하기</SmallButton>
        <SmallButton leftIcon variant="fill">깃로그 시작하기</SmallButton>
      </div>

      {/* 토스트 버튼들 */}
      <div className="flex flex-col gap-4">
        <ToastButton variant="negative">내용을 입력해주세요</ToastButton>
        <ToastButton variant="positive">저장되었습니다!</ToastButton>
      </div>

      <div className="min-h-dvh flex flex-col items-center gap-6 p-6 bg-gray-100">
       <PageHeader variant="write" />
       <PageHeader variant="comment" />
       <PageHeader variant="publish" />
      </div>

    </div>
  );
}

export default App;

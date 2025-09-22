import Button from "./components/ui/Button";

function App() {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center gap-4 p-6">
      <Button leftIcon variant="outlinePointWhite">깃로그 시작하기</Button>
      <Button leftIcon variant="outlineGrayWhite">깃로그 시작하기</Button>
      <Button leftIcon variant="outlineGrayGray90">깃로그 시작하기</Button>
      <Button leftIcon variant="solidWhite">깃로그 시작하기</Button>
      <Button leftIcon variant="solidGray90">깃로그 시작하기</Button>
      <Button leftIcon variant="solidDark">깃로그 시작하기</Button>

    </div>
  );
}

export default App;

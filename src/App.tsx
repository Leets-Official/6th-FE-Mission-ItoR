import Frame from "@ui/Frame";

export default function App() {
  return (
    <div className="min-h-dvh bg-gray-100 p-6">
      <div className="mx-auto flex max-w-[1024px] gap-6">
        <Frame variant="guest" initial="G" onStart={() => console.log("start")} />
        <Frame
          variant="member"
          name="%{닉네임}"
          intro="%{한 줄 소개}"
          initial="G"
          onMyGitlog={() => console.log("my gitlog")}
          onWrite={() => console.log("write")}
          onSettings={() => console.log("settings")}
          onLogout={() => console.log("logout")}
        />
      </div>
    </div>
  );
}
import ProfilePhoto from "@ui/Profile";

function App() {
  return (
    <div className="min-h-dvh flex items-center justify-center gap-8 p-10 bg-gray-100">
      {/* 64px (기본) */}
      <ProfilePhoto name="Saelyeam" />
      {/* 40px */}
      <ProfilePhoto size="sm" name="G" />
      {/* 90px */}
      <ProfilePhoto size="xl" initial="G" />
    </div>
  );
}

export default App;

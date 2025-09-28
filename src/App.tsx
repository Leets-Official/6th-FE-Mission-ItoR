import { Routes, Route, Link } from "react-router-dom";
import AvatarTest from "./pages/avatar-test";
import ButtonTest from "./pages/button-test";
import TextTest from "./pages/text-test";

function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col gap-4">
        <Link to="/test-avatar">
          <button className="w-52 rounded-md bg-indigo-500 px-5 py-3 text-white hover:bg-indigo-600">
            Avatar 테스트 페이지로 이동
          </button>
        </Link>

        <Link to="/button-test">
          <button className="w-52 rounded-md bg-green-600 px-5 py-3 text-white hover:bg-green-700">
            Button 테스트 페이지로 이동
          </button>
        </Link>

        <Link to="/text-test">
          <button className="w-52 rounded-md bg-orange-500 px-5 py-3 text-white hover:bg-orange-600">
            TextField 테스트 페이지로 이동
          </button>
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/test-avatar" element={<AvatarTest />} />
      <Route path="/button-test" element={<ButtonTest />} />
      <Route path="/text-test" element={<TextTest />} />
    </Routes>
  );
}

export default App;

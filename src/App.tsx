import { Routes, Route, Link } from "react-router-dom";
import AvatarTest from "./pages/test-page/avatar-test";
import ButtonTest from "./pages/test-page/button-test";
import TextTest from "./pages/test-page/text-test";
import ToastTest from "./pages/test-page/toast-test";
import ModalTest from "./pages/test-page/modal-test";
import DropdownTest from "./pages/test-page/dropdown-test";

function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col gap-4">
        <Link to="/avatar-test">
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

        <Link to="/toast-test">
          <button className="w-52 rounded-md bg-blue-500 px-5 py-3 text-white hover:bg-blue-600">
            Toast 테스트 페이지로 이동
          </button>
        </Link>

        <Link to="/modal-test">
          <button className="w-52 rounded-md bg-purple-500 px-5 py-3 text-white hover:bg-purple-600">
            Modal 테스트 페이지로 이동
          </button>
        </Link>

        <Link to="/dropdown-test">
          <button className="w-52 rounded-md bg-pink-500 px-5 py-3 text-white hover:bg-pink-600">
            Dropdown 테스트 페이지로 이동
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
      <Route path="/avatar-test" element={<AvatarTest />} />
      <Route path="/button-test" element={<ButtonTest />} />
      <Route path="/text-test" element={<TextTest />} />
      <Route path="/toast-test" element={<ToastTest />} />
      <Route path="/modal-test" element={<ModalTest />} />
      <Route path="/dropdown-test" element={<DropdownTest />} />
    </Routes>
  );
}

export default App;

import { Routes, Route, Link } from "react-router-dom";
import AvatarTest from "./avatar-test";
import ButtonTest from "./button-test";
import TextTest from "./text-test";
import ToastTest from "./toast-test";
import ModalTest from "./modal-test";
import DropdownTest from "./dropdown-test";
import HeaderTest from "./header-test";
import SidebarTest from "./sidebar-test";
import PaginationTest from "./pagination-test";

function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex max-w-4xl flex-wrap justify-center gap-4">
        <Link to="/playground/avatar-test">
          <button className="w-52 rounded-md bg-indigo-500 px-5 py-3 text-white hover:bg-indigo-600">
            Avatar 테스트 페이지
          </button>
        </Link>
        <Link to="/playground/button-test">
          <button className="w-52 rounded-md bg-green-600 px-5 py-3 text-white hover:bg-green-700">
            Button 테스트 페이지
          </button>
        </Link>
        <Link to="/playground/text-test">
          <button className="w-52 rounded-md bg-orange-500 px-5 py-3 text-white hover:bg-orange-600">
            TextField 테스트 페이지
          </button>
        </Link>
        <Link to="/playground/toast-test">
          <button className="w-52 rounded-md bg-blue-500 px-5 py-3 text-white hover:bg-blue-600">
            Toast 테스트 페이지
          </button>
        </Link>
        <Link to="/playground/modal-test">
          <button className="w-52 rounded-md bg-purple-500 px-5 py-3 text-white hover:bg-purple-600">
            Modal 테스트 페이지
          </button>
        </Link>
        <Link to="/playground/dropdown-test">
          <button className="w-52 rounded-md bg-pink-500 px-5 py-3 text-white hover:bg-pink-600">
            Dropdown 테스트 페이지
          </button>
        </Link>
        <Link to="/playground/header-test">
          <button className="w-52 rounded-md bg-yellow-500 px-5 py-3 text-white hover:bg-yellow-600">
            Header 테스트 페이지
          </button>
        </Link>
        <Link to="/playground/sidebar-test">
          <button className="w-52 rounded-md bg-teal-500 px-5 py-3 text-white hover:bg-teal-600">
            Sidebar 테스트 페이지
          </button>
        </Link>
        <Link to="/playground/pagination-test">
          <button className="w-52 rounded-md bg-red-500 px-5 py-3 text-white hover:bg-red-600">
            Pagination 테스트 페이지
          </button>
        </Link>
      </div>
    </div>
  );
}

export default function Playground() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/avatar-test" element={<AvatarTest />} />
      <Route path="/button-test" element={<ButtonTest />} />
      <Route path="/text-test" element={<TextTest />} />
      <Route path="/toast-test" element={<ToastTest />} />
      <Route path="/modal-test" element={<ModalTest />} />
      <Route path="/dropdown-test" element={<DropdownTest />} />
      <Route path="/header-test" element={<HeaderTest />} />
      <Route path="/sidebar-test" element={<SidebarTest />} />
      <Route path="/pagination-test" element={<PaginationTest />} />
    </Routes>
  );
}

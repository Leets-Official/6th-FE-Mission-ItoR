import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import SignupPage from "@/pages/SignupPage/SignupPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/signup" element={<SignupPage />} />
    </Routes>
  );
}

export default App;

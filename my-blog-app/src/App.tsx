import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ButtonTestPage from "./pages/ButtonTestPage";
import ToastTestPage from "./pages/ToastTestPage";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>홈 화면</div>} />
        <Route path="/test/button" element={<ButtonTestPage />} />
        <Route path="/test/toast" element={<ToastTestPage />} />
      </Routes>
    </Router>
  );
}

export default App

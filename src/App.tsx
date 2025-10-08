import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import Playground from "./pages/test-page/Playground";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />

      <Route path="/playground/*" element={<Playground />} />
    </Routes>
  );
}

export default App;

import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import AvatarTest from "./pages/avatar-test";
import ButtonTest from "./pages/button-test";
import TextTest from "./pages/text-test";

function Home() {
    return (
        <div className="card">
            <div
                style={{
                    marginTop: "20px",
                    display: "flex",
                    gap: "10px",
                    flexDirection: "column",
                }}
            >
                <Link to="/test-avatar">
                    <button
                        style={{
                            padding: "10px 20px",
                            fontSize: "16px",
                            backgroundColor: "#646cff",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            width: "200px",
                        }}
                    >
                        Avatar 테스트 페이지로 이동
                    </button>
                </Link>

                <Link to="/button-test">
                    <button
                        style={{
                            padding: "10px 20px",
                            fontSize: "16px",
                            backgroundColor: "#28a745",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            width: "200px",
                        }}
                    >
                        Button 테스트 페이지로 이동
                    </button>
                </Link>

                {/* 👇 새로운 버튼 */}
                <Link to="/text-test">
                    <button
                        style={{
                            padding: "10px 20px",
                            fontSize: "16px",
                            backgroundColor: "#ff9800",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            width: "200px",
                        }}
                    >
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

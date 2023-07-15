import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./index";
import Navbar from "./components/Navbar";
import Board from "./pages/Board/index";
import BoardDetail from "./pages/Board/BoardDetail";
import MBTIBoard from "./pages/Board/MBTIindex";
import WritePage from "./pages/Board/WritePage";
import BoardModify from "./pages/Board/BoardModify";

const App = () => {
  const navItems = [
    { title: "Test", path: "/test" },
    { title: "Total Board", path: "/totalboard" },
    { title: "MBTI Board", path: "/mbtiboard" },
    { title: "MY page", path: "/mypage" },
  ];

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <div className="bg-gray-100 shadow-md">
          <Navbar navItems={navItems} />
        </div>
        <div className="flex-1">
          <Routes>
            <Route index path="/" element={<Index />} />
            <Route path="/totalboard" element={<Board />} />
            <Route path="/totalboarddetail/:id" element={<BoardDetail />} />
            <Route path="/boardmodify/:id" element={<BoardModify />} />
            <Route path="/mbtiboard" element={<MBTIBoard />} />
            <Route
              path="/writepage"
              element={
                <WritePage
                  onPostSubmit={() => {
                    /* 적절한 내용을 추가하거나 필요 없는 경우 함수 자체를 제거할 수 있습니다. */
                  }}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;

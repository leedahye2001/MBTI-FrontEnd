import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Index from "./index";
import Navbar from "./components/Navbar";
import Board from "./pages/Board/index";
import BoardDetail from "./pages/Board/BoardDetail";
import MBTIBoard from "./pages/Board/MBTIindex";
import WritePage from "./pages/Board/WritePage";
import BoardModify from "./pages/Board/BoardModify";
import MbtiTest from "./pages/Mbti/MbtiTest";
import GoogleLoginPage from "./pages/login/LoginPage";
import { isAuthenticatedAtom } from "./pages/login/atoms";
import MyPage from "./pages/Mypage/MyPage";
import Footer from "./components/Footer";

const App = () => {
  const navItems = [
    { title: "테스트 하러가기 🚀", path: "/test" },
    { title: "✨ 전체 게시판 ✨", path: "/totalboard" },
    { title: "✨ MBTI 게시판 ✨", path: "/mbtiboard" },
    { title: "마이페이지", path: "/mypage" },
  ];

  const isAuthenticated = useRecoilValue(isAuthenticatedAtom);

  return (
    <BrowserRouter>
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col min-h-screen">
          <Navbar navItems={navItems} />
          <Routes>
            <Route index path="/" element={<Index />} />
            <Route path="/test" element={<MbtiTest />} />
            <Route path="/login" element={<GoogleLoginPage />} />
            <Route path="/totalboard" element={<Board />} />
            <Route path="/totalboarddetail/:id" element={<BoardDetail />} />
            <Route path="/boardmodify/:id" element={<BoardModify />} />
            <Route path="/mbtiboard" element={<MBTIBoard />} />
            {isAuthenticated && <Route path="/mypage" element={<MyPage />} />}
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
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;

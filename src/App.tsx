// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { useRecoilState } from "recoil";
// import Index from "./index";
// import Board from "./pages/Board/index";
// import BoardDetail from "./pages/Board/BoardDetail";
// import MBTIBoard from "./pages/Board/MBTIindex";
// import WritePage from "./pages/Board/WritePage";
// import BoardModify from "./pages/Board/BoardModify";
// import MbtiTest from "./pages/Mbti/MbtiTest";
// import GoogleLoginPage from "./pages/login/LoginPage";
// import { userAtom } from "./pages/login/atoms";
// import Footer from "./components/Footer";
// import { useState } from "react";
// import { googleLogout } from "@react-oauth/google";
// import MyPage from "./pages/Mypage/MyPage";
// import Navbar, { NavItem } from "./components/Navbar";

// const App = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false); // 로그인 상태를 App.tsx에서 관리
//   const [isIndexAuthenticated, setIsIndexAuthenticated] = useState(false);
//   const [user, setUser] = useRecoilState(userAtom);

//   const handleLogout = (isLoggedOut: boolean) => {
//     alert("로그아웃 하시겠습니까?");
//     googleLogout();
//     setIsAuthenticated(false);
//     if (isLoggedOut) {
//       setIsIndexAuthenticated(false); // Navbar에서 로그아웃 시도 시에만 Index의 로그아웃 상태 변경
//     }
//     setUser({ name: "", email: "" });
//   };

//   const handleLogin = () => {
//     setIsAuthenticated(true);
//     setIsIndexAuthenticated(true);
//   };

//   const navItems: NavItem[] = isAuthenticated
//     ? [
//         { title: "테스트 하러가기 🚀", path: "/test" },
//         { title: "✨ 전체 게시판 ✨", path: "/totalboard" },
//         { title: "✨ MBTI 게시판 ✨", path: "/mbtiboard" },
//         { title: "마이페이지", path: "/mypage" },
//         { title: "로그아웃", onClick: handleLogout, path: "/" },
//       ]
//     : [
//         { title: "테스트 하러가기 🚀", path: "/test" },
//         { title: "✨ 전체 게시판 ✨", path: "/totalboard" },
//         { title: "✨ MBTI 게시판 ✨", path: "/mbtiboard" },
//         { title: "로그인", path: "/login" },
//       ];

//   return (
//     <BrowserRouter>
//       <div className="mx-auto max-w-4xl">
//         <div className="flex flex-col min-h-screen">
//           <Navbar
//             navItems={navItems}
//             isAuthenticated={isAuthenticated}
//             onLogout={() => handleLogout(true)} // 로그아웃 시도할 때의 핸들러 수정
//             onNavbarLogout={() => handleLogout(false)}
//           />
//           <Routes>
//             <Route
//               index
//               path="/"
//               element={
//                 <Index
//                   isAuthenticated={isIndexAuthenticated} // Index 컴포넌트에 isAuthenticated 속성 추가
//                   onLogin={() => setIsIndexAuthenticated(true)}
//                   onLogout={() => handleLogout(false)} // Navbar에서 로그아웃 시도할 때의 핸들러
//                 />
//               }
//             />
//             <Route path="/test" element={<MbtiTest />} />
//             <Route
//               path="/login"
//               element={
//                 <GoogleLoginPage
//                   onLogin={() => {
//                     handleLogin();
//                     setIsAuthenticated(true); // Navbar에서 로그인 시도할 때의 핸들러
//                   }}
//                   onLogout={() => {
//                     setIsAuthenticated(false); // Navbar에서 로그아웃 시도할 때의 핸들러
//                   }}
//                 />
//               } // 로그아웃 처리 함수를 LoginPage 컴포넌트로 전달
//             />
//             <Route path="/totalboard" element={<Board />} />
//             <Route path="/totalboarddetail/:id" element={<BoardDetail />} />
//             <Route path="/boardmodify/:id" element={<BoardModify />} />
//             <Route path="/mbtiboard" element={<MBTIBoard />} />
//             {isAuthenticated && <Route path="/mypage" element={<MyPage />} />}
//             <Route
//               path="/writepage"
//               element={
//                 <WritePage
//                   onPostSubmit={() => {
//                     /* 적절한 내용을 추가하거나 필요 없는 경우 함수 자체를 제거할 수 있습니다. */
//                   }}
//                 />
//               }
//             />
//           </Routes>
//         </div>
//         <Footer />
//       </div>
//     </BrowserRouter>
//   );
// };

// export default App;
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useRecoilState } from "recoil";
import Index from "./index";
import Board from "./pages/Board/index";
import BoardDetail from "./pages/Board/BoardDetail";
import MBTIBoard from "./pages/Board/MBTIindex";
import WritePage from "./pages/Board/WritePage";
import BoardModify from "./pages/Board/BoardModify";
import MbtiTest from "./pages/Mbti/MbtiTest";
import GoogleLoginPage from "./pages/login/LoginPage";
import { userAtom } from "./pages/login/atoms";
import Footer from "./components/Footer";
import { useState } from "react";
import { googleLogout } from "@react-oauth/google";
import MyPage from "./pages/Mypage/MyPage";
import Navbar, { NavItem } from "./components/Navbar";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useRecoilState(userAtom);

  const handleLogout = () => {
    // alert("로그아웃 하시겠습니까?");
    googleLogout();
    setIsAuthenticated(false);
    setUser({ name: "", email: "" });
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleNavbarLogout = () => {
    setIsAuthenticated(false); // Navbar에서 로그아웃 시 Index 컴포넌트의 상태 변경
  };

  const navItems: NavItem[] = isAuthenticated
    ? [
        { title: "테스트 하러가기 🚀", path: "/test" },
        { title: "✨ 전체 게시판 ✨", path: "/totalboard" },
        { title: "✨ MBTI 게시판 ✨", path: "/mbtiboard" },
        { title: "마이페이지", path: "/mypage" },
        { title: "로그아웃", onClick: handleLogout, path: "/" },
      ]
    : [
        { title: "테스트 하러가기 🚀", path: "/test" },
        { title: "✨ 전체 게시판 ✨", path: "/totalboard" },
        { title: "✨ MBTI 게시판 ✨", path: "/mbtiboard" },
        { title: "로그인", path: "/login" },
      ];

  return (
    <BrowserRouter>
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col min-h-screen">
          {/* <Navbar
            navItems={navItems}
            isAuthenticated={isAuthenticated}
            onLogout={handleLogout}
            onNavbarLogout={() => {
              setIsAuthenticated(false);
            }}
          /> */}
          <Navbar
            navItems={navItems}
            isAuthenticated={isAuthenticated}
            onLogout={handleLogout}
            onNavbarLogout={handleNavbarLogout}
          />
          <Routes>
            <Route
              index
              path="/"
              element={
                <Index
                  isAuthenticated={isAuthenticated}
                  onLogin={handleLogin}
                  onLogout={handleLogout}
                />
              }
            />
            <Route path="/test" element={<MbtiTest />} />
            <Route
              path="/login"
              element={
                <GoogleLoginPage
                  onLogin={() => {
                    handleLogin();
                    setIsAuthenticated(true);
                  }}
                  onLogout={() => {
                    setIsAuthenticated(false);
                  }}
                />
              }
            />
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

import { useNavigate } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import { useState } from "react";
import { googleLogout } from "@react-oauth/google";
import { useRecoilState } from "recoil";
import { userAtom } from "./pages/login/atoms";
import Button from "./components/Button";

interface IndexProps {
  isAuthenticated: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

const Index: React.FC<IndexProps> = ({
  isAuthenticated,
  onLogin,
  onLogout,
}) => {
  const [indexIsAuthenticated, setIndexIsAuthenticated] =
    useState(isAuthenticated);

  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/test");
  };

  const [user, setUser] = useRecoilState(userAtom);

  // const handleLogout = () => {
  //   alert("로그아웃 하시겠습니까?");
  //   googleLogout();
  //   setUser({ name: "", email: "" });
  //   onLogout();
  //   setIndexIsAuthenticated(false);
  //   navigate("/");
  // };

  // const handleLogin = () => {
  //   onLogin();
  //   setIndexIsAuthenticated(true);
  // };

  const handleLogin = () => {
    onLogin();
  };

  const handleLogout = () => {
    onLogout();
  };

  return (
    <section
      id="index-page"
      className="flex-1 flex items-center justify-center h-screen"
    >
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <p className="font-bold text-[23px]">
            {indexIsAuthenticated ? "GDTI를 " : "GDTI 이용을 위해 "}
          </p>
          <h1 className="font-bold text-[23px] mb-2">
            {indexIsAuthenticated ? "사용해 보세요 !" : "로그인을 해주세요 !"}
          </h1>
          {indexIsAuthenticated ? (
            <div className="flex flex-col text-center items-center py-2 gap-2">
              <Button onClick={handleNavigation}>테스트 하러 가기 🚀</Button>
              <h1 className="text-[#333]" onClick={handleLogout}>
                로그아웃
              </h1>
            </div>
          ) : (
            <LoginPage onLogin={handleLogin} onLogout={handleLogout} />
          )}
        </div>
      </div>
    </section>
  );
};

export default Index;

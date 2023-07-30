import React from "react";
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

interface LogoutButtonProps {
  onLogout: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    googleLogout();
    onLogout(); // 부모 컴포넌트로부터 전달된 로그아웃 콜백 호출
    navigate("/"); // 로그아웃 후 홈페이지로 이동
  };

  return (
    <h1 className="text-[#333]" onClick={handleLogout}>
      로그아웃
    </h1>
  );
};

export default LogoutButton;

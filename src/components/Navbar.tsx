import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userNameSelector } from "../pages/login/atoms";

export interface NavItem {
  title: string;
  path: string;
  onClick?: (isLoggedOut: boolean) => void;
}

interface NavbarProps {
  navItems: NavItem[];
  isAuthenticated: boolean; // isAuthenticated prop 추가
  onLogout: () => void; // onLogout prop 추가
  onNavbarLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  navItems,
  isAuthenticated,
  onLogout,
  onNavbarLogout,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const userName = useRecoilValue(userNameSelector); // userNameSelector를 통해 사용자 이름 가져오기

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogoutNav = () => {
    onLogout();
    onNavbarLogout();
  };

  return (
    <nav className="bg-white fixed sticky top-0 z-10 w-full">
      <div className="max-w-screen-4xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center ">
          <Link to="/" className="flex items-center">
            <span className="text-black self-center text-2xl font-semibold whitespace-nowrap">
              GDSC MBTI
            </span>
          </Link>
        </div>
        <button
          data-collapse-toggle="navbar-hamburger"
          type="button"
          className="inline-flex items-center justify-center p-2 w-10 h-10 ml-3 text-sm text-gray-500
                    hover:text-black focus:outline-none"
          aria-controls="navbar-hamburger"
          aria-expanded={isOpen ? "true" : "false"}
          onClick={toggleMenu}
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`w-full absolute top-full left-0 bg-white bg-opacity-90 ${
            isOpen ? "block" : "hidden"
          }`}
          id="navbar-hamburger"
        >
          <ul className="flex flex-col font-light mt-4 text-[18px] text-center">
            {navItems.map((item, index) => (
              <li key={index}>
                {item.title === "로그아웃" ? (
                  isAuthenticated ? (
                    <button
                      className="w-full py-2 pl-3 pr-4 rounded text-gray-700 hover:bg-gradient-to-r hover:bg-opacity-20 hover:from-primary-300 hover:via-primary-200 hover:to-primary-100 hover:text-white"
                      onClick={handleLogoutNav}
                    >
                      {item.title}
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      className="block py-2 pl-3 pr-4 rounded text-gray-700 hover:bg-gradient-to-r hover:bg-opacity-20 hover:from-primary-300 hover:via-primary-200 hover:to-primary-100 hover:text-white"
                    >
                      {item.title}
                    </Link>
                  )
                ) : (
                  <Link
                    to={item.path}
                    className="block py-2 pl-3 pr-4 rounded text-gray-700 hover:bg-gradient-to-r hover:bg-opacity-20 hover:from-primary-300 hover:via-primary-200 hover:to-primary-100 hover:text-white"
                  >
                    {item.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

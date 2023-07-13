import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface NavItem {
  title: string;
  path: string;
}

interface NavbarProps {
  navItems: NavItem[];
}

const Navbar: React.FC<NavbarProps> = ({ navItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav>
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center">
          <Link to="/" className="text-gray-800 font-bold text-xl">
            MBTI
          </Link>
        </div>
        <div className="md:hidden">
          <button
            type="button"
            className="text-gray-800 hover:text-gray-700 focus:outline-none focus:text-gray-700"
            onClick={toggleMenu}
          >
            <svg
              className={`h-6 w-6 ${isOpen ? 'hidden' : 'block'}`}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="fill-current"
                d="M4 6H20M4 12H20M4 18H20"
              ></path>
            </svg>
            <svg
              className={`h-6 w-6 ${isOpen ? 'block' : 'hidden'}`}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="fill-current"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <div className={`md:flex ${isOpen ? 'block' : 'hidden'}`}>
          <ul className="md:flex md:items-center md:justify-end space-x-4">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className="text-gray-800 hover:text-gray-700 font-medium"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


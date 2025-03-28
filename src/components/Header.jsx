import React from "react";
import logoIMG from "../assets/logo.png";
import { Link } from "react-router-dom";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Inquiry", path: "/inquiry" },
  { name: "About Us", path: "/about" },
  { name: "Login", path: "/login" },
  { name: "Map", path: "/map" },
];

export default function Header() {
  return (
    <header className="p-4 bg-gray-900 shadow-lg">
      <div className="flex justify-between items-center px-8 py-4">
        <div>
          <img
            src={logoIMG}
            alt="Cypress Logo"
            className="w-[200px] cursor-pointer"
          />
        </div>

        <nav>
          <ul className="flex gap-8 text-lg font-medium text-white">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="hover:text-green-400 transition duration-300 cursor-pointer"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

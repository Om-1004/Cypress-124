import React, { useEffect, useState } from "react";
import logoIMG from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Inquiry", path: "/inquiry" },
  { name: "About Us", path: "/about" },
  { name: "Map", path: "/map" },
];

export default function Header() {
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUserName(user.user_metadata?.full_name || "User");
      }
    };

    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUserName(null);
    navigate("/login");
  };

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
          <ul className="flex gap-8 text-lg font-medium text-white items-center">
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

            {userName ? (
              <>
                <li className="text-green-400">Hi, {userName}</li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="py-1.5 px-4 bg-red-500 hover:bg-red-600 rounded-lg text-white text-sm"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  to="/login"
                  className="hover:text-green-400 transition duration-300 cursor-pointer"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

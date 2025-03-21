import React from 'react';
import logoIMG from '../assets/logo.png'; 

export default function Header() {
  return (
    <header className="p-4 bg-gray-900 shadow-lg">
      <div className="flex justify-between items-center px-8 py-4">

        <div>
          <img src={logoIMG} alt="Cypress Logo" className="w-[200px] cursor-pointer" />
        </div>

        <nav>
          <ul className="flex gap-8 text-lg font-medium text-white">
            <li className="hover:text-green-400 transition duration-300 cursor-pointer">Home</li>
            <li className="hover:text-green-400 transition duration-300 cursor-pointer">Inquiry</li>
            <li className="hover:text-green-400 transition duration-300 cursor-pointer">About Us</li>
            <li className="hover:text-green-400 transition duration-300 cursor-pointer">Login</li>
            <li className="hover:text-green-400 transition duration-300 cursor-pointer">Map</li>
          </ul>
        </nav>
      </div>
    </header>
  );
}


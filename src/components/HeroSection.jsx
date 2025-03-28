import React from "react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white py-24 px-6 text-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        <h1 className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400 animate-pulse mb-6">
          Cypress: Empowering Communities
        </h1>

        <p className="text-xl text-gray-300 mb-8 max-w-3xl leading-relaxed">
          Report and track community issues with real-time updates, interactive
          maps, and seamless notifications. Cypress makes your neighborhood
          smarter and safer.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-10 w-full px-4">
          <div className="p-6 bg-white bg-opacity-10 backdrop-blur-md rounded-xl shadow-lg transition-transform transform hover:scale-105">
            <h3 className="text-2xl font-semibold text-green-400">
              📍 <br />
              Interactive Map
            </h3>

            <p className="text-gray-300 mt-2 text-[20px]">
              View and track issues in your area with a dynamic map interface.
            </p>
          </div>
          <div className="p-6 bg-white bg-opacity-10 backdrop-blur-md rounded-xl shadow-lg transition-transform transform hover:scale-105">
            <h3 className="text-2xl font-semibold text-blue-400">
              📝 <br />
              Easy Reporting
            </h3>
            <p className="text-gray-300 mt-2 text-[20px]">
              Submit reports with details and help improve your community.
            </p>
          </div>
          <div className="p-6 bg-white bg-opacity-10 backdrop-blur-md rounded-xl shadow-lg transition-transform transform hover:scale-105">
            <h3 className="text-2xl font-semibold text-yellow-400">
              🔔 <br /> Instant Notifications
            </h3>
            <p className="text-gray-300 mt-2 text-[20px]">
              Get real-time updates on the status of your reports and alerts.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          <button className="bg-green-500 hover:bg-green-600 text-white text-lg font-medium px-8 py-3 rounded-full shadow-lg transition-transform transform hover:scale-110 no-underline">
            View Map
          </button>

          <Link to={"/createReport"}>
            <button className="bg-blue-500 hover:bg-blue-600 text-white text-lg font-medium px-8 py-3 rounded-full shadow-lg transition-transform transform hover:scale-110">
              Create Report
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

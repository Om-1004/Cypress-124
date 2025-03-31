import React, { useState } from "react";
import signUpIMG from "../assets/img/signupLogo.jpeg";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";

export default function SignUp() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { fullName, email, password } = formData;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-grey-100 flex rounded-2xl shadow-2xl max-w-7xl p-10 gap-x-16 w-full">
        <div className="md:w-1/2 w-full">
          <h2 className="font-bold text-4xl">Sign Up</h2>
          <p className="text-base mt-4">
            If you are already a user, login here
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col px-8 gap-6">
            <input
              className="p-3 mt-10 rounded-xl border text-lg"
              type="text"
              id="fullName"
              placeholder="Full Name"
              onChange={handleChange}
              required
            />
            <input
              className="p-3 rounded-xl border text-lg"
              type="email"
              id="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
            <div className="relative">
              <input
                className="p-3 rounded-xl border w-full text-lg pr-10"
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-1/2 right-3 -translate-y-1/2"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <button
              disabled={loading}
              className="bg-[#14171A] text-white text-lg font-medium rounded-xl py-3"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <div className="text-base flex justify-between mt-12 items-center">
            <p>If you already have an account.. </p>
            <Link to="/sign-in">
              <button className="py-2 px-6 bg-white rounded-xl border text-sm font-semibold">
                Sign In
              </button>
            </Link>
          </div>
          {error && <p className="text-red-400 mt-4">{error}</p>}
        </div>

        <div className="w-1/2 hidden md:flex items-center">
          <img
            className="rounded-2xl h-full w-full object-cover"
            src={signUpIMG}
            alt="Sign Up Visual"
          />
        </div>
      </div>
    </div>
  );
}

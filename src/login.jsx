import React, { useState } from "react";
import signUpIMG from "./assets/img/signupLogo.jpeg";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "./config/supabaseClient";
import { toast } from "react-hot-toast";

export default function Login() {
  const [formData, setFormData] = useState({
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
    setError(null);

    const { email, password } = formData;

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      const userId = data.user.id;
      const now = new Date().toISOString();

       const { data: existingProfile, error: profileFetchError } = await supabase
        .from("user_profiles")
        .select("last_login")
        .eq("id", userId)
        .single();

      if (profileFetchError && profileFetchError.code !== "PGRST116") {
        console.error("Error checking user profile:", profileFetchError.message);
      }

      if (!existingProfile) {
        await supabase.from("user_profiles").insert([
          { id: userId, last_login: now }
        ]);
      }

      const lastLogin = existingProfile?.last_login || new Date(0).toISOString();

      const { count: newMarkersCount, error: markerError } = await supabase
        .from("markers")
        .select("*", { count: "exact", head: true })
        .gt("created_at", lastLogin);

      if (markerError) {
        console.error("Marker count error:", markerError.message);
      } else if (newMarkersCount > 0) {
        toast.success(`You have ${newMarkersCount} new problems since your last visit!`);
      }

      await supabase
        .from("user_profiles")
        .update({ last_login: now })
        .eq("id", userId);

      const fullName = data.user?.user_metadata?.full_name || "User";
      console.log("Hi", fullName);
      navigate("/");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-grey-100 flex rounded-2xl shadow-2xl max-w-7xl p-10 gap-x-16 w-full">
        <div className="md:w-1/2 w-full">
          <h2 className="font-bold text-4xl">Sign In</h2>
          <p className="text-base mt-4">Welcome back!</p>

          <form onSubmit={handleSubmit} className="flex flex-col px-8 gap-6">
            <input
              className="p-3 mt-10 rounded-xl border text-lg"
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
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="text-base flex justify-between mt-12 items-center">
            <p>Don't have an account?</p>
            <Link to="/sign-up">
              <button className="py-2 px-6 bg-white rounded-xl border text-sm font-semibold">
                Sign Up
              </button>
            </Link>
          </div>
          {error && <p className="text-red-400 mt-4">{error}</p>}
        </div>

        <div className="w-1/2 hidden md:flex items-center">
          <img
            className="rounded-2xl h-full w-full object-cover"
            src={signUpIMG}
            alt="Login Visual"
          />
        </div>
      </div>
    </div>
  );
}

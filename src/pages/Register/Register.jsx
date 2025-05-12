import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import bgImage from "../../assets/background.jpg";
import { Helmet } from "react-helmet";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    if (storedUsers.some((user) => user.email === email)) {
      setErrorMsg("An account with this email already exists.");
      return;
    }

    const newUser = { email, password };
    storedUsers.push(newUser);

    localStorage.setItem("users", JSON.stringify(storedUsers));

    if (email === "admin@gmail.com" && password === "admin123") {
      localStorage.setItem("isAdmin", "true");
    }

    navigate("/Login");
  };

  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div
        className="flex h-screen w-full items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="rounded-xl bg-white/10 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
          <div className="text-white">
            <div className="mb-6 flex flex-col items-center">
              <img src={logo} width={150} alt="Logo" className="mb-2" />
              <h2 className="text-2xl">Create Account</h2>
              {errorMsg && <div className="text-red-500 mt-2">{errorMsg}</div>}
            </div>

            <form onSubmit={handleRegister}>
              <div className="mb-4 text-lg">
                <input
                  className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                />
              </div>
              <div className="mb-4 text-lg">
                <input
                  className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
              </div>
              <div className="mt-8 flex justify-center text-lg text-black">
                <button
                  type="submit"
                  className="rounded-3xl bg-yellow-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600"
                >
                  Register
                </button>
              </div>
            </form>

            <div className="mt-6 text-center text-sm text-gray-300">
              Already have an account?{" "}
              <Link
                to="/Login"
                className="text-yellow-400 hover:text-yellow-300 underline"
              >
                Login here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import background from "../../assets/background.jpg";
import logo from "../../assets/logo.png";
import { Helmet } from "react-helmet";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    const user = storedUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (!user) {
      setErrorMsg("Email or password is incorrect");
      return;
    }

    if (email === "admin@gmail.com") {
      localStorage.setItem("isAdmin", "true");
    } else {
      localStorage.setItem("isAdmin", "false");
    }

    localStorage.setItem("currentUser", JSON.stringify(user));

    localStorage.setItem("token", "fake-token");

    navigate("/Home");
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div
        className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${background})`,
        }}
      >
        <div className="rounded-xl bg-white/10 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
          <div className="text-white">
            <div className="mb-8 flex flex-col items-center">
              <img src={logo} width={150} alt="logo" />
              <span className="text-gray-800">Enter Login Details</span>
            </div>
            <form onSubmit={handleLogin}>
              <div className="mb-4 text-lg">
                <input
                  className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-black placeholder-slate-700 shadow-lg outline-none backdrop-blur-md"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="id@email.com"
                  required
                />
              </div>
              <div className="mb-4 text-lg">
                <input
                  className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-black placeholder-slate-700 shadow-lg outline-none backdrop-blur-md"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="*********"
                  required
                />
              </div>
              {errorMsg && (
                <p className="text-red-500 text-sm text-center mb-2">
                  {errorMsg}
                </p>
              )}
              <div className="mt-8 flex justify-center text-lg text-black">
                <button
                  type="submit"
                  className="rounded-3xl bg-yellow-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

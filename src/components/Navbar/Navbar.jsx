import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    navigate("/Register");
  };

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-8">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-4">
            <NavLink to="/Home" className="text-xl font-semibold logo">
              Eventsy
            </NavLink>
          </div>

          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none"
            >
              <i
                className={`fa-solid ${
                  isOpen ? "fa-xmark" : "fa-bars"
                } text-2xl`}
              />
            </button>
          </div>

          <div className="hidden lg:flex flex-grow justify-center space-x-10">
            <NavLink
              to="/Home"
              className="text-gray-700 hover:text-sky-900 font-bold"
            >
              Home
            </NavLink>
            <NavLink
              to="/Events"
              className="text-gray-700 hover:text-sky-900 font-bold"
            >
              Events
            </NavLink>
            {isAdmin && (
              <NavLink
                to="/AdminPanel"
                className="text-gray-700 hover:text-sky-900 font-bold"
              >
                Admin Panel
              </NavLink>
            )}
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-red-600 font-bold"
              >
                LOG OUT
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden flex flex-col space-y-4 py-4">
            <NavLink
              to="/Home"
              className="text-gray-700 hover:text-sky-900 font-bold text-center"
            >
              Home
            </NavLink>
            <NavLink
              to="/Events"
              className="text-gray-700 hover:text-sky-900 font-bold text-center"
            >
              Events
            </NavLink>
            {isAdmin && (
              <NavLink
                to="/AdminPanel"
                className="text-gray-700 hover:text-sky-900 font-bold text-center"
              >
                Admin Panel
              </NavLink>
            )}
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-red-600 font-bold text-center"
              >
                LOG OUT
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

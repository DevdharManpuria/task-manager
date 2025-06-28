import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <Link to="/" style={{ marginRight: 20, fontWeight: "bold" }}>
        Task Manager
      </Link>

      {user && user.token ? (
        <>          
          <span style={{ marginRight: 20 }}>Hi, {user.email}</span>
          <button onClick={handleLogout} style={{ cursor: "pointer" }}>
            Logout
          </button>
        </>
      ) : (
        <>          
          <Link to="/login" style={{ marginRight: 10 }}>
            Login
          </Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
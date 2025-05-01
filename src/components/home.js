import React from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_name");
    navigate("/toLogin");
  };

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark fixed-top shadow p-3">
        <div className="container ">
          <ul className="navbar-nav d-flex flex-row justify-content-center w-100" style={{ direction: "rtl" }}>
            <li className="nav-item mx-3">
              <a className="nav-link" href="/toRegister" style={linkStyle}>
                הרשמה
              </a>
            </li>
            <li className="nav-item mx-3">
              <a className="nav-link" href="/toLogin" style={linkStyle}>
                התחברות
              </a>
            </li>
            <li className="nav-item mx-3">
              <a className="nav-link" href="/toTasks" style={linkStyle}>
                משימות
              </a>
            </li>
            <li className="nav-item mx-3">
              <a className="nav-link text-danger" href="/#" onClick={handleLogout} style={linkStyle}>
                התנתקות
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

const linkStyle = {
  fontSize: "1.2rem",
  padding: "10px 20px",
  margin: "0 15px",
  transition: "all 0.3s ease",
};


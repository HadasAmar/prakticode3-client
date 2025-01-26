import React from "react";

export const Home = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow p-3">
        <div className="container-fluid">
          <ul className="navbar-nav ms-auto mb-1 mb-lg-0">
            <li className="nav-item">
              <a
                className="nav-link active"
                href="/toRegister"
                style={{ fontSize: "1.2rem" }}
              >
                הרשמה
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link active"
                href="/toLogin"
                style={{ fontSize: "1.2rem"}}
              >
                התחברות
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link active"
                href="/toTasks"
                style={{ fontSize: "1.2rem"}}
              >
                משימות
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

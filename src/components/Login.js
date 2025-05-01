import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import service from "../service";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await service.login(userName, password);
      navigate("/toTasks");
    } catch (error) {
      console.error("Error during login:", error);
      alert("אחד הפרטים שגויים");
    }
  };


  return (
    <div className="page-content d-flex justify-content-center align-items-center" style={{padding:"4rem" ,    backgroundColor:" rgb(77, 136, 135)"}}>
      <div className="card shadow-lg" style={{ width: "100%", maxWidth: "520px", padding: "3rem", borderRadius: "8px", marginTop: "90px" }}>
        <h1 className="text-center mb-4" style={{color:" rgb(24, 79, 75)"}}>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">user name</label>
            <input
              type="text"
              placeholder="Enter your user name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control"
            />
          </div>
          <div className="d-grid gap-2">
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                backgroundColor: "rgb(48, 92, 85)", // טורקיז
                border: "none",
                fontSize: "16px",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "rgb(60, 110, 102)")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "rgb(48, 92, 85)")}
            >
              Login
            </button>
          </div>
        </form>
        <div className="text-center mt-3">
          <a href="toRegister" className="text-decoration-none " style={{color:" rgb(24, 79, 75)"}}>
            Don't have an account? Register
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import service from "../service";

function Register() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [mail, setMail] = useState("");
  const navigate=useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await service.register(userName, password, mail);
      navigate("/toTasks")
      console.log("register response:", response);
    } catch (error) {
      console.error("Error during register:", error);
      alert("Registration failed. Please check your credentials.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{padding:"4rem" ,backgroundColor: "rgb(77, 136, 135)" }}>
      <div className="card shadow-lg" style={{ width: "100%", maxWidth: "520px", padding: "3rem", borderRadius: "8px" }}>
        <h1 className="text-center mb-4" style={{ color: "rgb(24, 79, 75)" }}>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">User Name</label>
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
            <label className="form-label">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
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
              Register
            </button>
          </div>
        </form>
        <div className="text-center mt-3">
          <Link to="/login" className="text-decoration-none" style={{ color: "rgb(24, 79, 75)" }}>
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;

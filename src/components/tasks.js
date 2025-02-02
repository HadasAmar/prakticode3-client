import React, { useEffect, useState } from "react";
import service from "../service";
import { useNavigate } from "react-router-dom";

function Tasks() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const navigate = useNavigate();

  async function getTodos() {
    const todos = await service.getTasks();
    setTodos(todos);
    const loggedInUser = service.getLoginUser();
    setCustomerName(loggedInUser ? loggedInUser.name : "");
  }

  async function createTodo(e) {
    e.preventDefault();
    await service.addTask(newTodo);
    setNewTodo(""); // clear input
    await getTodos(); // refresh tasks list (in order to see the new one)
  }

  async function updateCompleted(todo, isComplete) {
    await service.setCompleted(todo, isComplete);
    await getTodos();
  }

  async function deleteTodo(id) {
    await service.deleteTask(id);
    await getTodos(); // refresh tasks list
  }

  useEffect(() => {
    
    getTodos();
    }, []);
  
  async function logout() {
    await service.logout();
    window.location.reload();
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "rgb(77, 136, 135)",
        padding: "4rem",
      }}
    >
      <div
        className="card shadow-lg"
        style={{
          width: "100%",
          maxWidth: "720px",
          padding: "3rem",
          borderRadius: "10px",
          backgroundColor: "white",
        }}
      >
        <header className="text-center mb-4">
          <h1 style={{ color: "rgb(24, 79, 75)" }}>My Todo List</h1>
          {customerName && <p className="lead" style={{ color: "rgb(48, 92, 85)" }}>Welcome, {customerName}!</p>}
        </header>
        <form onSubmit={createTodo} className="mb-4">
          <div className="input-group">
            <input
              type="text"
              placeholder="What do you need to do today?"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              className="form-control"
              required
            />
            <button
              type="submit"
              className="btn"
              style={{
                backgroundColor: "rgb(48, 92, 85)",
                color: "white",
                border: "none",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "rgb(60, 110, 102)")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "rgb(48, 92, 85)")}
            >
              Add
            </button>
          </div>
        </form>
        <ul className="list-group">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="list-group-item d-flex justify-content-between align-items-center mb-2"
              style={{
                backgroundColor: todo.isComplete ? "rgba(159, 195, 188, 0.96)" : "rgb(213, 189, 186)",
                borderRadius: "6px",
              }}
            >
              <div className="d-flex align-items-center">
                <button
                  className={`btn btn-sm ${
                    todo.isComplete ? "btn-success" : "btn-outline-danger"
                  } rounded-circle me-3`}
                  style={{ width: "30px", height: "30px" }}
                  onClick={() => updateCompleted(todo, !todo.isComplete)}
                >
                  {todo.isComplete ? "✓" : "✗"}
                </button>
                <span className="flex-grow-1" style={{ color: "rgb(24, 79, 75)" }}>{todo.name}</span>
              </div>
              <button
                className="btn"
                style={{
                  backgroundColor: "rgb(48, 92, 85)",
                  color: "white",
                  border: "none",
                  borderRadius: "20px",
                  padding: "0.4rem 0.8rem",
                  fontSize: "14px",
                  transition: "background-color 0.3s",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "rgb(60, 110, 102)")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "rgb(48, 92, 85)")}
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={logout}
          className="btn w-100 mt-4"
          style={{
            backgroundColor: "rgb(48, 92, 85)",
            color: "white",
            border: "none",
            fontSize: "16px",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "rgb(60, 110, 102)")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "rgb(48, 92, 85)")}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Tasks;

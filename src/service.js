import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5233/api', // במקום https
  headers: {
    'Content-Type': 'application/json',
  },
});

function saveUserDetails({ id, name }) {
  localStorage.setItem("user_id", id);
  localStorage.setItem("user_name", name);
}

function getUserDetails() {
  const id = localStorage.getItem("user_id");
  const name = localStorage.getItem("user_name");
  if (!id || !name) return null;
  return { id: parseInt(id), name };
}


export default {
  register: async (name, password, email) => {
    const res = await apiClient.post("Customers/register", { name, password, email });
    saveUserDetails(res.data);
  },

  login: async (name, password) => {
    const res = await apiClient.post("Customers/login", { name, password });
    saveUserDetails(res.data);
  },

  getTasks: async () => {
    const user = getUserDetails();
    if (!user) throw new Error("בכדי לבצע פעולה זו עליך להתחבר תחילה");
    const result = await apiClient.get(`/items/user/${user.id}`);    return result.data;
  },

  addTask: async (name) => {
    const user = getUserDetails();
    if (!user) throw new Error("בכדי לבצע פעולה זו עליך להתחבר תחילה");
    const result = await apiClient.post('/items', { name, isComplete: false, userId: user.id });
    return result.data;
  },

  setCompleted: async (todo, isC) => {
    const updatedTask = { ...todo, isComplete: isC };
    const result = await apiClient.put(`/items/${todo.id}`, updatedTask);
    return result.data;
  },

  deleteTask: async (id) => {
    const result = await apiClient.delete(`/items/${id}`);
    return result.data;
  },
};

import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const apiClient = axios.create({
  baseURL: 'http://localhost:5203',
  headers: {
    'Content-Type': 'application/json', 
  },
});

//login
function saveAccessToken(authResult) {
  if (authResult && authResult.token) {
    console.log("Storing access token:", authResult.token);
    localStorage.setItem("access_token", authResult.token);
    setAuthorizationBearer();
  } else {
    console.log("No valid token received.");
  }
}

function setAuthorizationBearer() {
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}

axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    if (error.response.status === 401) {
      alert("Session expired. Please log in again.");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default {
  getLoginUser: () => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      try {
        console.log("my name? ",jwtDecode(accessToken))
        return jwtDecode(accessToken);
        
      } catch (e) {
        return null;
      }
    }
    return null;
  },

  logout: () => {
    localStorage.removeItem("access_token");
    delete axios.defaults.headers.common["Authorization"];
  },

  register: async (name, password, email ) => {
    const res = await apiClient.post("/register", { name, password , email});
    saveAccessToken(res.data);
  },

  login: async (email, password) => {
    alert("dskh")
    const res = await apiClient.post("/login", { email, password });
    saveAccessToken(res.data);
  },

  getTasks: async () => {
    setAuthorizationBearer();  // לוודא שהטוקן מותקן מחדש בכל בקשה
    const result = await apiClient.get('/items'); 
    return result.data;
  },

  addTask: async (name) => {
    setAuthorizationBearer();  // לוודא שהטוקן מותקן מחדש בכל בקשה
    const result = await apiClient.post('/items', { name, isComplete: false });
    return result.data;
  },

  setCompleted: async (todo, isC) => {
    setAuthorizationBearer();  // לוודא שהטוקן מותקן מחדש בכל בקשה
    const updatedTask = { ...todo, isComplete: isC };
    const result = await apiClient.put(`/items/${todo.id}`, updatedTask);
    return result.data;
  },

  deleteTask: async (id) => {
    setAuthorizationBearer();  // לוודא שהטוקן מותקן מחדש בכל בקשה
    const result = await apiClient.delete(`/items/${id}`);
    return result.data;
  },
};

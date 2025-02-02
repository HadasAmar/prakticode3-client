import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
const apiClient = axios.create({
  baseURL: 'http://localhost:5203',
  headers: {
    'Content-Type': 'application/json',
  },
});

// login
function saveAccessToken(authResult) {
  if (authResult && authResult.token) {
    localStorage.setItem("access_token", authResult.token);
    setAuthorizationBearer(authResult.token);
  } else {
    console.log("No valid token received.");
  }
}

function setAuthorizationBearer(token) {
  if (token) {
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
      delete apiClient.defaults.headers.common["Authorization"];
      localStorage.removeItem("access_token");
  }
}

apiClient.interceptors.response.use(
  response => response,
  error => {
    console.log("Error response intercepted:", error.response);
    if (error.response && error.response.status === 401) {
      alert("שגיאה בנסיון ההצגה, אנא התחבר מחדש");
      localStorage.removeItem("access_token");
      window.location.href = "/toLogin"; // מעביר לדף ההתחברות
    }
    return Promise.reject(error);
  }
);





export default {
  getLoginUser: () => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      return null; 
    }
    try {
      const decodedToken = jwtDecode(accessToken);
  
      const currentTime = Math.floor(Date.now() / 1000); // זמן נוכחי בשניות
      if (decodedToken.exp < currentTime) {
        console.log("expired token", decodedToken.exp, currentTime);
        localStorage.removeItem("access_token"); // מחק טוקן שפג תוקפו
        return null; // הטוקן לא תקף
      }
  
      return decodedToken; // הטוקן תקף
    } catch (error) {
      console.error("Failed to decode token:", error);
      return null; // במידה והטוקן לא תקין
    }
  },
  
  logout: () => {
    localStorage.removeItem("access_token");
    delete axios.defaults.headers.common["Authorization"];
  },

  register: async (name, password, email) => {
    const res = await apiClient.post("/register", { name, password, email });
    saveAccessToken(res.data);
  },

  login: async (email, password) => {
    const res = await apiClient.post("/login", { email, password });
    saveAccessToken(res.data);
  },

  getTasks: async () => {
    
    const accessToken = localStorage.getItem("access_token");
    console.log("Token being sent:", accessToken);
    setAuthorizationBearer(accessToken);  // לוודא שהטוקן תקין בכל בקשה
    const result = await apiClient.get('/items');
    return result.data;
  },

  addTask: async (name) => {
    const accessToken = localStorage.getItem("access_token");
    setAuthorizationBearer(accessToken);  // לוודא שהטוקן תקין בכל בקשה
    const result = await apiClient.post('/items', { name, isComplete: false });
    console.log("Response from /items:", result);
    return result.data;
  },

  setCompleted: async (todo, isC) => {
    const accessToken = localStorage.getItem("access_token");
    setAuthorizationBearer(accessToken);  // לוודא שהטוקן תקין בכל בקשה
    const updatedTask = { ...todo, isComplete: isC };
    const result = await apiClient.put(`/items/${todo.id}`, updatedTask);
    return result.data;
  },

  deleteTask: async (id) => {
    const accessToken = localStorage.getItem("access_token");
    setAuthorizationBearer(accessToken);  // לוודא שהטוקן תקין בכל בקשה
    const result = await apiClient.delete(`/items/${id}`);
    return result.data;
  },
};

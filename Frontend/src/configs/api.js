import axios from "axios";

const api = axios.create({
  baseURL: "https://resume-forge-backend-6wk1.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

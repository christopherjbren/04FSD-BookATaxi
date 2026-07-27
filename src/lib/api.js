import axios from "axios";

const apiUrl =
  import.meta.env.VITE_API_URL?.replace(/\/+$/, "") ||
  "http://localhost:3001";

const api = axios.create({
  baseURL: apiUrl,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
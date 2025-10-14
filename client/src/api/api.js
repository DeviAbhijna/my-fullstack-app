import axios from "axios";

const api = axios.create({
  baseURL: "https://my-fullstack-app-2m29.onrender.com/api" // LIVE backend
});

export default api;

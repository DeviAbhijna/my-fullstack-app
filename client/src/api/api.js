import axios from "axios";

const api = axios.create({
  baseURL: "https://my-fullstack-app-2m29.onrender.com/api" // LIVE backend
  //baseURL: "http://192.168.211.1:5000",
});

export default api;

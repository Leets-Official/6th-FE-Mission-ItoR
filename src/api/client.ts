import axios from "axios";

const api = axios.create({
  baseURL: "https://blog.leets.land", // swagger 도메인 기준
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

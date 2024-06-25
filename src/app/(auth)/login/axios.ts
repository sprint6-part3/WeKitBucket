import axios from "axios";

const instance = axios.create({
  baseURL: "https://wikied-api.vercel.app/0/",
});

export default instance;

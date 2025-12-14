import axios from "axios";

const httpRequest = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API,
});

export default httpRequest;

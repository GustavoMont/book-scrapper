import axios from "axios";

const baseURL = process.env.DOMAIN ?? "http://localhost:3000/api";

export const api = axios.create({
  baseURL,
});

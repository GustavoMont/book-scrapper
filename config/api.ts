import axios from "axios";

const baseURL = process.env.VERCEL_URL ?? "http://localhost:3000/api";

export const api = axios.create({
  baseURL,
});

const headers = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
};

export const scrapper = axios.create({
  headers,
});

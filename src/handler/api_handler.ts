import axios from "axios";
import type { login, recievedLogin, register } from "../ts/auth";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerUser = async (data: register) => {
  return await api.post("/user/register", data);
};

export const loginUser = async (data: login): Promise<recievedLogin> => {
  return await api.post("/user/login", data);
};

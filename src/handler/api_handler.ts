import axios, { type AxiosRequestConfig } from "axios";
import type {
  login,
  recievedLogin,
  registerOtpData,
  registerOtpRecieved,
} from "../typesTs/auth";

/* interface axiosRequestProps {
  url: string;
  method: AxiosRequestConfig["method"];
  data?: object | null;
  formData?: boolean;
} */

async function axiosRequestHandler<T>(
  url: string,
  method: AxiosRequestConfig["method"],
  data?: object | null,
  formData?: boolean
): Promise<T> {
  try {
    let headers = {};
    if (formData) {
      headers = {
        "Content-Type": "multipart/form-data",
      };
    } else {
      headers = {
        "Content-Type": "application/json",
      };
    }

    const response = await axios({
      url: import.meta.env.VITE_BASEURL + url,
      method,
      data,
      headers,
      withCredentials: true,
    });
    return response.data as T;
  } catch (error: any) {
    throw error || { message: "Something went wrong" };
  }
}

export const registerUser = async (data: any) => {
  return await axiosRequestHandler<any>("/user/register", "POST", data);
};

export const loginUser = async (data: login): Promise<recievedLogin> => {
  return await axiosRequestHandler("/user/login", "POST", data);
};

export const registerOtp = async (
  data: registerOtpData
): Promise<registerOtpRecieved> => {
  return await axiosRequestHandler("/user/registerOtp", "POST", data);
};

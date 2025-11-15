import axios, { type AxiosRequestConfig } from "axios";
import type {
  login,
  recievedLogin,
  otpData,
  otpRecieved,
  resetPasswordData,
  reportRecieved,
  reportData,
} from "../typesTs/auth";

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
      timeout: 10000,
    });
    return response?.data as T;
  } catch (error: any) {
    throw error?.response?.data || { message: "Something went wrong" };
  }
}

export const registerUser = async (data: any) => {
  return await axiosRequestHandler<any>("/user/register", "POST", data);
};

export const loginUser = async (data: login): Promise<recievedLogin> => {
  return await axiosRequestHandler("/user/login", "POST", data);
};

export const registerOtp = async (data: otpData): Promise<otpRecieved> => {
  return await axiosRequestHandler("/user/registerOtp", "POST", data);
};

export const forgotPasswordOtp = async (
  data: otpData
): Promise<otpRecieved> => {
  return await axiosRequestHandler("/user/forgotPasswordOtp", "POST", data);
};

export const resetPassword = async (
  data: resetPasswordData
): Promise<otpRecieved> => {
  return await axiosRequestHandler("/user/forgotPassword", "POST", data);
};

export const dashboardVehicles = async (data: any): Promise<any> => {
  return await axiosRequestHandler("/data/dashboardVehicle", "POST", data);
};

export const movingReport = async (
  data: reportData
): Promise<reportRecieved> => {
  return await axiosRequestHandler("/data/moving", "POST", data);
};

export const playbackReport = async (
  data: reportData
): Promise<reportRecieved> => {
  return await axiosRequestHandler("/data/playback", "POST", data);
};

import type { Dispatch, SetStateAction } from "react";

export interface login {
  email: string;
  password: string;
}

export interface loginComponentProps {
  accessPage: string;
}

export interface register extends login {
  username: string;
  confirmPassword: string;
  otp: number;
}

export interface registerComponentProps {
  accessPage: string;
  setAccessPage: Dispatch<SetStateAction<string>>;
}

export interface recievedLogin {
  success: boolean;
  message: string;
  status?: number;
  cause?: string | null;
  data: {
    username: string;
    email: string;
    id: string;
    vehicles: string[];
  };
}

export interface otpProps {
  email: string;
  onClose: () => void;
  isOpen: boolean;
  userInfo: any;
  setAccessPage: Dispatch<SetStateAction<string>>;
  reset: any;
}

export interface forgotPassword {
  onClose: () => void;
  isOpen: boolean;
  email: string;
  resendOtp: () => void;
}

export interface otpData {
  email: string;
}

export interface otpRecieved {
  success: boolean;
  message: string;
  status?: number;
  cause?: string | null;
}

export interface resetPasswordData {
  email: string;
  newPassword: string;
  otp: number;
}

export interface reportData {
  startDate: string;
  endDate: string;
}

export interface reportRecieved {
  success: boolean;
  message: string;
  data: [number, number][][];
}

export interface proxyData {
  coordinates: [number, number][];
}

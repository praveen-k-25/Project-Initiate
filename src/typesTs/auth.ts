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
}

export interface registerOtpData {
  email: string;
}

export interface registerOtpRecieved {
  success: boolean;
  message: string;
  status?: number;
  cause?: string | null;
}

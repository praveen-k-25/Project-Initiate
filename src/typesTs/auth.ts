import type {Dispatch, SetStateAction} from "react";

export interface login {
  email: string;
  password: string;
}

export interface loginComponentProps {
  changePasswordView: () => void;
  passwordView: boolean;
  accessPage: string;
  theme: string;
}

export interface register extends login {
  username: string;
  confirmPassword: string;
}

export interface registerComponentProps {
  changeRegisterPasswordView: () => void;
  registerPasswordView: boolean;
  accessPage: string;
  setAccessPage: Dispatch<SetStateAction<string>>;
  theme: string;
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

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

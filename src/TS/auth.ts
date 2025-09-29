export interface login {
  email: string;
  password: string;
}

export interface loginComponentProps {
  changePasswordView: () => void;
  passwordView: boolean;
  accessPage: string;
}

export interface register extends login {
  name: string;
}

export interface registerComponentProps {
  changeRegisterPasswordView: () => void;
  registerPasswordView: boolean;
  accessPage: string;
}

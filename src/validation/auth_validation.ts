import * as yup from "yup";

const login_Schema = yup.object().shape({
  email: yup
    .string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "invalid email address")
    .required("email is required")
    .email("email is invalid"),
  password: yup
    .string()
    .required("password is required")
    .min(6, "password must be at least 6 characters"),
});

const register_Schema = yup.object().shape({
  username: yup
    .string()
    .required("name is required")
    .matches(/^[a-zA-Z0-9]+$/, "no special characters allowed")
    .min(6, "name must be at least 6 characters"),
  email: yup
    .string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "invalid email address")
    .required("email is required")
    .email("email is invalid"),
  password: yup
    .string()
    .min(6, "password must be at least 6 characters")
    .required("password is required"),
  confirmPassword: yup
    .string()
    .required("confirm Password is required")
    .oneOf([yup.ref("password")], "password does not match"),
});

export { login_Schema, register_Schema };

import * as yup from "yup";

const login_Schema = yup.object().shape({
  email: yup.string().required("Email is required").email("Email is invalid"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const register_Schema = yup.object().shape({
  username: yup
    .string()
    .required("Name is required")
    .min(6, "Name must be at least 6 characters"),
  email: yup.string().required("Email is required").email("Email is invalid"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Password does not match"),
});

export {login_Schema, register_Schema};

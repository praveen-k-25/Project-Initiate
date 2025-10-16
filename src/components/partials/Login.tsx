import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState, type FC } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import whiteLoader from "../../assets/gifs/white-spinner.webp";
import { login_Schema } from "../../validation/auth_validation";
import type { login, loginComponentProps } from "../../typesTs/auth";
import type { appDispatch } from "../../store/store";
import { setAuth, setSliceTheme, setUser } from "../../store/auth_slice";
import { loginUser } from "../../handler/api_handler";
import TextInput from "../ui/TextInput";
import PasswordInput from "../ui/PasswordInput";
import Checkbox from "../ui/Checkbox";
import ForgotPassword from "./ForgotPassword";

const Login: FC<loginComponentProps> = (props) => {
  const { accessPage } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const dispatch = useDispatch<appDispatch>();
  const navigate = useNavigate();

  // forgot password
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState<boolean>(false);

  // form Validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setError,
  } = useForm({
    resolver: yupResolver(login_Schema),
  });

  useEffect(() => {
    clearErrors();
  }, [accessPage]);

  const onSubmit = async (data: login) => {
    try {
      setLoading(true);
      const response = await loginUser(data);
      toast.success("Logged In");
      dispatch(setAuth(response.success));
      dispatch(setUser(response.data));
      dispatch(setSliceTheme(localStorage?.getItem("metron-theme")));
      navigate("/dashboard", { replace: true });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: any) {
      const { cause, message } = error.response?.data;
      if (cause === "password") {
        setError("password", {
          type: "manual",
          message: "Invalid Password",
        });
      } else if (cause === "email") {
        setError("email", {
          type: "manual",
          message: "Invalid Email",
        });
      }
      toast.error(message || "Something went wrong");
      dispatch(setAuth(false));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="min-w-[300px] mt-8 flex flex-col gap-2"
      >
        {/* Username or Email */}

        <TextInput
          label="Email"
          type="email"
          name="email"
          id="login_email"
          autoFocus={true}
          register={register}
          errors={errors}
          errorMessage={(errors?.email?.message as string) || "invalid email"}
          componentClassName="flex flex-col gap-1"
          labelClassName="font-medium text-sm select-none text-[var(--text)]"
          inputClassName={`outline-none p-3 text-sm border border-[var(--border)] text-[var(--text)] caret-[var(--text)] rounded-lg bg-[var(--button)] transition-shadow duration-100 ${
            errors.email
              ? "border-[var(--destructive)] shadow-[0_0_2px_0_var(--destructive)]"
              : "focus:shadow-[0_0_2px_2px_var(--input)]"
          }`}
          errorClassName={`text-xs ml-1 font-medium text-[var(--destructive)] `}
        />

        {/* Password */}

        <PasswordInput
          label="Password"
          type="password"
          name="password"
          id="login_password"
          passwordView={true}
          register={register}
          errors={errors}
          errorMessage={
            (errors?.password?.message as string) || "invalid password"
          }
          componentClassName="flex flex-col gap-1"
          labelClassName="font-medium text-sm select-none text-[var(--text)]"
          inputWrapperClassName={`flex rounded-lg border border-[var(--border)] overflow-hidden ${
            errors?.password
              ? "border-[var(--destructive)] shadow-[0_0_2px_0_var(--destructive)]"
              : "focus-within:shadow-[0_0_2px_2px_var(--input)]"
          }`}
          inputClassName={`outline-none border-none p-3 text-sm flex-1 text-[var(--text)] caret-[var(--text)] bg-[var(--button)]`}
          visibleIconClassName="p-2 px-4 border-0 flex justify-center items-center bg-[var(--button)]"
          errorClassName={`text-xs ml-1 font-medium text-[var(--destructive)] `}
        />

        {/* Remember Me */}
        <section className="flex justify-between mt-3">
          <div className="text-sm flex gap-2">
            <Checkbox
              color="bg-[var(--primary)] border-[var(--primary)]"
              checked={rememberMe}
              onClick={() => {
                setRememberMe(!rememberMe);
              }}
            />
            <input
              id="remember_me"
              onChange={() => {
                setRememberMe(!rememberMe);
              }}
              type="checkbox"
              className="hidden"
            />
            <label
              htmlFor="remember_me"
              className="text-xs font-medium select-none text-[var(--text)]"
            >
              Remember Me
            </label>
          </div>
          <p
            onClick={() => setForgotPasswordOpen(true)}
            className="text-[var(--text)] capitalize font-medium text-xs text-right cursor-pointer select-none"
          >
            Forgot Password ?
          </p>
        </section>

        {/* Submit Button */}
        <button
          type="submit"
          className={`relative mt-2 text-white flex justify-center text-sm bg-[var(--primary)] px-2 font-medium rounded-lg cursor-pointer select-none ${loading ? "pointer-events-none disabled" : ""}`}
        >
          <img
            src={whiteLoader}
            alt="loading..."
            className={`w-9 ${!loading && "opacity-0"}`}
          />
          <p className={`p-2 ${loading && "opacity-0"} absolute inset-0`}>
            Sign In
          </p>
        </button>
      </form>
      <ForgotPassword
        isOpen={forgotPasswordOpen}
        onClose={() => setForgotPasswordOpen(false)}
      />
    </>
  );
};

export default Login;

import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState, type FC } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import whiteLoader from "../../assets/gifs/white-spinner.webp";
import password_eye from "../../assets/svgs/password_eye.svg";
import password_eye_close from "../../assets/svgs/password_eye_close.svg";
import password_eye_close_dark from "../../assets/svgs/password_eye_close_dark.svg";
import password_eye_dark from "../../assets/svgs/password_eye_dark.svg";
import { login_Schema } from "../../validation/auth_validation";
import type { login, loginComponentProps } from "../../typesTs/auth";
import type { appDispatch } from "../../store/store";
import { setAuth, setUser } from "../../store/auth_slice";
import { loginUser } from "../../handler/api_handler";
import TextInput from "../ui/TextInput";
import PasswordInput from "../ui/PasswordInput";
import Checkbox from "../ui/Checkbox";

const Login: FC<loginComponentProps> = (props) => {
  const { changePasswordView, passwordView, accessPage, theme } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const dispatch = useDispatch<appDispatch>();
  const navigate = useNavigate();
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
      navigate("/dashboard", { replace: true });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: any) {
      const { cause, message } = error.response?.data;
      if (cause === "password") {
        setError("password", {
          type: "manual",
          message: "Invalid Password",
        });
      }
      if (cause === "email") {
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-w-[300px] mt-8 flex flex-col gap-3 "
    >
      {/* Username or Email */}
      {/* <div className="flex flex-col gap-3">
        <label
          htmlFor="login_email"
          className="font-medium text-sm select-none text-[var(--text)]"
        >
          Email
        </label>
        <div className="flex flex-col gap-1">
          <input
            {...register("email")}
            type="text"
            id="login_email"
            className={`outline-none p-3 text-sm border text-[var(--text)] border-[var(--border)] rounded-lg bg-[var(--button)] transition-shadow duration-100 ${errors.email
              ? "border-[var(--destructive)] shadow-[0_0_2px_0_var(--destructive)]"
              : "focus:shadow-[0_0_2px_2px_var(--input)]"
              }`}
          />
          {errors.email && (
            <p className="text-xs ml-1 font-medium text-[var(--destructive)]">
              {errors?.email?.message}
            </p>
          )}
        </div>
      </div> */}
      <TextInput
        label="Email"
        type="email"
        name="email"
        id="login_email"
        register={register}
        errors={errors}
        errorMessage="Invalid Email"
        componentClassName="flex flex-col gap-3"
        labelClassName="font-medium text-sm select-none text-[var(--text)]"
        inputClassName={`outline-none p-3 text-sm border text-[var(--text)] border-[var(--border)] rounded-lg bg-[var(--button)] transition-shadow duration-100 ${
          errors.email
            ? "border-[var(--destructive)] shadow-[0_0_2px_0_var(--destructive)]"
            : "focus:shadow-[0_0_2px_2px_var(--input)]"
        }`}
        errorClassName={`text-xs ml-1 font-medium text-[var(--destructive)] `}
      />
      <PasswordInput
        label="Password"
        type="password"
        name="password"
        id="login_password"
        register={register}
        errors={errors}
        errorMessage="Invalid Password"
        componentClassName="flex flex-col gap-3"
        labelClassName="font-medium text-sm select-none text-[var(--text)]"
        inputWrapperClassName={`flex rounded-lg border border-[var(--border)] overflow-hidden ${
          errors?.password
            ? "border-[var(--destructive)] shadow-[0_0_2px_0_var(--destructive)]"
            : "focus-within:shadow-[0_0_2px_2px_var(--input)]"
        }`}
        inputClassName={`outline-none p-3 text-sm flex-1 text-[var(--text)] caret-[var(--text)] bg-[var(--button)]`}
        visibleIconClassName="p-2 px-4 border-0 flex justify-center items-center bg-[var(--button)]"
        errorClassName={`text-xs ml-1 font-medium text-[var(--destructive)] `}
      />

      {/* Password */}
      {/* <div className="flex flex-col gap-3">
        <label
          htmlFor="login_password"
          className="font-medium text-sm text-[var(--text)] select-none"
        >
          Password
        </label>
        <section className="flex flex-col gap-1">
          <div
            className={`flex rounded-lg border border-[var(--border)] overflow-hidden ${
              errors.password
                ? "border-[var(--destructive)] shadow-[0_0_2px_0_var(--destructive)]"
                : "focus-within:shadow-[0_0_2px_2px_var(--input)]"
            }`}
          >
            <input
              {...register("password")}
              type={`${passwordView ? "text" : "password"}`}
              id="login_password"
              className="outline-none p-3 text-sm flex-1 text-[var(--text)] caret-[var(--text)] bg-[var(--button)]"
            />
            <section
              onClick={changePasswordView}
              className="p-2 px-4 border-0 flex justify-center items-center bg-[var(--button)]"
            >
              {passwordView ? (
                <>
                  {theme === "light" ? (
                    <img
                      src={password_eye}
                      alt=""
                      className="w-4 text-[var(--text)]"
                    />
                  ) : (
                    <img
                      src={password_eye_dark}
                      alt=""
                      className="w-4 text-[var(--text)]"
                    />
                  )}
                </>
              ) : (
                <>
                  {theme === "light" ? (
                    <img
                      src={password_eye_close}
                      alt=""
                      className="w-4 text-[var(--text)]"
                    />
                  ) : (
                    <img
                      src={password_eye_close_dark}
                      alt=""
                      className="w-4 text-[var(--text)]"
                    />
                  )}
                </>
              )}
            </section>
          </div>

          {errors.password && (
            <p className="text-xs font-medium text-[var(--destructive)] ">
              {errors.password.message}
            </p>
          )}
        </section>
      </div> */}
      {/* Remember Me */}
      <section className="flex justify-between">
        <div
          onClick={() => {
            setRememberMe(!rememberMe);
          }}
          className="text-sm flex gap-2"
        >
          <Checkbox
            color="bg-[var(--primary)] border-[var(--primary)]"
            checked={rememberMe}
          />
          <label
            htmlFor="remember_me"
            className="text-xs font-medium select-none text-[var(--text)]"
          >
            Remember Me
          </label>
        </div>
        <p className="text-[var(--text)] capitalize font-medium text-xs text-right cursor-pointer select-none">
          Forgot Password ?
        </p>
      </section>

      {/* Submit Button */}
      <button
        type="submit"
        className="relative mt-2 text-white flex justify-center text-sm bg-[var(--primary)] px-2 font-medium rounded-lg cursor-pointer select-none"
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
  );
};

export default Login;

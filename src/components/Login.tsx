import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState, type FC } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import whiteLoader from "../assets/gifs/white-spinner.webp";
import password_eye from "../assets/svgs/password_eye.svg";
import password_eye_close from "../assets/svgs/password_eye_close.svg";
import { loginUser } from "../handler/api_handler";
import { setAuth, setUser } from "../store/auth_slice";
import type { appDispatch } from "../store/store";
import type { login, loginComponentProps } from "../typesTs/auth";
import { login_Schema } from "../validation/auth_validation";

const Login: FC<loginComponentProps> = (props) => {
  const { changePasswordView, passwordView, accessPage } = props;
  const [loading, setLoading] = useState<boolean>(false);
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
        })
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
      className="min-w-[300px] mt-8 flex flex-col gap-3"
    >
      {/* Username or Email */}
      <div className="flex flex-col gap-3">
        <label
          htmlFor="login_email"
          className="font-medium text-sm tex select-none dark:text-white text-[var(--foreground)] "
        >
          Email
        </label>
        <div className=" flex flex-col gap-1">
          <input
            {...register("email")}
            type="text"
            id="login_email"
            className={`outline-none p-3 bg-white text-sm border border-[var(--border)] rounded-lg  ${errors.email
              ? "border-red-500 shadow-[0_0_0_1px_var(--destructive)]"
              : "focus:shadow-[0_0_0_2px_var(--input)]"
              }`}
          />
          {errors.email && (
            <p className="text-xs ml-1 font-medium text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      {/* Password */}
      <div className="flex flex-col gap-3">
        <label
          htmlFor="login_password"
          className="font-medium text-sm text-[var(--foreground)] select-none"
        >
          Password
        </label>
        <section className="flex flex-col gap-1">
          <div
            className={`flex rounded-lg border border-[var(--border)] ${errors.password
              ? "border-red-500 shadow-[0_0_0_1px_var(--destructive)]"
              : "focus-within:shadow-[0_0_0_2px_var(--input)]"
              }`}
          >
            <input
              {...register("password")}
              type={`${passwordView ? "text" : "password"}`}
              id="login_password"
              className="outline-none p-3 text-sm flex-1"
            />
            <section
              onClick={changePasswordView}
              className="p-2 px-4 border-0 flex justify-center items-center"
            >
              {passwordView ? (
                <img src={password_eye} alt="" className="w-4" />
              ) : (
                <img src={password_eye_close} alt="" className="w-4" />
              )}
            </section>
          </div>

          {errors.password && (
            <p className="text-xs font-medium text-red-500">
              {errors.password.message}
            </p>
          )}
        </section>

        <section className="flex justify-between">
          <div className="text-sm flex gap-2">
            <input
              id="remember_me"
              type="checkbox"
              className="checked:bg-black checked:border-black"
            />
            <label
              htmlFor="remember_me"
              className=" text-xs font-medium select-none"
            >
              Remember Me
            </label>
          </div>
          <p className="text-black capitalize font-medium text-xs text-right cursor-pointer select-none">
            Forgot Password ?
          </p>
        </section>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="relative mt-2 text-white flex justify-center text-sm bg-[var(--primary)] px-2 font-medium rounded-lg cursor-pointer select-none"
      >
        <img src={whiteLoader} alt="loading..." className={`w-9 ${!loading && "opacity-0"}`} />
        <p className={`p-2 ${loading && "opacity-0"} absolute inset-0`}>Sign In</p>
      </button> 
    </form>
  );
};

export default Login;

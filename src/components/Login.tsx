import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState, type FC } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import whiteLoader from "../assets/gifs/black-spinner.gif";
import password_eye from "../assets/svgs/password_eye.svg";
import password_eye_close from "../assets/svgs/password_eye_close.svg";
import { usertracker } from "../features/mqtt";
import { loginUser } from "../handler/api_handler";
import { setAuth, setUser } from "../store/auth_slice";
import type { appDispatch } from "../store/store";
import type { login, loginComponentProps } from "../ts/auth";
import { login_Schema } from "../validation/auth_validation";

const Login: FC<loginComponentProps> = (props) => {
  const {changePasswordView, passwordView, accessPage} = props;
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch<appDispatch>();
  const navigate = useNavigate();
  // form Validation
  const {
    register,
    handleSubmit,
    formState: {errors},
    clearErrors,
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
      navigate("/dashboard", {replace: true});
      usertracker();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("User not found"); 
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
          className="font-semibold text-sm select-none"
        >
          Email
        </label>
        <div className=" flex flex-col gap-1">
          <input
            {...register("email")}
            type="text"
            id="login_email"
            className={`outline-none p-3 text-sm rounded-lg bg-blue-50 ${
              errors.email
                ? "border-2 border-red-500"
                : "focus:shadow-[0_0_2px_0_#234]"
            }`}
          />
          {errors.email && (
            <p className="text-xs ml-1 font-semibold text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      {/* Password */}
      <div className="flex flex-col gap-3">
        <label
          htmlFor="login_password"
          className="font-semibold text-sm select-none"
        >
          Password
        </label>
        <section className="flex flex-col gap-1">
          <div
            className={`flex rounded-lg bg-blue-50 ${
              errors.password
                ? "border-2 border-red-500 shadow-[0_0_1px_0_#D61717]"
                : "focus:shadow-[0_0_2px_0_#234]"
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
            <p className="text-xs font-semibold text-red-500">
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
              className=" text-xs font-semibold select-none"
            >
              Remember Me
            </label>
          </div>
          <p className="text-black capitalize font-semibold text-xs text-right cursor-pointer select-none">
            Forgot Password ?
          </p>
        </section>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className=" mt-2 text-white flex justify-center text-sm bg-black p-3 rounded-lg cursor-pointer select-none"
      >
        {loading ? (
          <img src={whiteLoader} alt="loading..." className="w-5" />
        ) : (
          "Sign In"
        )}
      </button>
    </form>
  );
};

export default Login;

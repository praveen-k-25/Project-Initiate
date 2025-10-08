import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState, type FC } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import whiteLoader from "../../assets/gifs/white-spinner.webp";
import password_eye from "../../assets/svgs/password_eye.svg";
import password_eye_close from "../../assets/svgs/password_eye_close.svg";
import password_eye_close_dark from "../../assets/svgs/password_eye_close_dark.svg";
import password_eye_dark from "../../assets/svgs/password_eye_dark.svg";
import { registerUser } from "../../handler/api_handler";
import type { register, registerComponentProps } from "../../typesTs/auth";
import { register_Schema } from "../../validation/auth_validation";

const Register: FC<registerComponentProps> = (props) => {
  const {
    changeRegisterPasswordView,
    registerPasswordView,
    accessPage,
    setAccessPage,
    theme,
  } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: yupResolver(register_Schema),
  });

  useEffect(() => {
    clearErrors();
  }, [accessPage]);

  const onSubmit = async (data: register) => {
    try {
      setLoading(true);
      await registerUser(data);
      toast.success("Registration Completed");
      setAccessPage("SignUp");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Email already exist");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-w-[300px] mt-8 flex flex-col gap-2"
    >
      {/* Username */}
      <section className="flex flex-col gap-3">
        <label
          htmlFor="register_user"
          className="font-medium text-sm select-none text-[var(--text)] "
        >
          Username
        </label>
        <div className=" flex flex-col gap-1">
          <input
            {...register("username")}
            type="text"
            id="register_user"
            className={`outline-none border border-[var(--border)] p-3 text-sm rounded-lg text-[var(--text)] caret-[var(--text)] bg-[var(--button)] ${
              errors.username
                ? "border-[var(--destructive)] shadow-[0_0_2px_0_var(--destructive)]"
                : "focus:shadow-[0_0_2px_2px_var(--input)]"
            }`}
          />
          {errors.username && (
            <p className="text-xs ml-1 font-medium text-[var(--destructive)]">
              {errors.username.message}
            </p>
          )}
        </div>
      </section>
      {/* Email */}
      <section className="flex flex-col gap-3">
        <label
          htmlFor="register_email"
          className="font-medium text-[var(--text)] text-sm select-none"
        >
          Email
        </label>
        <div className=" flex flex-col gap-1">
          <input
            {...register("email")}
            type="text"
            id="register_email"
            className={`outline-none p-3 text-sm rounded-lg text-[var(--text)] border border-[var(--border)] caret-[var(--text)] bg-[var(--button)] ${
              errors.email
                ? "border-[var(--destructive)] shadow-[0_0_2px_0_var(--destructive)]"
                : "focus:shadow-[0_0_2px_2px_var(--input)]"
            }`}
          />
          {errors.email && (
            <p className="text-xs ml-1 font-medium text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {/* Password */}
        <div className="flex flex-col gap-3">
          <label
            htmlFor="register_password"
            className="font-medium text-[var(--text)] text-sm select-none"
          >
            Password
          </label>
          <section className="flex flex-col gap-1">
            <input
              {...register("password")}
              type="password"
              id="register_password"
              className={`outline-none p-3 text-sm flex-1 rounded-lg border border-[var(--border)] text-[var(--text)] caret-[var(--text)] bg-[var(--button)] overflow-hidden ${
                errors.password
                  ? "border-[var(--destructive)] shadow-[0_0_2px_0_var(--destructive)]"
                  : "focus-within:shadow-[0_0_2px_2px_var(--input)]"
              }`}
            />

            {errors.password && (
              <p className="text-xs font-medium text-red-500">
                {errors.password.message}
              </p>
            )}
          </section>
        </div>
        {/*Confirm Password */}
        <div className="flex flex-col gap-3">
          <label
            htmlFor="register_password"
            className="font-medium text-[var(--text)] text-sm select-none"
          >
            Confirm Password
          </label>
          <section className="flex flex-col gap-1">
            <div
              className={`w-full flex rounded-lg overflow-hidden border border-[var(--border)] text-[var(--text)] caret-[var(--text)] bg-[var(--button)] ${
                errors.password
                  ? "border-[var(--destructive)] shadow-[0_0_2px_0_var(--destructive)]"
                  : "focus-within:shadow-[0_0_2px_2px_var(--input)]"
              }`}
            >
              <input
                {...register("confirmPassword")}
                type={`${registerPasswordView ? "text" : "password"}`}
                id="register_confirmPpassword"
                className="outline-none p-3 text-sm w-[80%] "
              />
              <section
                onClick={changeRegisterPasswordView}
                className="border-0 flex flex-1 justify-center items-center w-[20%]"
              >
                {registerPasswordView ? (
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

            {errors.confirmPassword && (
              <p className="text-xs font-medium text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </section>
        </div>
      </section>
      {/* Submit Button */}
      <button
        type="submit"
        className=" mt-2 text-white text-sm font-medium flex justify-center bg-[var(--primary)] p-[2px] rounded-lg cursor-pointer select-none"
      >
        {loading ? (
          <img
            src={whiteLoader}
            alt="loading..."
            className={`w-9 ${!loading && "opacity-0"}`}
          />
        ) : (
          <span className="p-2">Sign Up</span>
        )}
      </button>
    </form>
  );
};

export default Register;

import { useEffect, useState, type FC } from "react";
import type { register, registerComponentProps } from "../typesTs/auth";
import { useForm } from "react-hook-form";
import { register_Schema } from "../validation/auth_validation";
import { yupResolver } from "@hookform/resolvers/yup";
import password_eye from "../assets/svgs/password_eye.svg";
import password_eye_close from "../assets/svgs/password_eye_close.svg";
import { registerUser } from "../handler/api_handler";
import toast from "react-hot-toast";
import whiteLoader from "../assets/gifs/black-spinner.gif";

const Register: FC<registerComponentProps> = (props) => {
  const { changeRegisterPasswordView, registerPasswordView, accessPage,setAccessPage } =
    props;
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
      setAccessPage("SignUp")
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Email already exist");
    }finally{
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
          className="font-semibold text-sm select-none"
        >
          Username
        </label>
        <div className=" flex flex-col gap-1">
          <input
            {...register("username")}
            type="text"
            id="register_user"
            className={`outline-none p-3 text-sm rounded-lg bg-blue-50 ${
              errors.username
                ? "border-2 border-red-500"
                : "focus:shadow-[0_0_2px_0_#234]"
            }`}
          />
          {errors.username && (
            <p className="text-xs ml-1 font-semibold text-red-500">
              {errors.username.message}
            </p>
          )}
        </div>
      </section>
      {/* Email */}
      <section className="flex flex-col gap-3">
        <label
          htmlFor="register_email"
          className="font-semibold text-sm select-none"
        >
          Email
        </label>
        <div className=" flex flex-col gap-1">
          <input
            {...register("email")}
            type="text"
            id="register_email"
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
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {/* Password */}
        <div className="flex flex-col gap-3">
          <label
            htmlFor="register_password"
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
                type="password"
                id="register_password"
                className="outline-none p-3 text-sm flex-1"
              />
            </div>

            {errors.password && (
              <p className="text-xs font-semibold text-red-500">
                {errors.password.message}
              </p>
            )}
          </section>
        </div>
        {/*Confirm Password */}
        <div className="flex flex-col gap-3">
          <label
            htmlFor="register_password"
            className="font-semibold text-sm select-none"
          >
            Confirm Password
          </label>
          <section className="flex flex-col gap-1">
            <div
              className={`w-full flex rounded-lg bg-blue-50 ${
                errors.password
                  ? "border-2 border-red-500 shadow-[0_0_1px_0_#D61717]"
                  : "focus:shadow-[0_0_2px_0_#234]"
              }`}
            >
              <input
                {...register("confirmPassword")}
                type={`${registerPasswordView ? "text" : "password"}`}
                id="register_confirmPpassword"
                className="outline-none p-3 text-sm w-[80%]"
              />
              <section
                onClick={changeRegisterPasswordView}
                className="border-0 flex flex-1 justify-center items-center w-[20%]"
              >
                {registerPasswordView ? (
                  <img src={password_eye} alt="" className="w-4" />
                ) : (
                  <img src={password_eye_close} alt="" className="w-4" />
                )}
              </section>
            </div>

            {errors.confirmPassword && (
              <p className="text-xs font-semibold text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </section>
        </div>
      </section>
      {/* Submit Button */}
      <button
        type="submit"
        className=" mt-2 text-white text-sm flex justify-center bg-black p-3 rounded-lg cursor-pointer select-none"
      >
        {loading ? (
          <img src={whiteLoader} alt="loading..." className="w-5" />
        ) : (
          "Sign Up"
        )}
      </button>
    </form>
  );
};

export default Register;

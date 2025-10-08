import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState, type FC } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import whiteLoader from "../../assets/gifs/white-spinner.webp";
import { registerUser } from "../../handler/api_handler";
import type { register, registerComponentProps } from "../../typesTs/auth";
import { register_Schema } from "../../validation/auth_validation";
import TextInput from "../ui/TextInput";
import PasswordInput from "../ui/PasswordInput";

const Register: FC<registerComponentProps> = (props) => {
  const { accessPage, setAccessPage } = props;
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
      className="min-w-[300px] mt-8 flex flex-col gap-1"
    >
      {/* Username */}
      <TextInput
        label="Username"
        type="text"
        name="username"
        id="register_user"
        register={register}
        errors={errors}
        errorMessage={
          (errors?.username?.message as string) || "username is required"
        }
        componentClassName="flex flex-col gap-1 overflow-hidden"
        labelClassName="font-medium text-sm select-none text-[var(--text)]"
        inputClassName={`outline-none p-3 text-sm border border-[var(--border)] text-[var(--text)] caret-[var(--text)] bg-[var(--button)] rounded-lg ${
          errors.username
            ? "border-[var(--destructive)] shadow-[0_0_2px_0_var(--destructive)]"
            : "focus:shadow-[0_0_2px_2px_var(--input)]"
        }`}
        errorClassName={`text-xs ml-1 font-medium text-[var(--destructive)] `}
      />
      {/* Email */}
      <TextInput
        label="Email"
        type="email"
        name="email"
        id="register_email"
        register={register}
        errors={errors}
        errorMessage={(errors?.email?.message as string) || "email is required"}
        componentClassName="flex flex-col gap-1 overflow-hidden"
        labelClassName="font-medium text-sm select-none text-[var(--text)]"
        inputClassName={`outline-none p-3 text-sm border text-[var(--text)] border-[var(--border)] rounded-lg bg-[var(--button)] transition-shadow duration-100 ${
          errors.email
            ? "border-[var(--destructive)] shadow-[0_0_2px_0_var(--destructive)]"
            : "focus:shadow-[0_0_2px_2px_var(--input)]"
        }`}
        errorClassName={`text-xs ml-1 font-medium text-[var(--destructive)] `}
      />

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {/* Password */}
        <PasswordInput
          label="Password"
          type="password"
          name="password"
          id="login_password"
          passwordView={false}
          register={register}
          errors={errors}
          errorMessage={
            (errors?.password?.message as string) || "password is reaquired"
          }
          componentClassName="flex flex-col gap-1 overflow-hidden"
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

        {/*Confirm Password */}
        <PasswordInput
          label="Password"
          type="password"
          name="confirmPassword"
          id="register_confirm_password"
          passwordView={true}
          register={register}
          errors={errors}
          errorMessage={
            (errors?.confirmPassword?.message as string) ||
            "password is required"
          }
          componentClassName="flex flex-col gap-1 overflow-hidden"
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

import { useState } from "react";
import password_eye from "../../assets/svgs/password_eye.svg";
import password_eye_close from "../../assets/svgs/password_eye_close.svg";
import password_eye_close_dark from "../../assets/svgs/password_eye_close_dark.svg";
import password_eye_dark from "../../assets/svgs/password_eye_dark.svg";
import { useSelector } from "react-redux";

interface PasswordInputProps {
  label?: string;
  type: string;
  name: string;
  id: string;
  passwordView?: boolean;
  register: any;
  errors: any;
  errorMessage?: string;
  componentClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  inputWrapperClassName?: string;
  visibleIconClassName?: string;
  errorClassName?: string;
}

const PasswordInput = ({
  label,
  type,
  name,
  id,
  passwordView = false,
  register,
  errors,
  errorMessage,
  componentClassName = "flex flex-col gap-3",
  labelClassName = "font-medium text-sm select-none text-[var(--text)]",
  inputWrapperClassName = "flex rounded-lg border border-[var(--border)] overflow-hidden",
  inputClassName = "outline-none border-none p-3 text-sm text-[var(--text)] rounded-lg bg-[var(--button)]",
  visibleIconClassName = "p-2 px-4 border-none flex justify-center items-center bg-[var(--button)]",
  errorClassName = "text-xs ml-1 font-medium text-[var(--destructive)]",
}: PasswordInputProps) => {
  const { theme } = useSelector((state: any) => state.auth);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className={componentClassName}>
      {label && (
        <label htmlFor={id} className={labelClassName}>
          {label}
        </label>
      )}
      <section className="flex flex-col gap-1">
        <div className={inputWrapperClassName}>
          <input
            {...register(name)}
            id={id}
            type={showPassword ? "text" : type}
            className={inputClassName}
          />
          {passwordView && (
            <section
              onClick={togglePasswordVisibility}
              className={visibleIconClassName}
            >
              {showPassword ? (
                <img
                  src={theme === "light" ? password_eye : password_eye_dark}
                  alt=""
                  className="w-4 text-[var(--text)] border-none "
                />
              ) : (
                <img
                  src={
                    theme === "light"
                      ? password_eye_close
                      : password_eye_close_dark
                  }
                  alt=""
                  className="w-4 text-[var(--text)] border-none"
                />
              )}
            </section>
          )}
        </div>

        <p
          className={`${errors[name] ? "opacity-100" : "opacity-0"} ${errorClassName}`}
        >
          {errorMessage}
        </p>
      </section>
    </div>
  );
};

export default PasswordInput;

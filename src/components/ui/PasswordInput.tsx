import { useState } from "react";
import password_eye from "../../assets/svgs/password_eye.svg";
import password_eye_close from "../../assets/svgs/password_eye_close.svg";
import password_eye_close_dark from "../../assets/svgs/password_eye_close_dark.svg";
import password_eye_dark from "../../assets/svgs/password_eye_dark.svg";
import useTheme from "../../hooks/useTheme";

interface PasswordInputProps {
  label?: string;
  type: string;
  name: string;
  id: string;
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
  register,
  errors,
  errorMessage,
  componentClassName = "flex flex-col gap-3",
  labelClassName = "font-medium text-sm select-none text-[var(--text)]",
  inputWrapperClassName = "",
  inputClassName = "outline-none p-3 text-sm border text-[var(--text)] border-[var(--border)] rounded-lg bg-[var(--button)]",
  visibleIconClassName = "p-2 px-4 border-0 flex justify-center items-center bg-[var(--button)]",
  errorClassName = "text-xs ml-1 font-medium text-[var(--destructive)]",
}: PasswordInputProps) => {
  const [theme, setTheme] = useTheme();
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
            type={type}
            className={inputClassName}
          />
          <section
            onClick={togglePasswordVisibility}
            className={visibleIconClassName}
          >
            {showPassword ? (
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

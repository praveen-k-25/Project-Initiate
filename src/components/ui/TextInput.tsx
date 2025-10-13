interface TextInputProps {
  label?: string;
  type: string;
  name: string;
  id: string;
  autoFocus?: boolean;
  register: any;
  errors: any;
  errorMessage?: string;
  componentClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
}

const TextInput = ({
  label,
  type,
  name,
  id,
  autoFocus = false,
  register,
  errors,
  errorMessage,
  componentClassName = "flex flex-col gap-3",
  labelClassName = "font-medium text-sm select-none text-[var(--text)]",
  inputClassName = "outline-none p-3 text-sm border text-[var(--text)] border-[var(--border)] rounded-lg bg-[var(--button)]",
  errorClassName = "text-xs ml-1 font-medium text-[var(--destructive)]",
}: TextInputProps) => {
  return (
    <div className={componentClassName}>
      {label && (
        <label htmlFor={id} className={labelClassName}>
          {label}
        </label>
      )}
      <section className="flex flex-col gap-1 border-none">
        <input
          {...register(name)}
          id={id}
          type={type}
          autoFocus={autoFocus}
          className={inputClassName}
        />
        <p
          className={`${errors[name] ? "opacity-100" : "opacity-0"} ${errorClassName}`}
        >
          {errorMessage}
        </p>
      </section>
    </div>
  );
};

export default TextInput;

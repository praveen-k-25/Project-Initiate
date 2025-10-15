import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FC,
  type KeyboardEvent,
} from "react";
import type { otpProps, register } from "../../typesTs/auth";
import { registerUser } from "../../handler/api_handler";
import toast from "react-hot-toast";
import whiteLoader from "../../assets/gifs/white-spinner.webp";

const Otp: FC<otpProps> = (props) => {
  const { email, onClose, isOpen, userInfo, setAccessPage } = props;
  const inputRef = useRef<Array<HTMLInputElement | null>>([]);
  const [resend, setResend] = useState(true);
  const [seconds, setSeconds] = useState(30);
  const [otp, setOtp] = useState<string[]>(Array(4).fill(""));
  const [loading, setLoading] = useState<boolean>(false);
  const [otpError, setOtpError] = useState<{ message: string; error: boolean }>(
    { message: "", error: false }
  );

  useEffect(() => {
    inputRef.current[0]?.focus();
  }, [isOpen]);

  useEffect(() => {
    setOtpError({ message: "", error: false });
  }, [otp]);

  const startCountdown = () => {
    setResend(false); // disable resend while counting down

    const intervalId = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId); // stop countdown
          setResend(true); // enable resend
          return 30; // reset
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleInputChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return; // allow only numbers (0–9)

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < inputRef.current.length - 1) {
      inputRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        // Clear current input
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        // Move to previous input if current is already empty
        inputRef.current[index - 1]?.focus();
      }
    }
  };

  const handleClose = () => {
    onClose();
    setOtp(Array(4).fill(""));
  };

  const onSubmit = async () => {
    if (otp.length === 4) {
      setOtpError({ message: "Invalid OTP", error: true });
      return;
    }
    try {
      setLoading(true);
      await registerUser(userInfo as register);
      toast.success("Registration Completed");
      setAccessPage("SignUp");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setOtpError({ message: "Invalid OTP", error: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`fixed sm:left-[50%] inset-0 backdrop-blur-xs flex flex-col justify-center items-center text-[var(--text)] p-3 ${isOpen ? " z-10" : "-z-20"}`}
    >
      <div
        className={`w-[370px] p-4 rounded-md bg-[var(--background)] border border-[var(--border)] transition-all ease-in-out duration-300 ${isOpen ? " translate-0 opacity-100" : "translate-y-2 opacity-0"} flex flex-col gap-4`}
      >
        <span className=" font-semibold text-2xl">Verify OTP</span>
        <div className="font-light flex flex-col gap-1">
          <p className="text-sm ">
            We sent an OTP to{" "}
            <span className="font-semibold text-[var(--sub-text)]">
              {email}
            </span>{" "}
          </p>
          <p className="text-sm">Enter it below to continue.</p>
        </div>
        <section className="flex justify-around items-center gap-3 font-light">
          {Array.from({ length: 4 }, (_, index) => (
            <input
              ref={(el: HTMLInputElement | null) => {
                inputRef.current[index] = el;
              }}
              key={`otp-${index}`}
              type="text"
              maxLength={1}
              value={otp[index]}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleInputChange(e.target.value, index)
              }
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                handleKeyDown(e, index)
              }
              className={`rounded-md border border-[var(--border)] bg-[var(--primary-background)] text-center text-[var(--text)] w-[40px] h-[40px] ${otpError.error && "border-[var(--destructive)]"}`}
            />
          ))}
          {
            // show error message
            otpError.error && (
              <span className="text-[var(--destructive)] text-xs">
                {otpError.message}
              </span>
            )
          }
        </section>
        <div className="font-light text-sm my-1">
          <p className="flex justify-between gap-2">
            Resend available{" "}
            {!resend &&
              `in 00:${seconds < 10 ? `0${seconds}` : seconds} seconds`}
            <span
              onClick={() => {
                resend && startCountdown();
              }}
              className={`${resend ? "text-[var(--primary)]" : "text-[var(--sub-primary)]"} font-semibold tracking-wide cursor-pointer whitespace-nowrap`}
            >
              Resend OTP
            </span>
          </p>
        </div>
        <button
          onClick={onSubmit}
          className="bg-[var(--primary)] px-3 py-2 rounded-md"
        >
          {loading ? (
            <img
              src={whiteLoader}
              alt="loading..."
              className={`w-9 ${!loading && "opacity-0"}`}
            />
          ) : (
            <span className="p-2">verify</span>
          )}
        </button>
        <div
          onClick={handleClose}
          className="text-[var(--text)] text-sm text-center cursor-pointer"
        >
          Back to Register
        </div>
      </div>
    </div>
  );
};

export default Otp;

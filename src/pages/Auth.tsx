import { useEffect, useState } from "react";
import loginBackgruoundImage from "../assets/images/birds-eye.jpg";
import companyLogoDark from "../assets/svgs/logo-dark.svg";
import companyLogo from "../assets/svgs/logo.svg";
import Login from "../components/partials/Login";
import Register from "../components/partials/Register";
import useTheme from "../hooks/useTheme";
import { useDispatch } from "react-redux";
import type { appDispatch } from "../store/store";
import { setLogout, setSliceTheme } from "../store/auth_slice";

const Auth = () => {
  const dispatch = useDispatch<appDispatch>();
  const [accessPage, setAccessPage] = useState("SignUp");
  const [theme, setTheme] = useTheme();

  useEffect(() => {
    dispatch(setLogout());
    dispatch(setSliceTheme(localStorage.getItem("metron-theme") || "light"));
  }, []);

  const handleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <div className="relative w-screen h-screen">
      <img
        src={loginBackgruoundImage}
        alt="Metron Login Image"
        className="w-full h-full overflow-x-hidden"
      />
      <div className="absolute inset-0 bg-transparent grid md:grid-cols-2">
        <section className="hidden md:block"></section>
        <section className={`overflow-auto bg-white`}>
          <div
            className={`relative overflow-x-hidden w-full h-full bg-[var(--background)]`}
          >
            {/* Sign In or Login */}
            <section
              className={`bg-transparent flex flex-col justify-between items-center w-full h-full absolute inset-0 transition-all ${
                accessPage === "SignIn"
                  ? " opacity-0 duration-500 -translate-x-full"
                  : " opacity-100 duration-600 z-10 "
              }`}
            >
              <article className="w-full flex gap-2 justify-center items-center p-3 select-none">
                <>
                  {theme === "light" ? (
                    <img
                      onClick={handleTheme}
                      src={companyLogo}
                      alt=""
                      className={`w-7`}
                    />
                  ) : (
                    <img
                      onClick={handleTheme}
                      src={companyLogoDark}
                      alt=""
                      className={`w-7`}
                    />
                  )}
                </>

                <span className="font-semibold text-lg text-[var(--text)]">
                  Metron
                </span>
              </article>
              <article className="flex-1 flex flex-col justify-center items-center gap-2 m-2">
                <div className="bg-[var(--primary-background)] px-5 py-6 rounded-[var(--radius)] border border-[var(--border)] flex flex-col justify-center gap-2">
                  <h2 className="text-2xl text-center select-none text-[var(--text)]">
                    Welcome
                  </h2>
                  <p className="text-sm text-center text-[var(--sub-text)] mx-3 select-none ">
                    Enter your email and password to access your account
                  </p>
                  <Login accessPage={accessPage} />
                </div>
              </article>
              <article className="text-[var(--sub-text)] font-medium text-sm text-center p-4 select-none">
                Dont't have an account?{" "}
                <span
                  onClick={() => setAccessPage("SignIn")}
                  className="text-[var(--text)]  font-semibold underline cursor-pointer"
                >
                  Sign Up
                </span>
              </article>
            </section>
            {/* Sign Up or Register */}
            <section
              className={`bg-transparent flex flex-col w-full px-3 h-full absolute inset-0 transition-all ${
                accessPage === "SignUp"
                  ? "opacity-0 duration-500 translate-x-full"
                  : "opacity-100 duration-600 z-10"
              }`}
            >
              <article className="w-full flex gap-2 justify-center items-center p-3 select-none">
                <>
                  {theme === "light" ? (
                    <img
                      onClick={handleTheme}
                      src={companyLogo}
                      alt=""
                      className={`w-7`}
                    />
                  ) : (
                    <img
                      onClick={handleTheme}
                      src={companyLogoDark}
                      alt=""
                      className={`w-7`}
                    />
                  )}
                </>
                <span className="font-semibold text-lg text-[var(--text)]">
                  Metron
                </span>
              </article>
              <article className="flex-1 flex flex-col justify-center items-center gap-2 px-1 m-2">
                <div className="bg-[var(--primary-background)] px-5 py-6 rounded-[var(--radius)] border border-[var(--border)] flex flex-col justify-center gap-2">
                  <h2 className="text-2xl text-[var(--text)] text-center">
                    Create an account
                  </h2>
                  <p className="text-sm text-center font-medium text-[var(--sub-text)]">
                    Enter your email and password to access your account
                  </p>
                  <Register
                    accessPage={accessPage}
                    setAccessPage={setAccessPage}
                  />
                </div>
              </article>
              <article className="text-[var(--sub-text)] font-medium text-sm text-center p-4">
                Back to{" "}
                <span
                  onClick={() => setAccessPage("SignUp")}
                  className="text-[var(--text)] font-semibold underline cursor-pointer"
                >
                  Sign In
                </span>
              </article>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Auth;

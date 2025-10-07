import { useState } from "react";
import loginBackgruoundImage from "../assets/images/birds-eye.jpg";
import companyLogo from "../assets/svgs/logo.svg";
import companyLogoDark from "../assets/svgs/logo-dark.svg";
import Login from "../components/Login";
import Register from "../components/Register";
import useTheme from "../hooks/useTheme";

const Auth = () => {
  const [accessPage, setAccessPage] = useState("SignUp");
  const [loginPasswordView, setLoginPasswordView] = useState(false);
  const [registerPasswordView, setRegisterPasswordView] = useState(false);
  const [theme, setTheme] = useTheme();

  const changeLoginPasswordView = () =>
    setLoginPasswordView(!loginPasswordView);

  const changeRegisterPasswordView = () =>
    setRegisterPasswordView(!registerPasswordView);

  const handleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
      console.log("changed to light");
    } else {
      setTheme("dark");
      console.log("changed to dark");
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
          <div className={`relative overflow-x-hidden w-full h-full`}>
            {/* Sign In or Login */}
            <section
              className={`bg-white dark:bg-amber-300 flex flex-col w-full h-full absolute inset-0 transition-all ${accessPage === "SignIn"
                ? "opacity-0 duration-500 -translate-x-full"
                : "opacity-100 duration-600 z-10 "
                }`}
            >
              <article className="w-full flex gap-2 justify-center items-center p-3 select-none">
                <>
                  {theme === "light" ?
                    <img onClick={handleTheme} src={companyLogo} alt="" className={`w-7`} /> :
                    <img onClick={handleTheme} src={companyLogoDark} alt="" className={`w-7`} />}
                </>

                <span className="font-semibold text-lg">Metron</span>
              </article>
              <article className="flex-1 flex flex-col justify-center items-center gap-2">
                <h2 className="text-2xl select-none">
                  Welcome
                </h2>
                <p className="text-sm text-center text-gray-700 mx-3 select-none">
                  Enter your email and password to access your account
                </p>
                <Login
                  changePasswordView={changeLoginPasswordView}
                  passwordView={loginPasswordView}
                  accessPage={accessPage}
                />
              </article>
              <article className="text-gray-600 font-semibold text-sm text-center p-4 select-none">
                Dont't have an account?{" "}
                <span
                  onClick={() => setAccessPage("SignIn")}
                  className="text-black font-semibold underline cursor-pointer"
                >
                  Sign Up
                </span>
              </article>
            </section>
            {/* Sign Up or Register */}
            <section
              className={`bg-white flex flex-col w-full px-3 h-full absolute inset-0 transition-all ${accessPage === "SignUp"
                ? "opacity-0 duration-500 translate-x-full"
                : "opacity-100 duration-600 z-10"
                }`}
            >
              <article className="w-full flex gap-2 justify-center items-center p-3">
                <img src={companyLogo} alt="" className="w-7" />
                <span className="font-semibold text-lg">Metron</span>
              </article>
              <article className="flex-1 flex flex-col justify-center items-center gap-2 px-1">
                <h2 className="text-2xl">
                  Create an account
                </h2>
                <p className="text-sm text-center font-medium text-gray-700">
                  Enter your email and password to access your account
                </p>
                <Register
                  changeRegisterPasswordView={changeRegisterPasswordView}
                  registerPasswordView={registerPasswordView}
                  accessPage={accessPage}
                  setAccessPage={setAccessPage}
                />
              </article>
              <article className="text-gray-600 text-sm text-center p-4">
                Back to{" "}
                <span
                  onClick={() => setAccessPage("SignUp")}
                  className="text-black font-semibold underline cursor-pointer"
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

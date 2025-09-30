import {useState} from "react";
import loginBackgruoundImage from "../assets/images/birds-eye.jpg";
import companyLogo from "../assets/svgs/logo.svg";
import Login from "../components/Login";
import Register from "../components/Register";

const Auth = () => {
  const [accessPage, setAccessPage] = useState("SignUp");
  const [loginPasswordView, setLoginPasswordView] = useState(false);
  const [registerPasswordView, setRegisterPasswordView] = useState(false);

  const changeLoginPasswordView = () =>
    setLoginPasswordView(!loginPasswordView);

  const changeRegisterPasswordView = () =>
    setRegisterPasswordView(!registerPasswordView);

  return (
    <div className="relative w-screen h-screen">
      <img
        src={loginBackgruoundImage}
        alt=""
        className="w-full h-full overflow-hidden"
      />
      <div className="absolute inset-0 bg-transparent grid md:grid-cols-2">
        <section className="hidden md:block"></section>
        <section className={`w-full overflow-auto bg-white `}>
          <div
            className={`w-full flex h-full duration-600 ease-in-out transition-transform ${
              accessPage === "SignIn" ? "-translate-x-full" : "translate-x-0"
            }`}
          >
            {/* Sign In or Login */}
            <section
              className={`bg-white flex flex-col min-w-full h-full transition-opacity ${
                accessPage === "SignIn"
                  ? "opacity-0 duration-300 "
                  : "opacity-100 duration-600"
              }`}
            >
              <article className="w-full flex gap-2 justify-center items-center p-3 select-none">
                <img src={companyLogo} alt="" className="w-7" />
                <span className="font-bold text-lg">Metron</span>
              </article>
              <article className="flex-1 flex flex-col justify-center items-center gap-2">
                <h2 className="capitalize font-serif font-bold text-2xl select-none">
                  Welcome Back
                </h2>
                <p className="text-sm text-center font-medium text-gray-700 mx-3 select-none">
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
                  className="text-black cursor-pointer"
                >
                  Sign Up
                </span>
              </article>
            </section>
            {/* Sign Up or Register */}
            <section
              className={`bg-white flex flex-col min-w-full px-3 h-full transition-opacity ${
                accessPage === "SignUp"
                  ? "opacity-0 duration-300"
                  : "opacity-100 duration-600"
              }`}
            >
              <article className="w-full flex gap-2 justify-center items-center p-3">
                <img src={companyLogo} alt="" className="w-7" />
                <span className="font-bold text-lg">Metron</span>
              </article>
              <article className="flex-1 flex flex-col justify-center items-center gap-2 px-1">
                <h2 className="capitalize font-serif font-bold text-2xl">
                  Welcome Back
                </h2>
                <p className="text-sm text-center font-medium text-gray-700">
                  Enter your email and password to access your account
                </p>
                <Register
                  changeRegisterPasswordView={changeRegisterPasswordView}
                  registerPasswordView={registerPasswordView}
                  accessPage={accessPage}
                />
              </article>
              <article className="text-gray-600 font-semibold text-sm text-center p-4">
                Back To{" "}
                <span
                  onClick={() => setAccessPage("SignUp")}
                  className="text-black  cursor-pointer"
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

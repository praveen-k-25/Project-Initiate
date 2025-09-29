import { Link } from "react-router-dom";
import errorImage from "../assets/svgs/404.svg";
const NotFound = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <img src={errorImage} alt="" className="w-[50%] h-[50%]" />
      <p className="">
        The page you are looking for might have been removed had its name
        changed or is temporarily unavailable.
      </p>
      <Link to={"/dashboard"} className=" bg-gray-500 font-semibold text-white px-3 py-1 mt-4 rounded-md hover:bg-gray-600">Go to Homepage</Link>
    </div>
  );
};

export default NotFound;

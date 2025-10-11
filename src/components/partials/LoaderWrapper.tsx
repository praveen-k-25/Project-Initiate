/* import { type ReactNode } from "react";
import { useNavigation } from "react-router-dom";
import loader from "../../assets/svgs/loader.svg";

interface loaderProps {
  children: ReactNode;
}

const LoaderWrapper = ({ children }: loaderProps) => {
  const navigation = useNavigation();
  if (navigation.state === "loading") {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <img src={loader} alt="" className="w-7" />
      </div>
    );
  }

  return children;
};

export default LoaderWrapper;
 */

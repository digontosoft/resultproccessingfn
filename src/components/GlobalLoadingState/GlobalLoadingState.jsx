import { GridLoader } from "react-spinners";

const GlobalLoadingState = () => {
  return (
    <div className="fixed top-[40%] left-[50%] h-40 w-40 rounded-md bg-gray-200 bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-sm">
      <GridLoader color="#3B82F6" />
    </div>
  );
};

export default GlobalLoadingState;

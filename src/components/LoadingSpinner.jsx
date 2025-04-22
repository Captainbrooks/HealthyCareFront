import { ClipLoader } from "react-spinners";

const LoadingSpinner = ({ size = 50, color = "#36d7b7", loading = true }) => {
  return (
    <div className="flex justify-center items-center">
      <ClipLoader color={color} loading={loading} size={size} />
    </div>
  );
};

export default LoadingSpinner;

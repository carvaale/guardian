import { useNavigate } from "react-router-dom";
import img from "../../assets/guardian-logo.webp";

export const GuardianLogo = () => {
  const navigate = useNavigate();

  return (
    <span
      className="flex flex-row items-center cursor-pointer"
      onClick={() => navigate("/chat")}
    >
      <img src={img} alt="Guardian Logo" className="h-10 w-10" />
      <span className="ml-3 text-sky-400 text-xl font-bold">
        Guard<span className="text-white text-xl font-bold">ian</span>
      </span>
    </span>
  );
};

export default GuardianLogo;

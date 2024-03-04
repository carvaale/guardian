import { useNavigate } from "react-router-dom";
import { GuardianLogo } from "./Logo";
import { useAuth } from "../../hooks/useAuth";

const Banner = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <div className="p-4 flex flex-row items-center gap-4 w-full border-neutral-700 bg-neutral-800 absolute">
      <GuardianLogo />
      <span
        className="ml-20 text-white cursor-pointer hover:text-sky-400"
        onClick={() => navigate("/chat")}
      >
        Chat
      </span>
      <span
        className="text-white cursor-pointer hover:text-sky-400"
        onClick={() => navigate("/pii_identifier")}
      >
        PII Identifier
      </span>
      <span
        className="text-white cursor-pointer hover:text-sky-400"
        onClick={() => navigate("/data_leak")}
      >
        Data Leak Analytics
      </span>
      <span
        className="text-white cursor-pointer hover:text-sky-400"
        onClick={() => navigate("/settings")}
      >
        Settings
      </span>
      <span
        className="text-white ml-auto cursor-pointer hover:text-sky-400"
        onClick={() => navigate("/admin_console")}
      >
        Admin Console
      </span>
      <input
        className="text-white mr-4 cursor-pointer hover:text-sky-400"
        onClick={() => logout()}
        type="submit"
        value="Logout"
      />
    </div>
  );
};
export default Banner;

import { useEffect, useState } from "react";
import User from "../types/User";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(
      localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user") as string)
        : null
    );
    setLoading(false);
  }, []);

  const logout = () => {
    console.log("logout");
  };

  return { user, loading, logout };
};

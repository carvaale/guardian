import { useEffect, useState } from "react";
import User from "../types/User";
import { UserLoginInfo } from "../types/UserLoginInfo";
import axios from "axios";
import { API_URL } from "../constants/constants";

export const useAuth = () => {
  const AUTH_URL = API_URL + "/api/auth";

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

  const login = (userInfo: UserLoginInfo) => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${AUTH_URL}/login`,
          {
            username: userInfo.username,
            password: userInfo.password,
          },
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((response) => {
          localStorage.setItem("user", JSON.stringify(response.data));
          setUser({
            username: response.data.user.username,
            role: response.data.user.role,
            authToken: response.data.access_token,
          });
          resolve(response.data.user);
        })
        .catch((error) => {
          if (error.response) {
            reject({
              status: error.response.status,
              message: error.response.data.detail,
            });
          } else {
            console.error(error);
            reject(error);
          }
        });
    });
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return { user, loading, login, logout };
};

import { useEffect, useState } from "react";
import User from "../types/User";
import { UserLoginInfo } from "../types/UserLoginInfo";
import axios from "axios";
import { API_URL } from "../constants/constants";
import { UserSignUpInfo } from "../types/UserSignUpInfo";

export const useAuth = () => {
  const AUTH_URL = API_URL + "/api/auth";

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const localToken = localStorage.getItem("user");
    setUser(localToken ? (JSON.parse(localToken).user as User) : null);
    setLoading(false);
  }, []);

  const login = (userInfo: UserLoginInfo) => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${AUTH_URL}/login`,
          {
            username: userInfo.email,
            password: userInfo.password,
          },
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
        .then((response) => {
          localStorage.setItem("user", JSON.stringify(response.data));
          setUser({
            email: response.data.user.email,
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

  const signup = (userInfo: UserSignUpInfo) => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          `${AUTH_URL}/signup`,
          {
            email: userInfo.email,
            password: userInfo.password,
            username: userInfo.username,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((response) => {
          console.log(response);
          resolve(response.data);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return { user, loading, login, logout, signup };
};

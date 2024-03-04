// import axios from "axios";
// import {
//   createContext,
//   useState,
//   useEffect,
//   useContext,
//   ReactNode,
// } from "react";
// import { useNavigate } from "react-router-dom";

// interface AuthContextType {
//   role: string | null;
//   user: string | null;
//   token: string | null;
//   loginUser: (userInfo: LoginInfo) => void;
//   logoutUser: () => void;
//   registerUser: (userInfo: RegisterInfo) => void;
//   checkUserStatus: () => Promise<void>;
// }

// interface LoginInfo {
//   email: string;
//   password: string;
// }
// interface RegisterInfo {
//   email: string;
//   password: string;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider = ({ children }: AuthProviderProps) => {
//   const [user, setUser] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [role, setRole] = useState<string>("");
//   const [token, setToken] = useState<string>("");
//   const navigate = useNavigate();
//   const api_url = "http://127.0.0.1:8000/api/auth";

//   useEffect(() => {
//     setLoading(false);
//     //checkUserStatus();
//   }, [user]);

//   const loginUser = async (userInfo: LoginInfo) => {
//     setLoading(true);
//     try {
//       const response = await axios.post(
//         `${api_url}/login`,
//         { username: userInfo.email, password: userInfo.password },
//         { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
//       );
//       const token = response.data.access_token;
//       if (token) {
//         const user = response.config.data;
//         setUser(user);
//         localStorage.setItem("userToken", token);
//         setToken(token);
//         await checkUserStatus();
//         navigate("/chat");
//       }
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logoutUser = async () => {
//     localStorage.removeItem("userToken");
//     setUser(null);
//     navigate("/login");
//   };

//   const registerUser = async (userInfo: RegisterInfo) => {
//     try {
//       const response = await axios.post(
//         `${api_url}/signup`,
//         { username: userInfo.email, password: userInfo.password },
//         { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
//       );
//       const response_code = response.status;
//       console.log(response);
//       if (response_code === 201) {
//         navigate("/login");
//       }
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const checkUserStatus = async () => {
//     const token = localStorage.getItem("userToken");
//     if (!token) {
//       logoutUser();
//       setLoading(false);
//     }

//     try {
//       const response = await axios.post(
//         `${api_url}/verify`,
//         {
//           access_token: token,
//           token_type: "Bearer",
//         },
//         {
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//       const user_data = response.data;
//       setUser(user_data);
//       setRole(user_data.role);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const contextData: AuthContextType = {
//     user,
//     role,
//     token,
//     loginUser,
//     logoutUser,
//     registerUser,
//     checkUserStatus,
//   };

//   return (
//     <AuthContext.Provider value={contextData}>
//       {loading ? <p>Loading...</p> : children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   return useContext(AuthContext)!;
// };

// export default AuthContext;

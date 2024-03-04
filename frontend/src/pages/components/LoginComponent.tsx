// import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../layouts/AuthContext";
// import { GuardianLogo } from "./Logo";

// export default function LoginComponent() {
//   type LoginFormElements = {
//     email: HTMLInputElement;
//     password: HTMLInputElement;
//   };

//   const [error, setError] = useState({ value: "" });
//   const { user, loginUser } = useAuth();
//   const navigate = useNavigate();
//   const loginForm = useRef<HTMLFormElement & LoginFormElements>(null);

//   useEffect(() => {
//     if (user) {
//       navigate("/");
//     }
//   }, [user, navigate]);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (loginForm.current) {
//       const email = loginForm.current.email.value;
//       const password = loginForm.current.password.value;
//       const userInfo = { email, password };

//       if (userInfo.email === "" || userInfo.password === "") {
//         setError({ value: "Please fill in all fields" });
//         return;
//       }
//       await loginUser(userInfo);
//     } else {
//       console.error("Form not found ");
//     }
//   };

//   return (
//     <>
//       <div
//         id="topo"
//         className="flex flex-row justify-evenly items-center w-full h-screen"
//       >
//         <form action="" onSubmit={handleSubmit} ref={loginForm}>
//           <div className="rounded-[calc(1.5rem-1px)] px-10 p-12 bg-neutral-800">
//             <div className="flex flex-col items-center">
//               <GuardianLogo />
//               <h1 className="text-xl text-center font-semibold text-gray-300 dark:text-white">
//                 Signin to your account
//               </h1>
//               <p className="text-sm text-center tracking-wide text-gray-400 dark:text-gray-300">
//                 Don't have an account?{" "}
//                 <a
//                   href=""
//                   onClick={() => navigate("/register")}
//                   className="text-blue-600 transition duration-200 hover:underline dark:text-blue-400"
//                 >
//                   Signup
//                 </a>
//               </p>
//             </div>

//             <div className="mt-8 space-y-8">
//               <div className="space-y-6">
//                 <input
//                   className="w-full bg-transparent text-gray-300 dark:text-white dark:border-gray-700 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-600 invalid:border-red-500 dark:placeholder-gray-300"
//                   required
//                   placeholder="email"
//                   type="email"
//                   name="email"
//                 />
//                 <input
//                   className="w-full bg-transparent text-gray-300 dark:text-white dark:border-gray-700 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-600 invalid:border-red-500 dark:placeholder-gray-300"
//                   required
//                   placeholder="Password"
//                   type="password"
//                   name="password"
//                 />
//               </div>

//               <button
//                 className="h-9 px-3 w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:bg-blue-700 transition duration-500 rounded-md text-white"
//                 type="submit"
//               >
//                 Login
//               </button>
//               {error && <p>{error.value}</p>}
//               <p className="text-sm tracking-wide text-gray-600 dark:text-gray-300">
//                 <a
//                   href=""
//                   onClick={() => navigate("/forgot-password")}
//                   className="flex items-center justify-center text-blue-600 transition duration-200 hover:underline dark:text-blue-400"
//                 >
//                   Forgot your password?
//                 </a>
//               </p>
//             </div>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// }

const LoginComponent = () => {
  return <div>LoginComponent</div>;
};

export default LoginComponent;
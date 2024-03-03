import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../layouts/AuthContext";
import { useNavigate } from "react-router-dom";
import { GuardianLogo } from "./Logo";

export default function RegisterComponent() {


  type RegisterFormElements = {
    email: HTMLInputElement;
    password: HTMLInputElement;

  }

  const[error, setError] = useState({value:""});
  const {user, registerUser} = useAuth()
  const registerForm = useRef<HTMLFormElement & RegisterFormElements>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if(user){
      navigate("/");
    }
  })


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(registerForm.current){
      const email = registerForm.current.email.value;
      const password = registerForm.current.password.value;
      const userInfo= {email,password};

      if(email === "" || password === ""){
        setError({value: "Please fill in all fields"});
        return;
      }
      await registerUser(userInfo);
    }
    else{
      console.error("Form not found ")
    }
  }

    return (
      <>
          <div id="topo" className="flex flex-row justify-evenly items-center w-full h-screen">
          <form action="" onSubmit={handleSubmit} ref={registerForm}>
            <div className="rounded-[calc(1.5rem-1px)] px-10 p-12 bg-neutral-800">
              <div className="flex flex-col items-center">
                <GuardianLogo />
                <h1 className="text-xl text-center font-semibold text-gray-300 dark:text-white">Register your account</h1>
                <p className="text-sm text-center tracking-wide text-gray-400 dark:text-gray-300">Already have an account? <a href="" onClick={()=> navigate("/login")} className="text-blue-600 transition duration-200 hover:underline dark:text-blue-400">Login</a></p>
              </div>

              <div className="mt-8 space-y-8">
                <div className="space-y-6">
                  <input className="w-full bg-transparent text-gray-300 dark:text-white dark:border-gray-700 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-600 invalid:border-red-500 dark:placeholder-gray-300" required placeholder="email" type="email" name="email"/>
                  <input className="w-full bg-transparent text-gray-300 dark:text-white dark:border-gray-700 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-600 invalid:border-red-500 dark:placeholder-gray-300" required placeholder="Password" type="password" name="password"/>
                </div>

                <button className="h-9 px-3 w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:bg-blue-700 transition duration-500 rounded-md text-white" type="submit">
                  Register
                </button>
                {error && <p>{error.value}</p>}
              </div>
            </div>
          </form>
        </div>
      </>
    );
  }

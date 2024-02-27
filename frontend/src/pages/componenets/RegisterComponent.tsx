
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../layouts/AuthContext";

export default function RegisterComponent() {


  type RegisterFormElements = {
    email: HTMLInputElement;
    password: HTMLInputElement;
    firstname: HTMLInputElement;
    lastname: HTMLInputElement;
  }

  const[error, setError] = useState({value:""});  
  const {registerUser} = useAuth()
  const registerForm = useRef<HTMLFormElement & RegisterFormElements>(null);



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(registerForm.current){
      const firstname = registerForm.current.firstname.value;
      const lastname = registerForm.current.lastname.value;
      const email = registerForm.current.email.value;
      const password = registerForm.current.password.value;
      const userInfo= {email,password,firstname,lastname};

      if(firstname === "" || lastname === "" || email === "" || password === ""){
        setError({value: "Please fill in all fields"});
        return;
      }
      await registerUser(userInfo);  
    }
    else{
      console.error("Form not found ")
    }
  }





    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate("/");
    }
  
    return (
      <>
  <div className="flex min-h-screen items-center justify-center p-12">
    <form action="" onSubmit={handleSubmit} ref={registerForm}>
      <div className="max-w-sm rounded-2xl bg-gradient-to-b from-sky-300 to-purple-500 p-px dark:from-gray-800 dark:to-transparent">
        <div className="rounded-[calc(1.5rem-1px)] bg-white px-10 p-12 dark:bg-gray-900">
            <div>
            <h1 className="text-xl flex items-center justify-center font-semibold text-gray-800 dark:text-white">Register your account</h1>
            </div>
            <div className="space-y-4 pt-5">
              <input className="w-full bg-transparent text-gray-600 dark:text-white dark:border-gray-700 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-600 invalid:border-red-500 dark:placeholder-gray-300" placeholder="First Name" type="text" name="firstname"   />
              <input className="w-full bg-transparent text-gray-600 dark:text-white dark:border-gray-700 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-600 invalid:border-red-500 dark:placeholder-gray-300" placeholder="Last Name" type="text" name="lastname"  />
            </div>
          <div className="mt-4 space-y-8">
            <div className="space-y-4">
              <input className="w-full bg-transparent text-gray-600 dark:text-white dark:border-gray-700 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-600 invalid:border-red-500 dark:placeholder-gray-300" placeholder="Email" type="email" name="email" id="email" />
  
              <input className="w-full bg-transparent text-gray-600 dark:text-white dark:border-gray-700 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-600 invalid:border-red-500 dark:placeholder-gray-300" placeholder="Password" type="password" name="password" id="password"/>
            </div>
  
            <button className="h-9 px-3 w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:bg-blue-700 transition duration-500 rounded-md text-white" type="submit"> 
              Register
            </button> 
            {error && <p>{error.value}</p>}
          </div>
        </div>
      </div>
    </form>
  </div>
      </>
    );
  }
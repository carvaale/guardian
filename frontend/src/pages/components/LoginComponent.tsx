import { z } from "zod";
import GuardianLogo from "./Logo";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../hooks/useAuth";

const LoginSchema = z.object({
  email: z.string().min(1, "Email is required").email(),
  password: z.string().min(1, "Password is required"),
});

type LoginSchemaType = z.infer<typeof LoginSchema>;

const LoginComponent = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({ resolver: zodResolver(LoginSchema) });

  const onSubmit: SubmitHandler<LoginSchemaType> = (data: LoginSchemaType) => {
    login(data)
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((err) => {
        if (err.status === 401) {
          console.log("Invalid username or password");
        } else {
          console.log("An error occurred. Please try again later");
        }
      });
  };

  return (
    <div
      id="topo"
      className="flex flex-row justify-evenly items-center w-full h-screen"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[60%] md:w-[45%] lg:w-[30%]"
      >
        <div className="rounded-xl px-10 p-12 bg-neutral-800">
          <div className="flex flex-col items-center">
            <GuardianLogo />
            <h1 className="text-xl text-center font-semibold text-gray-300 dark:text-white">
              Sign in to your account
            </h1>
            <p className="text-sm text-center tracking-wide text-gray-400">
              Don't have an account?{" "}
              <a
                href=""
                onClick={() => navigate("/register")}
                className="text-blue-600 transition duration-200 hover:underline dark:text-blue-400"
              >
                Sign up
              </a>
            </p>
          </div>
          <div className="flex flex-col justify-center items-center gap-6">
            <div className="flex flex-col justify-center gap-4 mt-8 w-full">
              <input
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                placeholder="Email"
                type="email"
                {...register("email")}
              />
              {errors.email && (
                <span className="text-red-600">{errors.email.message}</span>
              )}
              <input
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                placeholder="Password"
                type="password"
                {...register("password")}
              />
              {errors.password && (
                <span className="text-red-600">{errors.password.message}</span>
              )}
            </div>

            <button
              className="h-9 px-3 w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:bg-blue-700 transition ease-in-out duration-200 rounded-md text-white"
              type="submit"
            >
              Log in
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginComponent;

import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LoginFormValues } from "@/types/Types";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    console.log("Login Data:", data);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-slate-300">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 border rounded-lg shadow-md bg-slate-50"
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        <input
          {...register("email", { required: "Email is required" })}
          type="email"
          placeholder="Email"
          className="border p-2 w-full"
        />
        {errors.email && (
          <p className="text-red-500">{errors?.email.message}</p>
        )}

        <input
          {...register("password", { required: "Password is required" })}
          type="password"
          placeholder="Password"
          className="border p-2 w-full mt-2"
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 w-full mt-4"
        >
          Login
        </button>

        <p className="mt-2 text-sm">
          Don't have an account?
          <span
            onClick={() => navigate("/Register")}
            className="text-blue-500 text-base cursor-pointer ml-3"
          >
            Register
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;

import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "@/firebase/firebase-config";
import { LoginFormValues } from "@/types/Types";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();
  const [userDetail, setUserDetail] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (_user) => {
      if (_user) {
        setUserDetail(_user.email);
        setLoggedIn(true);
      } else {
        setUserDetail(null);
        setLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      setErrorMessage("");
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      if (userCredential.user) {
        setUserDetail(userCredential.user.email);
        setLoggedIn(true);
        navigate("/movies");
      }
    } catch (error: any) {
      console.error(error);
      setErrorMessage("Invalid email or password. Please try again.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setLoggedIn(false);
      console.log("User signed out successfully!");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="bg-slate-600 flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 border rounded-lg shadow-md bg-slate-50 w-10/12 md:w-5/12"
      >
        {loggedIn ? (
          <>
            <p>You are currently logged in as {userDetail}</p>
            <p onClick={handleLogout}>
              Do you want to logout?{" "}
              <span className="underline underline-offset-1 cursor-pointer">
                Click here
              </span>
            </p>
          </>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            {errorMessage && (
              <p className="text-red-500 mb-2">{errorMessage}</p>
            )}{" "}
            {/* ✅ Show errors */}
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="Email"
              className="border p-2 w-full"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
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
          </div>
        )}
      </form>
    </div>
  );
}

export default Login;

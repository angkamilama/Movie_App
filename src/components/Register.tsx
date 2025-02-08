import { SubmitHandler, useForm } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { RegisterFormValues } from "../types/Types";
import { auth } from "../firebase/firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

type UserInfo = {
  email: string;
  uid: string;
};

function Register() {
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [userCreated, setUserCreated] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormValues>();

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;
      console.log(user);
      const { uid, email } = user;
      setUserInfo({ uid, email: email! });
      setUserCreated(true);
      reset();
    } catch (error) {
      console.log(error);
    }

    console.log(data);
  };
  return (
    <div className=" bg-slate-300 md:bg-slate-600 w-screen h-screen flex justify-evenly items-center">
      <div className="flex flex-col justify-evenly items-center bg-slate-300 mt-12 w-full md:w-6/12 min-h-[550px] mx-auto p-6 rounded-xl">
        {userCreated ? (
          <div className="text-center p-1">
            <p>
              <span className="text-green-700 font-semibold">
                Congratulations!
              </span>{" "}
              You have been registered as {userInfo?.email}.
            </p>
          </div>
        ) : (
          <div>
            <div className="flex justify-evenly  w-full items-center ">
              <div className="flex-grow border border-t border-gray-500"></div>
              <span className="px-3 text-2xl text-gray-800">Register</span>
              <div className="flex-grow border border-t border-gray-500"></div>
            </div>
            <h4 className="my-6">
              Create your account. It's free and only takes a minute.
            </h4>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col justify-evenly items-center rounded-lg h-[500px] w-11/12  p-1"
            >
              <div className=" text-center flex flex-col justify-evenly items-center w-full">
                <input
                  {...register("firstName", {
                    required: "First Name is required",
                  })}
                  placeholder="First Name"
                  className="border border-slate-700 p-1 w-9/12 md:w-[300px]"
                />
                {errors.firstName && (
                  <p className="text-red-500 ">{errors.firstName.message}</p>
                )}
              </div>
              <div className="text-center flex flex-col justify-evenly items-center w-full">
                <input
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                  placeholder="last Name"
                  className="border border-slate-700 p-1 w-9/12 md:w-[300px]"
                />

                {errors.lastName && (
                  <p className="text-red-500">{errors.lastName.message}</p>
                )}
              </div>

              <div className="text-center flex flex-col justify-evenly items-center w-full">
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email format",
                    },
                  })}
                  placeholder="Email"
                  className="border border-slate-700 p-1 w-9/12 md:w-[300px]"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="text-center flex flex-col justify-evenly items-center w-full">
                <input
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                      message:
                        "Password must be at least 6 characters long and contain letters and numbers",
                    },
                  })}
                  type="password"
                  placeholder="Password"
                  className="border border-slate-700 p-1  w-9/12 md:w-[300px]"
                />

                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
              <div className="text-center flex flex-col justify-evenly items-center w-full">
                <input
                  {...register("confirmPassword", {
                    required: "password and confirm Password are not same",
                    validate: (value, { password }) =>
                      value === password || "Passwords do not match",
                  })}
                  type="password"
                  placeholder="Confirm Password"
                  className="border border-slate-700 p-1 w-9/12 md:w-[300px]"
                />

                {errors.confirmPassword && (
                  <p className="text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              <div className="flex  justify-evenly items-center w-10/12 ">
                <Checkbox />
                <h4 className="text-xs md:text-sm flex-wrap ">
                  I accept the Terms of Use & Privacy Policy
                </h4>
              </div>
              <button
                type="submit"
                className="bg-green-700/75 text-white p-2 hover:bg-green-900 mx-auto text-center rounded w-8/12"
              >
                Register Now
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Register;

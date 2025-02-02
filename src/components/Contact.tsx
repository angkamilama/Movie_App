import { useForm, SubmitHandler } from "react-hook-form";
import { ContactFormValues } from "@/types/Types";

function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>();

  const onSubmit: SubmitHandler<ContactFormValues> = (data) => {
    console.log(data);
  };

  return (
    <div className="bg-slate-300 md:bg-slate-600 min-h-screen w-screen md:pt-[40px] flex justify-center items-center">
      <div className="flex flex-col justify-center items-center bg-slate-300 w-full md:w-6/12 rounded-xl p-6">
        <h3 className="text-2xl mb-8 ">Contact Details</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-evenly items-start rounded-lg h-[550px] w-11/12  p-2"
        >
          <div className="text-center flex flex-col justify-evenly items-center w-full">
            <label className="flex  justify-evenly items-center w-full ">
              <span className="w-32 text-right mr-3 ">First Name:</span>
              <input
                {...register("firstName", {
                  required: "First Name is required",
                })}
                className="border border-slate-700 p-1  md:w-[300px]"
              />
            </label>
            {errors.firstName && (
              <p className="text-red-500 ">{errors.firstName.message}</p>
            )}
          </div>
          <div className="text-center flex flex-col justify-evenly items-center w-full">
            <label className="flex  justify-evenly items-center w-full ">
              <span className="w-32 text-right mr-3">Last Name:</span>
              <input
                {...register("lastName", { required: "Last name is required" })}
                className="border border-slate-700 p-1 md:w-[300px]"
              />
            </label>
            {errors.lastName && (
              <p className="text-red-500">{errors.lastName.message}</p>
            )}
          </div>
          <div className="text-center flex flex-col justify-evenly items-center w-full">
            <label className="flex  justify-evenly items-center w-full ">
              <span className="w-32 text-right mr-3">Phone Number:</span>
              <input
                {...register("phoneNumber", {
                  required: "please enter your number",
                })}
                className="border border-slate-700 p-1 md:w-[300px] "
              />
            </label>
            {errors.phoneNumber && (
              <p className="text-red-500">{errors.phoneNumber.message}</p>
            )}
          </div>
          <div className="text-center flex flex-col justify-evenly items-center w-full">
            <label className="flex  justify-evenly items-center w-full ">
              <span className="w-32  text-right mr-3">Email:</span>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                })}
                className="border border-slate-700 p-1  md:w-[300px]"
              />
            </label>
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className=" flex flex-col justify-evenly items-center w-full">
            <label className="flex flex-col justify-evenly items-start mx-auto h-[150px] w-10/12 ">
              <span className=" w-32  text-right">Enquiry:</span>
              <textarea
                {...register("textArea", {
                  required: "please provide your detail",
                })}
                rows={4}
                cols={30}
                className="border border-slate-700 p-1 ml-6 w-full "
              />
            </label>
            {errors.textArea && (
              <p className="text-red-500  ">{errors.textArea.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-green-700/75 text-white p-2 hover:bg-green-900 mx-auto text-center rounded w-8/12"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;

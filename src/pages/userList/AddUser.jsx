import React from "react";
import { useForm } from "react-hook-form";
import { gurdedApi } from "../../api";
import { toast } from "react-toastify";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
const AddUser = () => {
  const { auth } = useAuth();
  const authToken = auth.token;
  const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${baseUrl}/teacher-reg`,
        { ...data },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("User Added successfully");
      }
    } catch (error) {
      console.log(error, "data post failed");
    }
    console.log("Form Data: ", data);
  };
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 mb-10">
      <div className="max-w-full overflow-x-auto">
        <h1 className="text-2xl font-semibold py-4">Add User</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Designation and Position Fields */}
            <div className="w-full">
              <label className="block text-sm font-medium mb-2 text-gray-700">
                First Name
              </label>
              <input
                type="text"
                {...register("firstName", {
                  required: "First name is required",
                })}
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholder="Enter First Name"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.firstName.message}
                </p>
              )}

              <label className="block text-sm font-medium mb-2 mt-4 text-gray-700">
                Position
              </label>
              <input
                type="text"
                {...register("position", { required: "Position is required" })}
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholder="Enter Position"
              />
              {errors.position && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.position.message}
                </p>
              )}
            </div>

            {/* First Name and Last Name Fields */}
            <div className="w-full">
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                {...register("lastName", { required: "Last name is required" })}
                className="w-full border border-gray-300 p-2 mb-2 rounded-md"
                placeholder="Enter Last Name"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.lastName.message}
                </p>
              )}
              <label className="block text-sm font-medium mb-2 mt-2 text-gray-700">
                Subject
              </label>
              <input
                type="text"
                {...register("subject", { required: "Subject is required" })}
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholder="Enter Subject"
              />
              {errors.subject && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.subject.message}
                </p>
              )}
            </div>

            {/* Subject and Mobile Fields */}
            <div className="w-full">
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Designation
              </label>
              <input
                type="text"
                {...register("designation", {
                  required: "Designation is required",
                })}
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholder="Enter Designation"
              />
              {errors.designation && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.designation.message}
                </p>
              )}

              <label className="block text-sm font-medium mb-2 mt-4 text-gray-700">
                Mobile
              </label>
              <input
                type="text"
                {...register("phoneNumber", {
                  required: "Mobile number is required",
                  pattern: {
                    value: /^[0-9]{10,15}$/,
                    message: "Enter a valid mobile number",
                  },
                })}
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholder="Enter Mobile Number"
              />
              {errors.mobile && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.mobile.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-6 justify-center items-center mt-10">
            <div className="w-full">
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Email
              </label>
              <input
                type="email"
                {...register("email", { required: "email is required" })}
                className="w-full border border-gray-300 p-2 rounded-md"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Image
              </label>
              <input
                type="file"
                {...register("image", { required: "Image is required" })}
                className="w-full border border-gray-300 p-2 rounded-md"
              />
              {errors.image && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.image.message}
                </p>
              )}
            </div>
          </div>

          <div className="w-full flex justify-center items-center bg-gray-100 p-2 py-4 rounded-lg mt-10">
            <button
              type="submit"
              className="flex justify-center items-center w-34 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;

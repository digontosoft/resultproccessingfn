import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
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
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                {...register("Name", { required: "User Name is required" })}
                className={`w-full px-3 py-2 border ${
                  errors.Name ? "border-red-500" : "border-gray-300"
                } rounded-md  focus:outline-none focus:ring-1 focus:ring-blue-500`}
                placeholder="Enter Name"
              />
              {errors.Name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.Name.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                User Name
              </label>
              <input
                type="text"
                {...register("userName", { required: "User Name is required" })}
                className={`w-full px-3 py-2 border ${
                  errors.userName ? "border-red-500" : "border-gray-300"
                } rounded-md  focus:outline-none focus:ring-1 focus:ring-blue-500`}
                placeholder="Enter username"
              />
              {errors.userName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.userName.message}
                </p>
              )}
            </div>

            {/* User Type Select */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                User Type
              </label>
              <select
                {...register("userType", { required: "User Type is required" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md  focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select User Type</option>
                <option value="admin">Admin</option>
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
              </select>
              {errors.userType && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.userType.message}
                </p>
              )}
            </div>

            {/* Shift Select */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Shift
              </label>
              <select
                {...register("shift", { required: "Shift is required" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md  focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select Shift</option>
                <option value="morning">Morning</option>
                <option value="evening">Evening</option>
              </select>
              {errors.shift && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.shift.message}
                </p>
              )}
            </div>

            {/* Group Select */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Group
              </label>
              <select
                {...register("group", { required: "Group is required" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md  focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select Group</option>
                <option value="science">Science</option>
                <option value="commerce">Commerce</option>
                <option value="arts">Arts</option>
              </select>
              {errors.group && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.group.message}
                </p>
              )}
            </div>

            {/* Class Select */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Class
              </label>
              <select
                {...register("class", { required: "Class is required" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md  focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select Class</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </select>
              {errors.class && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.class.message}
                </p>
              )}
            </div>

            {/* Section Select */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Section
              </label>
              <select
                {...register("section", { required: "Section is required" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md  focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select Section</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
              {errors.section && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.section.message}
                </p>
              )}
            </div>
            {/* Password Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className={`w-full px-3 py-2 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-md  focus:outline-none focus:ring-1 focus:ring-blue-500`}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
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

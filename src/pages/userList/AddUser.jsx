import React from "react";
import { useForm } from "react-hook-form";
const AddUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log("Form Data: ", data);
    alert("User added successfully!");
  };
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 mb-10">
      <div className="max-w-full overflow-x-auto">
        <h1 className="text-2xl font-semibold py-4">Add User</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
                Position
              </label>
              <input
                type="text"
                {...register("position", {
                  required: "Position is required",
                })}
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholder="Enter Position"
              />
              {errors.position && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.position.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Name
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="w-full border border-gray-300 p-2 rounded-md"
                placeholder="Enter Full Name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}

              <label className="block text-sm font-medium mb-2 mt-4 text-gray-700">
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
            <div className="w-full">
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Mobile
              </label>
              <input
                type="text"
                {...register("mobile", {
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

              <label className="block text-sm font-medium mb-2 mt-4 text-gray-700">
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

          <div className="w-full flex justify-center items-center bg-gray-100 p-2 rounded-lg mt-10">
            <button
              type="submit"
              className=" flex justify-center items-center mt-6 w-34 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
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

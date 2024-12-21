import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect, useState } from "react";
import { gurdedApi } from "../api";
import useUserProtectFilter from "../hooks/useUserProtectFilter";

const Profile = () => {
  const { auth } = useAuth();
  const [profile, setProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;
  const { isSuperAdmin } = useUserProtectFilter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const {
    register: resetRegister,
    handleSubmit: handleResetSubmit,
    reset: resetResetForm,
    formState: { errors: resetErrors },
  } = useForm();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${baseUrl}/user/${auth._id}`);
        setProfile(response.data);
        reset(response.data); // Populate form with fetched data
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [baseUrl, auth._id, reset]);
  const onSubmit = async (data) => {
    try {
      //console.log(`${baseUrl}/teacher/${auth._id}`);
      const response = await gurdedApi.put(
        `${baseUrl}/teacher/${auth._id}`,
        data
      );
      if (response.status === 200) {
        toast.success("Profile updated successfully");
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // const onSubmit = async (data) => {
  //   console.log(baseUrl);

  //   try {
  //     const response = await axios.post(
  //       `${baseUrl}/teacher/${auth._id}`,
  //       data ,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${auth.authToken}`,
  //         },
  //       }
  //     );
  //     console.log(response);

  //     if (response.status === 200) {
  //       toast.success("Profile updated successfully");
  //       setIsEditing(false);
  //     }
  //   } catch (error) {
  //     console.error("Error updating profile:", error);
  //   }
  // };

  const handleCancel = () => {
    reset(profile); // Reset form to original values
    setIsEditing(false);
  };

  const handleResetPassword = async (data) => {
    try {
      const response = await axios.put(
        `${baseUrl}/change-password/${auth._id}`,
        data
      );
      if (response.status === 200) {
        toast.success("Password reset successfully");
        setShowResetPassword(false);
        resetResetForm(); // Clear reset password form
      }
    } catch (error) {
      if (error.status === 400) {
        toast.error("Current password is incorrect");
      }
      console.error("Error resetting password:", error);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 mb-10">
      <div className="max-w-full overflow-x-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold py-4">Profile</h1>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 text-red-500 hover:text-red-600 bg-red-100 hover:red-100 m font-semibold py-2 px-4 border border-red-400 rounded-md"
            >
              Edit
            </button>
          )}
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* First Name and Position */}
            <div className="w-full">
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Name
              </label>
              <input
                type="text"
                {...register("firstName", {
                  required: "First name is required",
                })}
                disabled={!isEditing}
                className={`w-full border p-2 rounded-md ${
                  isEditing ? "bg-white" : "bg-gray-3"
                }`}
                placeholder="Enter Name"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.firstName.message}
                </p>
              )}
              <label className="block text-sm font-medium mb-2 mt-4 text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                {...register("phoneNumber", {
                  required: "Position is required",
                })}
                disabled={!isEditing}
                className={`w-full border p-2 rounded-md ${
                  isEditing ? "bg-white" : "bg-gray-3"
                }`}
                placeholder="Enter phone number"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            {/* Last Name and Subject */}
            <div className="w-full">
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Shift
              </label>
              <input
                type="text"
                {...register("shift", { required: "shift is required" })}
                disabled={true}
                className={`w-full border p-2 rounded-md ${
                  isEditing ? "bg-white" : "bg-gray-3"
                }`}
                placeholder="Enter shift"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.shift.message}
                </p>
              )}
              <label className="block text-sm font-medium mb-2 mt-4 text-gray-700">
                Group
              </label>
              <input
                type="text"
                {...register("group", { required: "Group is required" })}
                disabled={true}
                className={`w-full border p-2 rounded-md ${
                  isEditing ? "bg-white" : "bg-gray-3"
                }`}
                placeholder="Enter Group"
              />
              {errors.subject && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.group.message}
                </p>
              )}
            </div>

            {/* Designation and Mobile */}
            <div className="w-full">
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Class
              </label>
              <input
                type="text"
                {...register("class_id.name", {
                  required: "class is required",
                })}
                disabled={true}
                className={`w-full border p-2 rounded-md ${
                  isEditing ? "bg-white" : "bg-gray-3"
                }`}
                placeholder="Enter class"
              />
              {errors.designation && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.class.message}
                </p>
              )}
              <label className="block text-sm font-medium mb-2 mt-4 text-gray-700">
                Section
              </label>
              <input
                type="text"
                {...register("section", {
                  required: "section is required",
                })}
                disabled={true}
                className={`w-full border p-2 rounded-md ${
                  isEditing ? "bg-white" : "bg-gray-3"
                }`}
                placeholder="section Number"
              />
              {errors.section && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.section.message}
                </p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            {isEditing && (
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
              >
                Cancel
              </button>
            )}
            {isEditing && (
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Save
              </button>
            )}
          </div>
        </form>

        {/* Reset Password Section */}
        <div className="my-5">
          {!showResetPassword && (
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowResetPassword(true);
              }}
              className="px-4 py-2 text-white font-medium bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all duration-300"
            >
              Reset Password
            </button>
          )}
          {showResetPassword && (
            <form onSubmit={handleResetSubmit(handleResetPassword)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Current Password
                  </label>
                  <input
                    type="password"
                    {...resetRegister("currentPassword", {
                      required: "Current Password is required",
                    })}
                    className="w-full border p-2 rounded-md"
                    placeholder="Enter current Password Password"
                  />
                  {resetErrors.currentPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {resetErrors.currentPassword.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    New Password
                  </label>
                  <input
                    type="password"
                    {...resetRegister("newPassword", {
                      required: "New password is required",
                    })}
                    className="w-full border p-2 rounded-md"
                    placeholder="Enter New Password"
                  />
                  {resetErrors.newPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {resetErrors.newPassword.message}
                    </p>
                  )}
                </div>
                {/* <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    {...resetRegister("confirmPassword", {
                      required: "Confirm password is required",
                      validate: (value) =>
                        value === resetRegister("newPassword").value ||
                        "Passwords do not match",
                    })}
                    className="w-full border p-2 rounded-md"
                    placeholder="Confirm New Password"
                  />
                  {resetErrors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {resetErrors.confirmPassword.message}
                    </p>
                  )}
                </div>  */}
              </div>
              <div className="flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => setShowResetPassword(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Save
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

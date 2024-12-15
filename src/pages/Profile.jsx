import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect, useState } from "react";

const Profile = () => {
  const { auth } = useAuth();
  const [profile, setProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

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
      const response = await axios.post(
        `${baseUrl}/teacher-reg`,
        { ...data },
        {
          headers: {
            Authorization: `Bearer ${auth.authToken}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Profile updated successfully");
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleCancel = () => {
    reset(profile); // Reset form to original values
    setIsEditing(false);
  };

  const handleResetPassword = async (data) => {
    try {
      const response = await axios.post(`${baseUrl}/reset-password`, data, {
        headers: {
          Authorization: `Bearer ${auth.authToken}`,
        },
      });
      if (response.status === 200) {
        toast.success("Password reset successfully");
        setShowResetPassword(false);
        resetResetForm(); // Clear reset password form
      }
    } catch (error) {
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
                First Name
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
                disabled={!isEditing}
                className={`w-full border p-2 rounded-md ${
                  isEditing ? "bg-white" : "bg-gray-3"
                }`}
                placeholder="Enter Position"
              />
              {errors.position && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.position.message}
                </p>
              )}
            </div>

            {/* Last Name and Subject */}
            <div className="w-full">
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                {...register("lastName", { required: "Last name is required" })}
                disabled={!isEditing}
                className={`w-full border p-2 rounded-md ${
                  isEditing ? "bg-white" : "bg-gray-3"
                }`}
                placeholder="Enter Last Name"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.lastName.message}
                </p>
              )}
              <label className="block text-sm font-medium mb-2 mt-4 text-gray-700">
                Subject
              </label>
              <input
                type="text"
                {...register("subject", { required: "Subject is required" })}
                disabled={!isEditing}
                className={`w-full border p-2 rounded-md ${
                  isEditing ? "bg-white" : "bg-gray-3"
                }`}
                placeholder="Enter Subject"
              />
              {errors.subject && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.subject.message}
                </p>
              )}
            </div>

            {/* Designation and Mobile */}
            <div className="w-full">
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Designation
              </label>
              <input
                type="text"
                {...register("designation", {
                  required: "Designation is required",
                })}
                disabled={!isEditing}
                className={`w-full border p-2 rounded-md ${
                  isEditing ? "bg-white" : "bg-gray-3"
                }`}
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
                disabled={!isEditing}
                className={`w-full border p-2 rounded-md ${
                  isEditing ? "bg-white" : "bg-gray-3"
                }`}
                placeholder="Enter Mobile Number"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phoneNumber.message}
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
                <div>
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
                </div>
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

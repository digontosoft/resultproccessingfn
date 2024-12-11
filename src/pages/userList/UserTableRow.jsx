import React from "react";

const ProfileTableRow = ({ profile, index, onView, onEdit, onDelete }) => {
  return (
    <tr>
      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
        <p className="text-black dark:text-white">{index + 1}</p>
      </td>
      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
        <p className="text-black dark:text-white">
          {profile.firstName} {profile.lastName}
        </p>
      </td>
      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
        <p className="text-black dark:text-white">{profile.designation}</p>
      </td>
      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
        <img
          src={profile.image || "/user.svg"}
          alt="profile image"
          className="w-10 h-10 rounded-full object-cover"
        />
      </td>
      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
        <p className="text-black dark:text-white">{profile.phoneNumber}</p>
      </td>
      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
        <p className="text-black dark:text-white">{profile.subject}</p>
      </td>
      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
        <div className="flex items-center space-x-3.5">
          <button
            className="hover:text-primary"
            onClick={() => onView(profile)}
          >
            <img src="/view.svg" alt="view icon" width={18} height={18} />
          </button>
          <button
            className="hover:text-primary"
            onClick={() => onEdit(profile)}
          >
            <img src="/edit.svg" alt="edit icon" width={18} height={18} />
          </button>
          <button
            className="hover:text-primary"
            onClick={() => onDelete(profile)}
          >
            <img src="/delete.svg" alt="delete icon" width={18} height={18} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ProfileTableRow;

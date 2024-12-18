import React from "react";

const ProfileTableRow = ({ profile, index, onView, onEdit, onDelete }) => {
  return (
    <tr>
      <td className="border-b border-[#eee] py-5 px-5 dark:border-strokedark">
        <p className="text-black dark:text-white">{index + 1}</p>
      </td>
      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
        <p className="text-black dark:text-white capitalize">
          {profile?.userType}
        </p>
      </td>
      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
        <p className="text-black dark:text-white">{profile?.firstName}</p>
      </td>
      <td className="border-b border-[#eee] py-6 px-4 dark:border-strokedark">
        <p className="text-black dark:text-white flex gap-2 capitalize">
          Class-{profile?.class_id?.name}-Group-{profile?.group}-Section-
          {profile?.section}-Shift-
          {profile?.shift}
        </p>
        {/* <p className="text-black dark:text-white">Group: {profile?.group}</p>
        <p className="text-black dark:text-white">
          Section: {profile?.section}
        </p>
        <p className="text-black dark:text-white">Shift: {profile?.shift}</p> */}
      </td>
      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
        <p className="text-black dark:text-white">{profile?.phoneNumber}</p>
      </td>
      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
        <p
          className={
            profile?.userStatus === "Active"
              ? "text-green-500 border border-green-400 rounded-md px-2 py-1 h-full w-20 text-center"
              : "text-red"
          }
        >
          {profile?.userStatus}
        </p>
      </td>
      <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
        <div className="flex items-center space-x-3.5">
          {/* <button
            className="hover:text-primary"
            onClick={() => onView(profile)}
          >
            <img src="/view.svg" alt="view icon" width={18} height={18} />
          </button> */}
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

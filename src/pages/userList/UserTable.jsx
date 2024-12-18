import { useEffect, useState } from "react";
import ProfileTableRow from "./UserTableRow";

const ProfileTable = ({ profile, onView, onEdit, onDelete }) => {
  const [loading, setIsLoading] = useState(true);
  useEffect(() => {
    if (profile?.length > 0) {
      setIsLoading(false);
    }
  }, [profile]);
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="py-4 px-4 font-medium text-black dark:text-white ">
                SI No
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white ">
                Role
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Name
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Permission
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Phone Number
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Status
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                action
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  Loading profiles...
                </td>
              </tr>
            ) : profile?.length > 0 ? (
              profile.map((profile, index) => (
                <ProfileTableRow
                  key={index}
                  profile={profile}
                  index={index}
                  onView={onView}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No profiles available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfileTable;

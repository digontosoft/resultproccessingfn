import Modal from "../../components/Modal/Modal";
import { groupData } from "../../data/data";
import useUserProtectFilter from "../../hooks/useUserProtectFilter";

const UserEditModal = ({ profile, onClose, onSubmit, onChange }) => {
  const { filterClass, filterSection, filterShift, sessions } =
    useUserProtectFilter();
  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     onSubmit(e);
  //   };
  return (
    <Modal open={true} onClose={onClose}>
      <form
        onSubmit={onSubmit}
        className="text-black max-h-150 overflow-y-auto p-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium">Name</label>
            <input
              type="text"
              value={profile?.firstName}
              onChange={(e) =>
                onChange({ ...profile, firstName: e.target.value })
              }
              className="border rounded p-2 w-full mb-4"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">
              Phone Number
            </label>
            <input
              type="text"
              value={profile?.phoneNumber}
              onChange={(e) =>
                onChange({ ...profile, phoneNumber: e.target.value })
              }
              className="border rounded p-2 w-full mb-4"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Permission</label>
            <select
              value={profile?.class?.name}
              onChange={(e) =>
                onChange({
                  ...profile,
                  class_id: e.target.value,
                })
              }
              className="border rounded p-2 w-full mb-4"
            >
              <option value="">Select Class</option>
              {filterClass.map((option) => (
                <option key={option._id} value={option._id}>
                  {option.name}
                </option>
              ))}

              {/* <option value="V">V</option>
              <option value="VI">VI</option>
              <option value="VII">VII</option>
              <option value="VIII">VIII</option>
              <option value="IX">IX</option>
              <option value="X">X</option> */}
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Role</label>
            <select
              value={profile?.userType}
              onChange={(e) =>
                onChange({ ...profile, userType: e.target.value })
              }
              className="border rounded p-2 w-full mb-4 capitalize"
            >
              <option value="superadmin">Superadmin</option>
              <option value="teacher">Teacher</option>
              <option value="operator">Student</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Shift</label>
            <select
              value={profile?.shift}
              onChange={(e) => onChange({ ...profile, shift: e.target.value })}
              className="border rounded p-2 w-full mb-4 capitalize"
            >
              {filterShift.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Group</label>
            <select
              value={profile?.group}
              onChange={(e) => onChange({ ...profile, group: e.target.value })}
              className="border rounded p-2 w-full mb-4 capitalize"
            >
              {groupData.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Section</label>
            <select
              value={profile?.section}
              onChange={(e) =>
                onChange({ ...profile, section: e.target.value })
              }
              className="border rounded p-2 w-full mb-4 capitalize"
            >
              {filterSection.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UserEditModal;

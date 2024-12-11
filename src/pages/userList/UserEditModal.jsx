import Modal from "../../components/Modal/Modal";

const UserEditModal = ({ profile, onClose, onSubmit, onChange }) => {
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
          {/* Personal Information */}
          <div>
            <label className="block mb-2 text-sm font-medium">First Name</label>
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
            <label className="block mb-2 text-sm font-medium">Last Name</label>
            <input
              type="text"
              value={profile?.lastName}
              onChange={(e) =>
                onChange({ ...profile, lastName: e.target.value })
              }
              className="border rounded p-2 w-full mb-4"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Designation
            </label>
            <input
              type="text"
              value={profile?.designation}
              onChange={(e) =>
                onChange({ ...profile, designation: e.target.value })
              }
              className="border rounded p-2 w-full mb-4"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Mobile</label>
            <input
              type="tel"
              value={profile?.phoneNumber}
              onChange={(e) =>
                onChange({ ...profile, phoneNumber: e.target.value })
              }
              className="border rounded p-2 w-full mb-4"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Subject</label>
            <input
              type="text"
              value={profile?.subject}
              onChange={(e) =>
                onChange({ ...profile, subject: e.target.value })
              }
              className="border rounded p-2 w-full mb-4"
            />
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

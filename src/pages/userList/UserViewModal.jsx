import React from "react";
import Modal from "../../components/Modal/Modal";

const UserViewModal = ({ profile, onClose }) => {
  return (
    <Modal open={true} onClose={onClose}>
      <div className="max-w-125 p-6 max-h-150 overflow-y-auto">
        <div className="border-b pb-4 mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            {profile?.firstName} {profile?.lastName}
          </h1>
        </div>

        <div className="space-y-4">
          <div className="flex items-center">
            <span className="font-medium text-gray-800 w-1/4">
              Designation:
            </span>
            <span className="text-gray-600">{profile?.designation}</span>
          </div>
          <div className="flex items-center">
            <span className="font-medium text-gray-800 w-1/4">Mobile:</span>
            <span className="text-gray-600">{profile?.phoneNumber}</span>
          </div>

          <div className="flex items-center">
            <span className="font-medium text-gray-800 w-1/4">Subject:</span>
            <span className="text-gray-600">{profile?.subject}</span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UserViewModal;

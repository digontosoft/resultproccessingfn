const AssignModal = ({ teacher, selectedClass, selectedSubject, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">
          Assign Class and Subject to {teacher.name}
        </h2>
        <p className="mb-4">
          <strong>Class:</strong> {selectedClass}
        </p>
        <p className="mb-4">
          <strong>Subject:</strong> {selectedSubject?.name}
        </p>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignModal;

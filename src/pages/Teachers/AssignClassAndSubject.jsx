import { useState } from "react";
import { toast } from "react-toastify";

const AssignClassAndSubject = ({ teacher, onAssign }) => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const classes = [
    {
      id: 1,
      class: "Class1",
      subjects: ["Math", "Science", "English", "History", "ICT"],
    },
    {
      id: 2,
      class: "Class2",
      subjects: ["Math", "Science", "English", "History"],
    },
    { id: 3, class: "Class3", subjects: ["Math", "Science", "English", "ICT"] },
    {
      id: 4,
      class: "Class4",
      subjects: ["Math", "Science", "English", "History", "ICT"],
    },
  ];

  const subjects =
    classes.find((cls) => cls.class === selectedClass)?.subjects || [];

  const handleSubjectToggle = (subject) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((subj) => subj !== subject)
        : [...prev, subject]
    );
    setSelectAll(false); // Uncheck "Select All" when toggling manually
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedSubjects([]); // Clear all selections
    } else {
      setSelectedSubjects(subjects); // Select all subjects
    }
    setSelectAll(!selectAll);
  };

  const handleAssign = () => {
    if (selectedClass && selectedSubjects.length > 0) {
      onAssign(teacher, selectedClass, selectedSubjects);
      toast.success(
        `Assigned ${selectedSubjects.join(", ")} to ${selectedClass}`
      );
      setSelectedClass("");
      setSelectedSubjects([]);
      setSelectAll(false);
    } else {
      toast.error("Please select both class and at least one subject!");
    }
  };

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-lg font-bold mb-4">
        Assign Class and Subject to {teacher.name}
      </h2>

      {/* Class Dropdown */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Class
        </label>
        <select
          value={selectedClass}
          onChange={(e) => {
            setSelectedClass(e.target.value);
            setSelectedSubjects([]); // Reset subjects when class changes
            setSelectAll(false); // Reset "Select All" state
          }}
          className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="" disabled>
            Choose a class
          </option>
          {classes.map((cls) => (
            <option key={cls.id} value={cls.class}>
              {cls.class}
            </option>
          ))}
        </select>
      </div>

      {/* Subject Selection */}
      {selectedClass && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Subjects
          </label>
          {/* Select All Checkbox */}
          <div className="flex items-center space-x-2 mb-4">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
              disabled={subjects.length === 0}
              className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-gray-700">Select All</span>
          </div>

          {/* Subjects List */}
          <div className="grid grid-cols-2 gap-2">
            {subjects.length > 0 ? (
              subjects.map((subject, index) => (
                <label
                  key={index}
                  className="inline-flex items-center space-x-2"
                >
                  <input
                    type="checkbox"
                    value={subject}
                    checked={selectedSubjects.includes(subject)}
                    onChange={() => handleSubjectToggle(subject)}
                    className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{subject}</span>
                </label>
              ))
            ) : (
              <p className="text-gray-500">No subjects available</p>
            )}
          </div>
        </div>
      )}

      {/* Selected Subjects */}
      {selectedSubjects.length > 0 && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Selected Subjects
          </label>
          <div className="grid grid-cols-2 gap-4">
            {selectedSubjects.map((subject, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm"
              >
                {subject}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Assign Button */}
      <div className="flex justify-end">
        <button
          onClick={handleAssign}
          className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${
            selectedSubjects.length === 0 && "opacity-50 cursor-not-allowed"
          }`}
          disabled={selectedSubjects.length === 0}
        >
          Assign
        </button>
      </div>
    </div>
  );
};

export default AssignClassAndSubject;

import { useState } from "react";
import Modal from "../../components/Modal/Modal";
import useUserProtectFilter from "../../hooks/useUserProtectFilter";
import { groupData } from "../../data/data";

const StudentEditModal = ({ student, onSubmit, onChange, onClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };
  console.log("student:", student);
  const { filterClass, filterSection, filterShift, sessions } =
    useUserProtectFilter();
  const [filterGroup, setFilterGroup] = useState([]);

  const handelClass = (value) => {
    console.log("value:", value);

    if (value == 9 || value == 10) {
      setFilterGroup(groupData.slice(1, 4));
    } else {
      setFilterGroup(groupData.slice(0, 1));
    }
  };

  return (
    <Modal open={true} onClose={onClose}>
      <form
        onSubmit={handleSubmit}
        className="text-black max-h-150 overflow-y-auto p-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Personal Information */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Student Name
            </label>
            <input
              type="text"
              value={student?.studentName}
              onChange={(e) =>
                onChange({ ...student, studentName: e.target.value })
              }
              className="border rounded p-2 w-full mb-4"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">
              Phone Number
            </label>
            <input
              type="tel"
              value={student?.mobile}
              onChange={(e) => onChange({ ...student, mobile: e.target.value })}
              className="border rounded p-2 w-full mb-4"
            />
          </div>

          {/* Academic Information */}
          <div>
            <label className="block mb-2 text-sm font-medium">Class</label>
            <select
              value={student?.class}
              onChange={(e) =>
                onChange(
                  { ...student, class: e.target.value },
                  handelClass(e.target.value)
                )
              }
              className="border rounded p-2 w-full mb-4"
            >
              <option value="">Select Class</option>
              {filterClass.map((option) => (
                <option key={option._id} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Section</label>
            <select
              value={student?.section}
              onChange={(e) =>
                onChange({ ...student, section: e.target.value })
              }
              className="border rounded p-2 w-full mb-4"
            >
              <option value="">Select Section</option>
              {filterSection.map((section) => (
                <option key={section} value={section}>
                  {section}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Shift</label>
            <select
              value={student?.shift || ""}
              onChange={(e) => onChange({ ...student, shift: e.target.value })}
              className="border rounded p-2 w-full mb-4"
            >
              <option value="">Select shift</option>
              {filterShift.map((shift) => (
                <option key={shift} value={shift}>
                  {shift}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Group</label>
            <select
              value={student?.group || ""}
              onChange={(e) => onChange({ ...student, group: e.target.value })}
              className="border rounded p-2 w-full mb-4"
            >
              {filterGroup.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {(student?.class === "9" || student?.class === "10") && (
            <div>
              <label className="block mb-2 text-sm font-medium">
                4th Subject
              </label>
              <select
                value={student?.fourthSubjectCode}
                onChange={(e) =>
                  onChange({ ...student, fourthSubjectCode: e.target.value })
                }
                className="border rounded p-2 w-full mb-4"
              >
                <option value={student?.fourthSubjectCode}>
                  {student?.fourthSubjectCode}
                </option>
                {/* {sessions.map((session) => (
                    <option key={session} value={session}>
                      {session}
                    </option>
                  ))} */}
              </select>
            </div>
          )}
          {/* <div>
            <label className="block mb-2 text-sm font-medium">Group</label>
            <select
              value={student?.group || ""}
              onChange={(e) => onChange({ ...student, group: e.target.value })}
              className="border rounded p-2 w-full mb-4"
            >
              {filterGroup.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div> */}
          {/* Family Information */}
          <div>
            <label className="block mb-2 text-sm font-medium">
              Father's Name
            </label>
            <input
              type="text"
              value={student?.fatherName}
              onChange={(e) =>
                onChange({ ...student, fatherName: e.target.value })
              }
              className="border rounded p-2 w-full mb-4"
            />
          </div>
          {/* Other Information */}
          <div>
            <label className="block mb-2 text-sm font-medium">Religion</label>
            <select
              value={student?.religion}
              onChange={(e) =>
                onChange({ ...student, religion: e.target.value })
              }
              className="border rounded p-2 w-full mb-4"
            >
              <option value="">Select Religion</option>
              <option value="Islam">Islam</option>
              <option value="Hinduism">Hindu</option>
              <option value="Christianity">Christian</option>
              <option value="Buddhism">Buddhism</option>
              <option value="Other">Other</option>
            </select>
          </div>
          {/* Full Width Fields */}
          {/* Read-only Fields */}
          <div>
            <label className="block mb-2 text-sm font-medium">Student ID</label>
            <input
              type="text"
              value={student?.studentId}
              className="border rounded p-2 w-full mb-4 bg-gray-100"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">
              Student Roll
            </label>
            <input
              type="text"
              value={student?.roll}
              className="border rounded p-2 w-full mb-4 bg-gray-100"
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

export default StudentEditModal;

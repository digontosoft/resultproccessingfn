// import axios from "axios";
// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";

// const AssignClassAndSubject = ({ teacher, onAssign }) => {
//   const [selectedClass, setSelectedClass] = useState("");
//   const [selectedSubjects, setSelectedSubjects] = useState([]);
//   const [selectAll, setSelectAll] = useState(false);
//   const [classes, setClasses] = useState([]);
//   const [subjects, setSubjects] = useState([]);
//   const [filteredSubjects, setFilteredSubjects] = useState([]);
//   const url = import.meta.env.VITE_SERVER_BASE_URL;

//   useEffect(() => {
//     const fetchClasses = async () => {
//       try {
//         const response = await axios.get(`${url}/class`);
//         setClasses(response.data.classes);
//       } catch (error) {
//         toast.error("Failed to fetch classes");
//         console.error(error);
//       }
//     };

//     fetchClasses();
//   }, [url]);

//   useEffect(() => {
//     const fetchSubjects = async () => {
//       try {
//         const response = await axios.get(`${url}/subjects`);
//         setSubjects(response.data.subjects);
//       } catch (error) {
//         toast.error("Failed to fetch subjects");
//         console.error(error);
//       }
//     };

//     fetchSubjects();
//   }, [url]);

//   const handleClassChange = (e) => {
//     const selectedClassName = e.target.value;
//     setSelectedClass(selectedClassName);
//     setSelectAll(false);

//     // Filter subjects based on the selected class
//     const filtered = subjects.filter(
//       (subject) => subject.class?.name === selectedClassName
//     );
//     setFilteredSubjects(filtered);
//     setSelectedSubjects([]); // Reset selected subjects when class changes
//   };

//   const handleSubjectToggle = (subject) => {
//     setSelectedSubjects((prev) =>
//       prev.includes(subject)
//         ? prev.filter((subj) => subj !== subject)
//         : [...prev, subject]
//     );
//     setSelectAll(false); // Uncheck "Select All" when toggling manually
//   };

//   const handleSelectAll = () => {
//     if (selectAll) {
//       setSelectedSubjects([]); // Clear all selections
//     } else {
//       setSelectedSubjects(filteredSubjects); // Select all filtered subjects
//     }
//     setSelectAll(!selectAll);
//   };

//   const handleAssign = async () => {
//     const data = {
//       teacher: teacher?._id,
//       // className: selectedClass,
//       subject: selectedSubjects.map((subject) => subject?._id),
//     };
//     if (selectedClass && selectedSubjects.length > 0) {
//       try {
//         const response = await axios.post(`${url}/teacher-sub`, data);
//         console.log("data:", data);
//         if (response.status === 200) {
//           toast.success("Subjects assigned successfully");
//           onAssign(teacher, selectedClass, selectedSubjects);
//           setSelectedClass("");
//           setSelectedSubjects([]);
//           setSelectAll(false);
//         }
//       } catch (error) {
//         toast.error("Failed to assign subjects");
//         console.error(error);
//       }
//     } else {
//       toast.error("Please select both class and at least one subject!");
//     }
//   };

//   return (
//     <div className="p-4 border rounded shadow">
//       <h2 className="text-lg font-bold mb-4">
//         Assign Class and Subject to {teacher.name}
//       </h2>

//       {/* Class Dropdown */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Select Class
//         </label>
//         <select
//           value={selectedClass}
//           onChange={handleClassChange}
//           className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
//         >
//           <option value="" disabled>
//             Choose a class
//           </option>
//           {classes.map((cls) => (
//             <option key={cls.id} value={cls.name}>
//               {cls.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Subject Selection */}
//       {selectedClass && (
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Select Subjects
//           </label>
//           {/* Select All Checkbox */}
//           <div className="flex items-center space-x-2 mb-4">
//             <input
//               type="checkbox"
//               checked={selectAll}
//               onChange={handleSelectAll}
//               disabled={filteredSubjects.length === 0}
//               className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//             />
//             <span className="text-gray-700">Select All</span>
//           </div>

//           {/* Subjects List */}
//           <div className="grid grid-cols-2 gap-2">
//             {filteredSubjects.length > 0 ? (
//               filteredSubjects.map((subject, index) => (
//                 <label
//                   key={index}
//                   className="inline-flex items-center space-x-2"
//                 >
//                   <input
//                     type="checkbox"
//                     value={subject.id}
//                     checked={selectedSubjects.includes(subject)}
//                     onChange={() => handleSubjectToggle(subject)}
//                     className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                   />
//                   <span className="text-gray-700">{subject.name}</span>
//                 </label>
//               ))
//             ) : (
//               <p className="text-gray-500">No subjects available</p>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Assign Button */}
//       <div className="flex justify-end">
//         <button
//           onClick={handleAssign}
//           className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${
//             selectedSubjects.length === 0 && "opacity-50 cursor-not-allowed"
//           }`}
//           disabled={selectedSubjects.length === 0}
//         >
//           Assign
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AssignClassAndSubject;

// import axios from "axios";
// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";

// const AssignClassAndSubject = ({ teacher, onAssign }) => {
//   const [selectedClass, setSelectedClass] = useState("");
//   const [selectedSubject, setSelectedSubject] = useState(null);
//   const [classes, setClasses] = useState([]);
//   const [subjects, setSubjects] = useState([]);
//   const [filteredSubjects, setFilteredSubjects] = useState([]);
//   const url = import.meta.env.VITE_SERVER_BASE_URL;

//   useEffect(() => {
//     const fetchClasses = async () => {
//       try {
//         const response = await axios.get(`${url}/class`);
//         setClasses(response.data.classes);
//       } catch (error) {
//         toast.error("Failed to fetch classes");
//         console.error(error);
//       }
//     };

//     fetchClasses();
//   }, [url]);

//   useEffect(() => {
//     const fetchSubjects = async () => {
//       try {
//         const response = await axios.get(`${url}/subjects`);
//         setSubjects(response.data.subjects);
//       } catch (error) {
//         toast.error("Failed to fetch subjects");
//         console.error(error);
//       }
//     };

//     fetchSubjects();
//   }, [url]);

//   const handleClassChange = (e) => {
//     const selectedClassName = e.target.value;
//     setSelectedClass(selectedClassName);

//     // Filter subjects based on the selected class
//     const filtered = subjects.filter(
//       (subject) => subject.class?.name === selectedClassName
//     );
//     setFilteredSubjects(filtered);
//     setSelectedSubject(null); // Reset selected subject when class changes
//   };

//   const handleSubjectToggle = (subject) => {
//     setSelectedSubject((prev) => (prev === subject ? null : subject));
//   };

//   const handleAssign = async () => {
//     if (selectedClass && selectedSubject) {
//       const data = {
//         email: teacher?.email,
//         subjectCode: selectedSubject?.subjectCode,
//       };
//       try {
//         const response = await axios.post(`${url}/teacher-sub`, data);
//         if (response.status === 200) {
//           toast.success("Subject assigned successfully");
//           onAssign(teacher, selectedClass, selectedSubject);
//           setSelectedClass("");
//           setSelectedSubject(null);
//         }
//         console.log("data:", data);
//       } catch (error) {
//         toast.error("Failed to assign subject");
//         console.error(error);
//       }
//     } else {
//       toast.error("Please select both class and a subject!");
//     }
//   };

//   return (
//     <div className="p-4 border rounded shadow">
//       <h2 className="text-lg font-bold mb-4">
//         Assign Class and Subject to {teacher.name}
//       </h2>

//       {/* Class Dropdown */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Select Class
//         </label>
//         <select
//           value={selectedClass}
//           onChange={handleClassChange}
//           className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
//         >
//           <option value="" disabled>
//             Choose a class
//           </option>
//           {classes.map((cls) => (
//             <option key={cls.id} value={cls.name}>
//               {cls.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Subject Selection */}
//       {selectedClass && (
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Select Subject
//           </label>
//           <div className="grid grid-cols-2 gap-2">
//             {filteredSubjects.length > 0 ? (
//               filteredSubjects.map((subject, index) => (
//                 <label
//                   key={index}
//                   className={`inline-flex items-center space-x-2 ${
//                     selectedSubject === subject ? "bg-blue-100" : ""
//                   }`}
//                 >
//                   <input
//                     type="radio"
//                     value={subject.id}
//                     checked={selectedSubject === subject}
//                     onChange={() => handleSubjectToggle(subject)}
//                     className="form-radio h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
//                   />
//                   <span className="text-gray-700">{subject.name}</span>
//                 </label>
//               ))
//             ) : (
//               <p className="text-gray-500">No subjects available</p>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Assign Button */}
//       <div className="flex justify-end">
//         <button
//           onClick={handleAssign}
//           className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${
//             !selectedSubject && "opacity-50 cursor-not-allowed"
//           }`}
//           disabled={!selectedSubject}
//         >
//           Assign
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AssignClassAndSubject;

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AssignClassAndSubject = ({ teacher, onClose, onAssign }) => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [loadingClasses, setLoadingClasses] = useState(true);
  const [loadingSubjects, setLoadingSubjects] = useState(true);
  const [selectAll, setSelectAll] = useState(false); // For the "All Select" checkbox
  const url = import.meta.env.VITE_SERVER_BASE_URL;

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(`${url}/class`);
        setClasses(response.data.classes);
      } catch (error) {
        toast.error("Failed to fetch classes");
        console.error(error);
      } finally {
        setLoadingClasses(false);
      }
    };

    fetchClasses();
  }, [url]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(`${url}/subjects`);
        setSubjects(response.data.subjects);
      } catch (error) {
        toast.error("Failed to fetch subjects");
        console.error(error);
      } finally {
        setLoadingSubjects(false);
      }
    };

    fetchSubjects();
  }, [url]);

  useEffect(() => {
    // Reset selected subjects and selectAll state when class changes
    setSelectedSubjects([]);
    setSelectAll(false);
  }, [selectedClass]);

  const handleClassChange = (e) => {
    const selectedClassName = e.target.value;
    setSelectedClass(selectedClassName);

    // Filter subjects based on the selected class
    const filtered = subjects.filter(
      (subject) => subject.class?.name === selectedClassName
    );
    setFilteredSubjects(filtered);
  };

  const handleSubjectChange = (subjectId) => {
    const newSelectedSubjects = selectedSubjects.includes(subjectId)
      ? selectedSubjects.filter((id) => id !== subjectId)
      : [...selectedSubjects, subjectId];

    setSelectedSubjects(newSelectedSubjects);

    // Update "All Select" checkbox state based on selection
    if (newSelectedSubjects.length === filteredSubjects.length) {
      setSelectAll(true); // All subjects selected
    } else {
      setSelectAll(false); // Not all subjects selected
    }
  };

  const handleAllSelectChange = () => {
    if (selectAll) {
      setSelectedSubjects([]); // Deselect all subjects
    } else {
      setSelectedSubjects(filteredSubjects.map((subject) => subject.id)); // Select all subjects
    }
    setSelectAll(!selectAll);
  };

  const handleAssign = async () => {
    if (selectedClass && selectedSubjects.length > 0) {
      const data = {
        email: teacher?.email,
        subjects: selectedSubjects.map((subject) => subject.subjectCode),
      };
      try {
        const response = await axios.post(`${url}/teacher-sub`, data);
        if (response.status === 200) {
          toast.success("Subjects assigned successfully");
          onAssign(teacher, selectedClass, selectedSubjects);
          setSelectedClass("");
          setSelectedSubjects([]);
          onClose(); // Close the modal after assignment
        }
      } catch (error) {
        toast.error("Failed to assign subjects");
        console.error(error);
      }
    } else {
      toast.error("Please select both class and at least one subject!");
    }
  };

  return (
    <>
      {/* Background Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="p-6 bg-white rounded-lg shadow-xl max-w-lg w-full overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-6 text-center text-blue-600">
            Assign Class and Subject to {teacher.name}
          </h2>

          {/* Class Dropdown */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Class
            </label>
            {loadingClasses ? (
              <p className="text-gray-500">Loading classes...</p>
            ) : (
              <select
                value={selectedClass}
                onChange={handleClassChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="" disabled>
                  Choose a class
                </option>
                {classes.map((cls) => (
                  <option key={cls.id} value={cls.name}>
                    {cls.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Subject List */}
          {selectedClass && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Subjects
              </label>
              {loadingSubjects ? (
                <p className="text-gray-500">Loading subjects...</p>
              ) : filteredSubjects.length > 0 ? (
                <div className="border border-gray-300 rounded-lg p-4 space-y-4 max-h-64 overflow-y-auto bg-gray-50">
                  {/* "All Select" Checkbox */}
                  <label className="inline-flex items-center space-x-3 cursor-pointer hover:bg-blue-100 p-2 rounded-lg">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleAllSelectChange}
                      className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-gray-700 text-sm">Select All</span>
                  </label>

                  {/* Individual Subject Checkboxes */}
                  {filteredSubjects.map((subject) => (
                    <label
                      key={subject.id}
                      className="inline-flex items-center space-x-3 cursor-pointer hover:bg-blue-100 p-2 rounded-lg"
                    >
                      <input
                        type="checkbox"
                        value={subject.id}
                        checked={selectedSubjects.includes(subject.id)}
                        onChange={() => handleSubjectChange(subject.id)}
                        className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-gray-700 text-sm">
                        {subject.name}
                      </span>
                    </label>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No subjects available</p>
              )}
            </div>
          )}

          {/* Assign Button */}
          <div className="flex justify-between items-center">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Close
            </button>
            <button
              onClick={handleAssign}
              className={`px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ${
                selectedSubjects.length === 0
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={selectedSubjects.length === 0}
            >
              Assign
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AssignClassAndSubject;

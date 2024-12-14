// import axios from "axios";
// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";

// const AssignClassAndSubject = ({ teacher, onClose, onAssign }) => {
//   const [selectedClass, setSelectedClass] = useState("");
//   const [selectedShift, setSelectedShift] = useState("");
//   const [selectedSubjects, setSelectedSubjects] = useState([]);
//   const [classes, setClasses] = useState([]);
//   const [subjects, setSubjects] = useState([]);
//   const [filteredSubjects, setFilteredSubjects] = useState([]);
//   const [selectAll, setSelectAll] = useState(false);
//   const [teacherSubjects, setTeacherSubjects] = useState([]);
//   const [loadingClasses, setLoadingClasses] = useState(true);
//   const [loadingSubjects, setLoadingSubjects] = useState(true);
//   const [loading, setLoading] = useState(true);
//   const url = import.meta.env.VITE_SERVER_BASE_URL;

//   // Fetch classes
//   useEffect(() => {
//     const fetchClasses = async () => {
//       try {
//         const response = await axios.get(`${url}/class`);
//         setClasses(response.data.classes);
//       } catch (error) {
//         toast.error("Failed to fetch classes");
//         console.error(error);
//       } finally {
//         setLoadingClasses(false);
//       }
//     };

//     fetchClasses();
//   }, [url]);

//   // Fetch subjects
//   useEffect(() => {
//     const fetchSubjects = async () => {
//       try {
//         const response = await axios.get(`${url}/subjects`);
//         setSubjects(response.data.subjects);
//       } catch (error) {
//         toast.error("Failed to fetch subjects");
//         console.error(error);
//       } finally {
//         setLoadingSubjects(false);
//       }
//     };

//     fetchSubjects();
//   }, [url]);

//   // Fetch teacher's assigned subjects
//   useEffect(() => {
//     const fetchTeacherSubjects = async () => {
//       try {
//         const response = await axios.get(
//           `${url}/teacher-subjects/${teacher._id}`
//         );
//         setTeacherSubjects(response.data.data);
//       } catch (error) {
//         console.error("Error fetching teacher subjects:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTeacherSubjects();
//   }, [url, teacher]);

//   // Reset state when class changes
//   useEffect(() => {
//     setSelectedSubjects([]);
//     setSelectedShift("");
//     setSelectAll(false);
//   }, [selectedClass]);

//   // Filter subjects based on selected class
//   useEffect(() => {
//     if (selectedClass) {
//       const filtered = subjects.filter(
//         (subject) => subject.class?.name === selectedClass
//       );
//       setFilteredSubjects(filtered);
//     }
//   }, [selectedClass, subjects]);

//   // Handle class selection
//   const handleClassChange = (e) => setSelectedClass(e.target.value);

//   // Handle shift selection
//   const handleShiftChange = (e) => setSelectedShift(e.target.value);

//   // Handle individual subject selection
//   const handleSubjectChange = (subjectId) => {
//     const newSelectedSubjects = selectedSubjects.includes(subjectId)
//       ? selectedSubjects.filter((id) => id !== subjectId)
//       : [...selectedSubjects, subjectId];

//     setSelectedSubjects(newSelectedSubjects);
//     setSelectAll(newSelectedSubjects.length === filteredSubjects.length);
//   };

//   // Handle "Select All" functionality
//   const handleAllSelectChange = () => {
//     if (selectAll) {
//       setSelectedSubjects([]);
//     } else {
//       setSelectedSubjects(filteredSubjects.map((subject) => subject._id));
//     }
//     setSelectAll(!selectAll);
//   };

//   // Handle assigning subjects
//   const handleAssign = async () => {
//     if (selectedClass && selectedShift && selectedSubjects.length > 0) {
//       const newClassVsSubject = {
//         class_id: classes.find((cls) => cls.name === selectedClass)?._id,
//         shift: selectedShift,
//         subjects: selectedSubjects.map((subjectId) => ({
//           _id: subjectId,
//         })),
//       };

//       const updatedClassVsSubject = [
//         ...teacherSubjects.map((ts) => ts.ClassVsSubject).flat(),
//         newClassVsSubject,
//       ];

//       const payload = {
//         teacher_id: teacher?._id,
//         ClassVsSubject: updatedClassVsSubject,
//       };

//       try {
//         const response = await axios.post(`${url}/teacher-subjects`, payload);
//         if (response.status === 201) {
//           toast.success("Subjects assigned successfully");
//           onAssign(teacher, selectedClass, selectedShift, selectedSubjects);
//           setSelectedClass("");
//           setSelectedShift("");
//           setSelectedSubjects([]);
//           onClose();
//         }
//       } catch (error) {
//         toast.error("Failed to assign subjects");
//         console.error(error);
//       }
//     } else {
//       toast.error("Please select class, shift, and at least one subject!");
//     }
//   };

//   return (
//     <>
//       {/* Background Overlay */}
//       <div
//         className="fixed inset-0 bg-black bg-opacity-50 z-40"
//         onClick={onClose}
//       ></div>

//       {/* Modal */}
//       <div className="fixed inset-0 flex items-center justify-center z-50">
//         <div className="p-6 bg-white rounded-lg shadow-xl max-w-lg w-full overflow-y-auto">
//           <h2 className="text-2xl font-semibold mb-6 text-center text-blue-600">
//             Assign Class and Subject to {teacher?.firstName} {teacher?.lastName}
//           </h2>

//           {/* Display Previously Assigned Classes and Subjects */}
//           <div className="mb-6">
//             {teacherSubjects.map((entry) => (
//               <div key={entry._id} className="mb-4">
//                 <h3 className="text-lg font-semibold">
//                   {entry?.ClassVsSubject[0]?.class_id?.name}
//                 </h3>
//                 <p className="text-gray-600">
//                   {entry?.ClassVsSubject[0]?.shift}
//                 </p>
//                 <ul className="list-disc pl-5 text-gray-700">
//                   {entry?.ClassVsSubject[0]?.subjects.map((subject) => (
//                     <li key={subject._id}>{subject.name}</li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>

//           {/* Class Dropdown */}
//           <div className="mb-6">
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Select Class
//             </label>
//             {loadingClasses ? (
//               <p className="text-gray-500">Loading classes...</p>
//             ) : (
//               <select
//                 value={selectedClass}
//                 onChange={handleClassChange}
//                 className="block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
//               >
//                 <option value="" disabled>
//                   Choose a class
//                 </option>
//                 {classes.map((cls) => (
//                   <option key={cls._id} value={cls.name}>
//                     {cls.name}
//                   </option>
//                 ))}
//               </select>
//             )}
//           </div>

//           {/* Subject Selection */}
//           {selectedClass && (
//             <div className="mb-6">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Select Subjects
//               </label>
//               {loadingSubjects ? (
//                 <p className="text-gray-500">Loading subjects...</p>
//               ) : filteredSubjects.length > 0 ? (
//                 <div className="border border-gray-300 rounded-lg p-4 space-y-4 max-h-64 overflow-y-auto bg-gray-50">
//                   <label className="inline-flex items-center space-x-3 cursor-pointer hover:bg-blue-100 p-2 rounded-lg">
//                     <input
//                       type="checkbox"
//                       checked={selectAll}
//                       onChange={handleAllSelectChange}
//                       className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
//                     />
//                     <span className="text-gray-700 text-sm">Select All</span>
//                   </label>
//                   {filteredSubjects.map((subject) => (
//                     <label
//                       key={subject._id}
//                       className="inline-flex items-center space-x-3 cursor-pointer hover:bg-blue-100 p-2 rounded-lg"
//                     >
//                       <input
//                         type="checkbox"
//                         value={subject._id}
//                         checked={selectedSubjects.includes(subject._id)}
//                         onChange={() => handleSubjectChange(subject._id)}
//                         className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
//                       />
//                       <span className="text-gray-700 text-sm">
//                         {subject.name}
//                       </span>
//                     </label>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-gray-500">No subjects available</p>
//               )}
//             </div>
//           )}

//           {/* Shift Dropdown */}
//           {selectedClass && filteredSubjects.length > 0 && (
//             <div className="mb-6">
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Select Shift
//               </label>
//               <select
//                 value={selectedShift}
//                 onChange={handleShiftChange}
//                 className="block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
//               >
//                 <option value="" disabled>
//                   Choose a shift
//                 </option>
//                 <option value="morning">Morning</option>
//                 <option value="day">Day</option>
//               </select>
//             </div>
//           )}

//           {/* Assign Button */}
//           <div className="flex justify-between items-center">
//             <button
//               onClick={onClose}
//               className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
//             >
//               Close
//             </button>
//             <button
//               onClick={handleAssign}
//               className={`px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ${
//                 !selectedClass ||
//                 !selectedShift ||
//                 selectedSubjects.length === 0
//                   ? "opacity-50 cursor-not-allowed"
//                   : ""
//               }`}
//               disabled={
//                 !selectedClass ||
//                 !selectedShift ||
//                 selectedSubjects.length === 0
//               }
//             >
//               Assign
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AssignClassAndSubject;

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AssignClassAndSubject = ({ teacher, onClose, onAssign }) => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedShift, setSelectedShift] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [teacherSubjects, setTeacherSubjects] = useState([]);
  const [loadingClasses, setLoadingClasses] = useState(true);
  const [loadingSubjects, setLoadingSubjects] = useState(true);
  const [loading, setLoading] = useState(true);
  const url = import.meta.env.VITE_SERVER_BASE_URL;

  // Fetch classes
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

  // Fetch subjects
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

  // Fetch teacher's assigned subjects
  useEffect(() => {
    const fetchTeacherSubjects = async () => {
      try {
        const response = await axios.get(
          `${url}/teacher-subjects/${teacher._id}`
        );
        setTeacherSubjects(response.data.data);
      } catch (error) {
        console.error("Error fetching teacher subjects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherSubjects();
  }, [url, teacher]);

  // Reset state when class changes
  useEffect(() => {
    setSelectedSubjects([]);
    setSelectedShift("");
    setSelectAll(false);
  }, [selectedClass]);

  // Filter subjects based on selected class
  useEffect(() => {
    if (selectedClass) {
      const filtered = subjects.filter(
        (subject) => subject.class?.name === selectedClass
      );
      setFilteredSubjects(filtered);
    }
  }, [selectedClass, subjects]);

  // Handle class selection
  const handleClassChange = (e) => setSelectedClass(e.target.value);

  // Handle shift selection
  const handleShiftChange = (e) => setSelectedShift(e.target.value);

  // Handle individual subject selection
  const handleSubjectChange = (subjectId) => {
    const newSelectedSubjects = selectedSubjects.includes(subjectId)
      ? selectedSubjects.filter((id) => id !== subjectId)
      : [...selectedSubjects, subjectId];

    setSelectedSubjects(newSelectedSubjects);
    setSelectAll(newSelectedSubjects.length === filteredSubjects.length);
  };

  // Handle "Select All" functionality
  const handleAllSelectChange = () => {
    if (selectAll) {
      setSelectedSubjects([]);
    } else {
      setSelectedSubjects(filteredSubjects.map((subject) => subject._id));
    }
    setSelectAll(!selectAll);
  };

  // Handle assigning subjects
  const handleAssign = async () => {
    if (selectedClass && selectedShift && selectedSubjects.length > 0) {
      const newClassVsSubject = {
        class_id: classes.find((cls) => cls.name === selectedClass)?._id,
        shift: selectedShift,
        subjects: selectedSubjects.map((subjectId) => ({
          _id: subjectId,
        })),
      };

      const updatedClassVsSubject = [
        ...teacherSubjects.map((ts) => ts.ClassVsSubject).flat(),
        newClassVsSubject,
      ];

      const payload = {
        teacher_id: teacher?._id,
        ClassVsSubject: updatedClassVsSubject,
      };

      try {
        const response = await axios.post(`${url}/teacher-subjects`, payload);
        if (response.status === 201) {
          toast.success("Subjects assigned successfully");
          onAssign(teacher, selectedClass, selectedShift, selectedSubjects);
          setSelectedClass("");
          setSelectedShift("");
          setSelectedSubjects([]);
          onClose();
        }
      } catch (error) {
        toast.error("Failed to assign subjects");
        console.error(error);
      }
    } else {
      toast.error("Please select class, shift, and at least one subject!");
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
            Assign Class and Subject to {teacher?.firstName} {teacher?.lastName}
          </h2>

          {/* Display Previously Assigned Classes and Subjects */}
          <div className="mb-6">
            <h3 className="text-lg font-bold mb-4 text-gray-700">
              Previously Assigned:
            </h3>
            {teacherSubjects.map((entry, index) => (
              <div
                key={index}
                className="border border-gray-300 rounded-lg p-4 mb-4 bg-gray-50 shadow-sm"
              >
                {entry.ClassVsSubject.map((classVsSubject, idx) => (
                  <div key={idx} className="mb-4 last:mb-0">
                    <div>
                      {/* Class Section */}
                      <div className="flex flex-col">
                        <h4 className="text-md font-semibold text-gray-800">
                          Class: {classVsSubject.class_id?.name} (
                          <span className="uppercase">
                            {classVsSubject.shift}
                          </span>
                          )
                        </h4>
                      </div>

                      {/* Subjects Section */}
                      <div className="grid grid-cols-3 gap-4 mt-4">
                        {classVsSubject.subjects.map((subject) => (
                          <div
                            key={subject._id}
                            className="px-3 py-2 text-sm font-medium bg-blue-100 text-blue-700 rounded-lg shadow-md text-center"
                          >
                            {subject.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

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
                  <option key={cls._id} value={cls.name}>
                    {cls.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Subject Selection */}
          {selectedClass && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Subjects
              </label>
              {loadingSubjects ? (
                <p className="text-gray-500">Loading subjects...</p>
              ) : filteredSubjects.length > 0 ? (
                <div className="border border-gray-300 rounded-lg p-4 space-y-4 max-h-64 overflow-y-auto bg-gray-50">
                  <label className="inline-flex items-center space-x-3 cursor-pointer hover:bg-blue-100 p-2 rounded-lg">
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleAllSelectChange}
                      className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-gray-700 text-sm">Select All</span>
                  </label>
                  {filteredSubjects.map((subject) => (
                    <label
                      key={subject._id}
                      className="inline-flex items-center space-x-3 cursor-pointer hover:bg-blue-100 p-2 rounded-lg"
                    >
                      <input
                        type="checkbox"
                        value={subject._id}
                        checked={selectedSubjects.includes(subject._id)}
                        onChange={() => handleSubjectChange(subject._id)}
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

          {/* Shift Dropdown */}
          {selectedClass && filteredSubjects.length > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Shift
              </label>
              <select
                value={selectedShift}
                onChange={handleShiftChange}
                className="block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="" disabled>
                  Choose a shift
                </option>
                <option value="morning">Morning</option>
                <option value="day">Day</option>
              </select>
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
                !selectedClass ||
                !selectedShift ||
                selectedSubjects.length === 0
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={
                !selectedClass ||
                !selectedShift ||
                selectedSubjects.length === 0
              }
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

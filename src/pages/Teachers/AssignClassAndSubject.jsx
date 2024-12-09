// import { useState } from "react";

// const AssignClassAndSubject = () => {
//   const [selectedClass, setSelectedClass] = useState("");
//   const [selectedSubject, setSelectedSubject] = useState("");

//   const classes = [
//     {
//       id: 1,
//       class: "Class1",
//       subjects: ["Math", "Science", "English", "History", "ICT"],
//     },
//     {
//       id: 2,
//       class: "Class2",
//       subjects: ["Math", "Science", "English", "History"],
//     },
//     {
//       id: 3,
//       class: "Class3",
//       subjects: ["Math", "Science", "English", "ICT"],
//     },
//     {
//       id: 4,
//       class: "Class4",
//       subjects: ["Math", "Science", "English", "History", "ICT"],
//     },
//   ];

//   // Handle Assign
//   const handleAssign = () => {
//     if (selectedClass && selectedSubject) {
//       alert(`Assigned ${selectedSubject} to ${selectedClass}`);
//     } else {
//       alert("Please select both class and subject!");
//     }
//   };

//   // Get subjects based on selected class
//   const subjects =
//     classes.find((cls) => cls.class === selectedClass)?.subjects || [];

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">Assign Class and Subject</h1>

//       {/* Class Dropdown */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Select Class
//         </label>
//         <select
//           value={selectedClass}
//           onChange={(e) => {
//             setSelectedClass(e.target.value);
//             setSelectedSubject(""); // Reset subject when class changes
//           }}
//           className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
//         >
//           <option value="" disabled>
//             Choose a class
//           </option>
//           {classes.map((cls) => (
//             <option key={cls.id} value={cls.class}>
//               {cls.class}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Subject Dropdown */}
//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Select Subject
//         </label>
//         <select
//           value={selectedSubject}
//           onChange={(e) => setSelectedSubject(e.target.value)}
//           className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
//           disabled={!selectedClass} // Disable dropdown until class is selected
//         >
//           <option value="" disabled>
//             {selectedClass ? "Choose a subject" : "Select a class first"}
//           </option>
//           {subjects.map((subj, index) => (
//             <option key={index} value={subj}>
//               {subj}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Assign Button */}
//       <div className="flex justify-end">
//         <button
//           onClick={handleAssign}
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//           disabled={!selectedClass || !selectedSubject}
//         >
//           Assign
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AssignClassAndSubject;

import { useState } from "react";
import { toast } from "react-toastify";

// AssignClassAndSubject Component
const AssignClassAndSubject = ({ teacher, onAssign }) => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

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

  const handleAssign = () => {
    if (selectedClass && selectedSubject) {
      onAssign(teacher, selectedClass, selectedSubject);
      toast.success(`Assigned ${selectedSubject} to ${selectedClass}`);
    } else {
      toast.error("Please select both class and subject!");
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
            setSelectedSubject(""); // Reset subject when class changes
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

      {/* Subject Dropdown */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Subject
        </label>
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          disabled={!selectedClass}
        >
          <option value="" disabled>
            {selectedClass ? "Choose a subject" : "Select a class first"}
          </option>
          {subjects.map((subj, index) => (
            <option key={index} value={subj}>
              {subj}
            </option>
          ))}
        </select>
      </div>

      {/* Assign Button */}
      <div className="flex justify-end">
        <button
          onClick={handleAssign}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={!selectedClass || !selectedSubject}
        >
          Assign
        </button>
      </div>
    </div>
  );
};

export default AssignClassAndSubject;

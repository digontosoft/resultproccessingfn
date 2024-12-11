import { useState } from "react";
import AssignClassAndSubject from "./AssignClassAndSubject";

// const teachers = [
//   {
//     position: 1,
//     designation: "Principal",
//     name: "Ahmed Ali",
//     subject: "Management",
//     image: "image1",
//     mobile: "01711111111",
//   },
//   {
//     position: 2,
//     designation: "Vice Principal",
//     name: "Ayesha Begum",
//     subject: "Physics",
//     image: "image2",
//     mobile: "01722222222",
//   },
//   {
//     position: 3,
//     designation: "Asst. Teacher",
//     name: "Kabir Hosain",
//     subject: "Mathematics",
//     image: "image3",
//     mobile: "01733333333",
//   },
//   {
//     position: 4,
//     designation: "Asst. Teacher",
//     name: "Rahim Khan",
//     subject: "Chemistry",
//     image: "image4",
//     mobile: "01744444444",
//   },
//   {
//     position: 5,
//     designation: "Asst. Teacher",
//     name: "Sumaiya Jahan",
//     subject: "Biology",
//     image: "image5",
//     mobile: "01755555555",
//   },
//   {
//     position: 6,
//     designation: "Senior Teacher",
//     name: "Tariq Aziz",
//     subject: "English",
//     image: "image6",
//     mobile: "01766666666",
//   },
//   {
//     position: 7,
//     designation: "Junior Teacher",
//     name: "Mariam Akter",
//     subject: "History",
//     image: "image7",
//     mobile: "01777777777",
//   },
//   {
//     position: 8,
//     designation: "Junior Teacher",
//     name: "Sajib Rahman",
//     subject: "Geography",
//     image: "image8",
//     mobile: "01788888888",
//   },
//   {
//     position: 9,
//     designation: "Asst. Teacher",
//     name: "Nusrat Jahan",
//     subject: "ICT",
//     image: "image9",
//     mobile: "01799999999",
//   },
//   {
//     position: 10,
//     designation: "Senior Teacher",
//     name: "Farid Hossain",
//     subject: "Economics",
//     image: "image10",
//     mobile: "01800000000",
//   },
// ];

// const TeacherTable = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedTeacherIndex, setSelectedTeacherIndex] = useState(null); // Track the selected teacher

//   const itemsPerPage = 5;
//   const totalPages = Math.ceil(teachers.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentData = teachers.slice(startIndex, startIndex + itemsPerPage);

//   const handleCheckboxChange = (index) => {
//     // Allow only one checkbox to be selected at a time
//     setSelectedTeacherIndex((prevIndex) =>
//       prevIndex === index ? null : index
//     );
//   };

//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   return (
//     <div className="p-4">
//       {/* Show AssignClassAndSubject if a teacher is selected */}
//       {selectedTeacherIndex !== null && <AssignClassAndSubject />}

//       <div className="overflow-x-auto">
//         <table className="min-w-full border border-gray-200">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border border-gray-200 px-4 py-2">Select</th>
//               <th className="border border-gray-200 px-4 py-2">Position</th>
//               <th className="border border-gray-200 px-4 py-2">Designation</th>
//               <th className="border border-gray-200 px-4 py-2">Name</th>
//               <th className="border border-gray-200 px-4 py-2">Subject</th>
//               <th className="border border-gray-200 px-4 py-2">Mobile</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentData.map((teacher, index) => {
//               const globalIndex = startIndex + index; // Track global position in pagination
//               return (
//                 <tr key={index} className="hover:bg-gray-50">
//                   <td className="border border-gray-200 px-4 py-2 text-center">
//                     <input
//                       type="checkbox"
//                       checked={selectedTeacherIndex === globalIndex}
//                       onChange={() => handleCheckboxChange(globalIndex)}
//                       className="form-checkbox h-4 w-4 text-blue-600"
//                     />
//                   </td>
//                   <td className="border border-gray-200 px-4 py-2 text-center">
//                     {teacher.position}
//                   </td>
//                   <td className="border border-gray-200 px-4 py-2">
//                     {teacher.designation}
//                   </td>
//                   <td className="border border-gray-200 px-4 py-2">
//                     {teacher.name}
//                   </td>
//                   <td className="border border-gray-200 px-4 py-2">
//                     {teacher.subject}
//                   </td>
//                   <td className="border border-gray-200 px-4 py-2 text-center">
//                     {teacher.mobile}
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination Controls */}
//       <div className="flex justify-center items-center space-x-2 mt-4">
//         <button
//           onClick={() => handlePageChange(currentPage - 1)}
//           className={`px-3 py-1 border rounded ${
//             currentPage === 1
//               ? "opacity-50 cursor-not-allowed"
//               : "hover:bg-gray-200"
//           }`}
//           disabled={currentPage === 1}
//         >
//           Previous
//         </button>
//         {Array.from({ length: totalPages }, (_, index) => (
//           <button
//             key={index}
//             onClick={() => handlePageChange(index + 1)}
//             className={`px-3 py-1 border rounded ${
//               currentPage === index + 1
//                 ? "bg-blue-500 text-white"
//                 : "hover:bg-gray-200"
//             }`}
//           >
//             {index + 1}
//           </button>
//         ))}
//         <button
//           onClick={() => handlePageChange(currentPage + 1)}
//           className={`px-3 py-1 border rounded ${
//             currentPage === totalPages
//               ? "opacity-50 cursor-not-allowed"
//               : "hover:bg-gray-200"
//           }`}
//           disabled={currentPage === totalPages}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TeacherTable;

const TeacherTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTeacherIndex, setSelectedTeacherIndex] = useState(null);
  const [assignments, setAssignments] = useState([]); // Store assignments dynamically

  const teachers = [
    {
      id: 1,
      designation: "Principal",
      name: "Ahmed Ali",
      subject: "Management",
      mobile: "01711111111",
    },
    {
      id: 2,
      designation: "Vice Principal",
      name: "Ayesha Begum",
      subject: "Physics",
      mobile: "01722222222",
    },
    {
      id: 3,
      designation: "Asst. Teacher",
      name: "Kabir Hosain",
      subject: "Mathematics",
      mobile: "01733333333",
    },
    {
      id: 4,
      designation: "Senior Teacher",
      name: "Tariq Aziz",
      subject: "English",
      mobile: "01766666666",
    },
  ];

  const itemsPerPage = 5;
  const totalPages = Math.ceil(teachers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = teachers.slice(startIndex, startIndex + itemsPerPage);

  const handleCheckboxChange = (index) => {
    setSelectedTeacherIndex((prevIndex) =>
      prevIndex === index ? null : index
    );
  };

  const handleAssign = (teacher, selectedClass, selectedSubject) => {
    setAssignments((prevAssignments) => [
      ...prevAssignments.filter((a) => a.teacher.id !== teacher.id), // Remove previous assignment for this teacher
      { teacher, class: selectedClass, subject: selectedSubject },
    ]);
    setSelectedTeacherIndex(null); // Close assignment UI after assigning
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-4">
      {/* Assign Class and Subject */}
      {selectedTeacherIndex !== null && (
        <AssignClassAndSubject
          teacher={teachers[selectedTeacherIndex]}
          onAssign={handleAssign}
        />
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-200 px-4 py-2">Select</th>
              <th className="border border-gray-200 px-4 py-2">Designation</th>
              <th className="border border-gray-200 px-4 py-2">Name</th>
              <th className="border border-gray-200 px-4 py-2">Subject</th>
              <th className="border border-gray-200 px-4 py-2">Mobile</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((teacher, index) => {
              const globalIndex = startIndex + index;
              return (
                <tr key={teacher.id} className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-4 py-2 text-center">
                    <input
                      type="checkbox"
                      checked={selectedTeacherIndex === globalIndex}
                      onChange={() => handleCheckboxChange(globalIndex)}
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {teacher.designation}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {teacher.name}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {teacher.subject}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {teacher.mobile}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-2 mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className={`px-3 py-1 border rounded ${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-200"
          }`}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className={`px-3 py-1 border rounded ${
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-200"
          }`}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TeacherTable;

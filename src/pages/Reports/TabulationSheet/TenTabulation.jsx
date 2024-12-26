// import React, { useState, useEffect } from "react";

// const TabulationSheet = () => {
//   const [subjects, setSubjects] = useState([]);
//   const [students, setStudents] = useState([]);

//   useEffect(() => {
//     // Mock data for subjects
//     const mockSubjects = [
//       { name: "Bangla 1st paper" },
//       { name: "Bangla 2nd paper" },
//       { name: "English 1st paper" },
//       { name: "English 2nd paper" },
//       { name: "Mathematics" },
//     ];
//     // Mock data for students
//     const mockStudents = [
//       {
//         roll: 1,
//         name: "Student A",
//         scores: {
//           "Bangla 1st paper": { CA: 10, MCQ: 5, PRA: 4, TO: 35, LG: 20, GP: 3 },
//           "Bangla 2nd paper": { CA: 12, MCQ: 6, PRA: 5, TO: 38, LG: 22, GP: 3 },
//           "English 1st paper": {
//             CA: 15,
//             MCQ: 8,
//             PRA: 6,
//             TO: 40,
//             LG: 25,
//             GP: 4,
//           },
//           "English 2nd paper": {
//             CA: 14,
//             MCQ: 7,
//             PRA: 5,
//             TO: 42,
//             LG: 24,
//             GP: 4,
//           },
//           Mathematics: { CA: 20, MCQ: 10, PRA: 8, TO: 50, LG: 30, GP: 5 },
//         },
//         totalMarks: 250,
//         gpa: 4.8,
//         merit: 1,
//       },
//       {
//         roll: 2,
//         name: "Student B",
//         scores: {
//           "Bangla 1st paper": { CA: 11, MCQ: 6, PRA: 5, TO: 36, LG: 21, GP: 3 },
//           "Bangla 2nd paper": { CA: 13, MCQ: 7, PRA: 6, TO: 39, LG: 23, GP: 3 },
//           "English 1st paper": {
//             CA: 16,
//             MCQ: 9,
//             PRA: 7,
//             TO: 41,
//             LG: 26,
//             GP: 4,
//           },
//           "English 2nd paper": {
//             CA: 15,
//             MCQ: 8,
//             PRA: 6,
//             TO: 43,
//             LG: 25,
//             GP: 4,
//           },
//           Mathematics: { CA: 18, MCQ: 9, PRA: 7, TO: 48, LG: 28, GP: 5 },
//         },
//         totalMarks: 247,
//         gpa: 4.7,
//         merit: 2,
//       },
//     ];

//     setSubjects(mockSubjects);
//     setStudents(mockStudents);
//   }, []);

//   const calculateCombinedTotal = (student, subject1, subject2) => {
//     const total1 = student.scores[subject1]?.TO || 0;
//     const total2 = student.scores[subject2]?.TO || 0;
//     return total1 + total2;
//   };

//   return (
//     <div className="overflow-auto">
//       <table className="min-w-full border-collapse border border-gray-300">
//         <thead>
//           <tr>
//             <th rowSpan={2} className="border border-gray-300 p-2">
//               Roll
//             </th>
//             <th rowSpan={2} className="border border-gray-300 p-2">
//               Student Name
//             </th>
//             {subjects.map((subject) => (
//               <th
//                 key={subject.name}
//                 colSpan={2}
//                 className="border border-gray-300 p-2"
//               >
//                 {subject.name}
//               </th>
//             ))}
//             {["Bangla", "English"].map((subject) => (
//               <th
//                 key={subject}
//                 rowSpan={2}
//                 className="border border-gray-300 p-2"
//               >
//                 {subject} Total
//               </th>
//             ))}
//             <th rowSpan={2} className="border border-gray-300 p-2">
//               Total Marks
//             </th>
//             <th rowSpan={2} className="border border-gray-300 p-2">
//               GPA
//             </th>
//             <th rowSpan={2} className="border border-gray-300 p-2">
//               Merit
//             </th>
//           </tr>
//           <tr>
//             {subjects.map(() => (
//               <>
//                 <th className="border border-gray-300 p-2">CA/MCQ/PRA</th>
//                 <th className="border border-gray-300 p-2">TO/LG/GP</th>
//               </>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {students.map((student) => (
//             <tr key={student.roll}>
//               <td className="border border-gray-300 p-2">{student.roll}</td>
//               <td className="border border-gray-300 p-2">{student.name}</td>
//               {subjects.map((subject) => (
//                 <React.Fragment key={subject.name}>
//                   <td className="border border-gray-300 p-2">
//                     {[
//                       student.scores[subject.name]?.CA || "-",
//                       student.scores[subject.name]?.MCQ || "-",
//                       student.scores[subject.name]?.PRA || "-",
//                     ].join("/")}
//                   </td>
//                   <td className="border border-gray-300 p-2">
//                     {[
//                       student.scores[subject.name]?.TO || "-",
//                       student.scores[subject.name]?.LG || "-",
//                       student.scores[subject.name]?.GP || "-",
//                     ].join("/")}
//                   </td>
//                 </React.Fragment>
//               ))}
//               {["Bangla", "English"].map((subject) => (
//                 <td key={subject} className="border border-gray-300 p-2">
//                   {calculateCombinedTotal(
//                     student,
//                     `${subject} 1st paper`,
//                     `${subject} 2nd paper`
//                   )}
//                 </td>
//               ))}
//               <td className="border border-gray-300 p-2">
//                 {student.totalMarks}
//               </td>
//               <td className="border border-gray-300 p-2">{student.gpa}</td>
//               <td className="border border-gray-300 p-2">{student.merit}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TabulationSheet;

import React, { useState, useEffect } from "react";

const TabulationSheet = () => {
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Mock data for subjects
    const mockSubjects = [
      { name: "Bangla 1st paper" },
      { name: "Bangla 2nd paper" },
      { name: "English 1st paper" },
      { name: "English 2nd paper" },
      { name: "Mathematics" },
    ];
    // Mock data for students
    const mockStudents = [
      {
        roll: 1,
        name: "Student A",
        scores: {
          "Bangla 1st paper": { CA: 10, MCQ: 5, PRA: 4, TO: 35, LG: 20, GP: 3 },
          "Bangla 2nd paper": { CA: 12, MCQ: 6, PRA: 5, TO: 38, LG: 22, GP: 3 },
          "English 1st paper": {
            CA: 15,
            MCQ: 8,
            PRA: 6,
            TO: 40,
            LG: 25,
            GP: 4,
          },
          "English 2nd paper": {
            CA: 14,
            MCQ: 7,
            PRA: 5,
            TO: 42,
            LG: 24,
            GP: 4,
          },
          Mathematics: { CA: 20, MCQ: 10, PRA: 8, TO: 50, LG: 30, GP: 5 },
        },
        totalMarks: 250,
        gpa: 4.8,
        merit: 1,
      },
      {
        roll: 2,
        name: "Student B",
        scores: {
          "Bangla 1st paper": { CA: 11, MCQ: 6, PRA: 5, TO: 36, LG: 21, GP: 3 },
          "Bangla 2nd paper": { CA: 13, MCQ: 7, PRA: 6, TO: 39, LG: 23, GP: 3 },
          "English 1st paper": {
            CA: 16,
            MCQ: 9,
            PRA: 7,
            TO: 41,
            LG: 26,
            GP: 4,
          },
          "English 2nd paper": {
            CA: 15,
            MCQ: 8,
            PRA: 6,
            TO: 43,
            LG: 25,
            GP: 4,
          },
          Mathematics: { CA: 18, MCQ: 9, PRA: 7, TO: 48, LG: 28, GP: 5 },
        },
        totalMarks: 247,
        gpa: 4.7,
        merit: 2,
      },
    ];

    setSubjects(mockSubjects);
    setStudents(mockStudents);
  }, []);

  const calculateCombinedTotal = (student, subject1, subject2) => {
    const total1 = student.scores[subject1]?.TO || 0;
    const total2 = student.scores[subject2]?.TO || 0;
    return total1 + total2;
  };

  return (
    <div className="overflow-auto">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Roll</th>
            <th className="border border-gray-300 p-2">Student Name</th>
            {subjects.map((subject, index) => (
              <React.Fragment key={subject.name}>
                <th colSpan={2} className="border border-gray-300 p-2">
                  {subject.name}
                </th>
                {(subject.name === "Bangla 2nd paper" ||
                  subject.name === "English 2nd paper") && (
                  <th className="border border-gray-300 p-2">Total</th>
                )}
              </React.Fragment>
            ))}
            <th className="border border-gray-300 p-2">Total Marks</th>
            <th className="border border-gray-300 p-2">GPA</th>
            <th className="border border-gray-300 p-2">Merit</th>
          </tr>
          <tr>
            {["Roll", "Student Name"].map((header) => (
              <th key={header} className="border border-gray-300 p-2"></th>
            ))}
            {subjects.map((subject) => (
              <React.Fragment key={subject.name}>
                <th className="border border-gray-300 p-2">CA/MCQ/PRA</th>
                <th className="border border-gray-300 p-2">TO/LG/GP</th>
                {(subject.name === "Bangla 2nd paper" ||
                  subject.name === "English 2nd paper") && (
                  <th className="border border-gray-300 p-2"></th>
                )}
              </React.Fragment>
            ))}
            {["Total Marks", "GPA", "Merit"].map((header) => (
              <th key={header} className="border border-gray-300 p-2"></th>
            ))}
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.roll}>
              <td className="border border-gray-300 p-2">{student.roll}</td>
              <td className="border border-gray-300 p-2">{student.name}</td>
              {subjects.map((subject) => (
                <React.Fragment key={subject.name}>
                  <td className="border border-gray-300 p-2">
                    {[
                      student.scores[subject.name]?.CA || "-",
                      student.scores[subject.name]?.MCQ || "-",
                      student.scores[subject.name]?.PRA || "-",
                    ].join("/")}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {[
                      student.scores[subject.name]?.TO || "-",
                      student.scores[subject.name]?.LG || "-",
                      student.scores[subject.name]?.GP || "-",
                    ].join("/")}
                  </td>
                  {(subject.name === "Bangla 2nd paper" ||
                    subject.name === "English 2nd paper") && (
                    <td className="border border-gray-300 p-2">
                      {calculateCombinedTotal(
                        student,
                        subject.name.split("2nd")[0] + "1st paper",
                        subject.name
                      )}
                    </td>
                  )}
                </React.Fragment>
              ))}
              <td className="border border-gray-300 p-2">
                {student.totalMarks}
              </td>
              <td className="border border-gray-300 p-2">{student.gpa}</td>
              <td className="border border-gray-300 p-2">{student.merit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TabulationSheet;

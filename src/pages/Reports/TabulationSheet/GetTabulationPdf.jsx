// import React from "react";

// const GetTabulationPdf = () => {
//   // Parse data from localStorage
//   const information = JSON.parse(localStorage.getItem("tabulation"));
//   const { Data } = information;

//   console.log("data:", Data[0].TotalResult);

//   return (
//     <div className="mt-20">
//       <div className="overflow-x-auto">
//         <table className="table-auto w-full border-collapse border border-gray-300">
//           <thead className="text-xs">
//             <tr>
//               <th
//                 rowSpan={2}
//                 className="border border-gray-300 px-2 py-1 text-center"
//               >
//                 Roll
//               </th>
//               <th
//                 rowSpan={2}
//                 className="border border-gray-300 px-2 py-1 text-center"
//               >
//                 Student Name
//               </th>
//               {Data[0].TotalResult.map((subject) => (
//                 <th
//                   key={subject}
//                   colSpan={2}
//                   className="border border-gray-300 px-2 py-1 text-center"
//                 >
//                   {subject?.subject}
//                 </th>
//               ))}
//               <th
//                 rowSpan={2}
//                 className="border border-gray-300 px-2 py-1 text-center"
//               >
//                 Total Marks & GPA
//               </th>
//               <th
//                 rowSpan={2}
//                 className="border border-gray-300 px-2 py-1 text-center"
//               >
//                 Merit
//               </th>
//             </tr>
//             <tr>
//               {Array(5)
//                 .fill(null)
//                 .map((_, index) => (
//                   <React.Fragment key={index}>
//                     <th className="border border-gray-300 px-2 py-1 text-center">
//                       <div className="grid gap-1">
//                         <span>CA</span> <span>MCQ</span> <span>PRA</span>
//                       </div>
//                     </th>
//                     <th className="border border-gray-300 px-2 py-1 text-center">
//                       <div className="grid gap-1">
//                         <span>To</span> <span>LG</span> <span>GP</span>
//                       </div>
//                     </th>
//                   </React.Fragment>
//                 ))}
//             </tr>
//           </thead>
//           <tbody className="text-xs">
//             {Data.map((student, idx) => (
//               <tr key={idx}>
//                 <td className="border border-gray-300 px-2 py-1 text-center">
//                   {student.studentInfo.roll}
//                 </td>
//                 <td className="border border-gray-300 px-2 py-1 text-left">
//                   <p>{student.studentInfo.studentName}</p>
//                   <p>Student ID: {student.studentInfo.studentId}</p>
//                   <p>
//                     Shift: {student.studentInfo.shift} | Section:{" "}
//                     {student.studentInfo.section}
//                   </p>
//                 </td>
//                 {student.TotalResult.map((subject, index) => (
//                   <React.Fragment key={index}>
//                     <td className="border border-gray-300 px-2 py-1 text-center">
//                       <div className="grid gap-1">
//                         <span>{subject.subjective || 0}</span>{" "}
//                         <span>{subject.objective || 0}</span>{" "}
//                         <span>{subject.practical || 0}</span>
//                       </div>
//                     </td>
//                     <td className="border border-gray-300 px-2 py-1 text-center">
//                       <div className="grid gap-1">
//                         <span>{subject.totalMarks || 0}</span>
//                         <span>{subject.grade || "-"}</span>
//                         <span>{subject.GP || "-"}</span>
//                       </div>
//                     </td>
//                   </React.Fragment>
//                 ))}
//                 <td className="border border-gray-300 px-2 py-1 text-center">
//                   <div className="grid gap-1">
//                     <span>{student.summary.obtainedMarks || 0}</span>
//                     <span>{student.summary.gpa || "-"}</span>
//                   </div>
//                 </td>
//                 <td className="border border-gray-300 px-2 py-1 text-center">
//                   {/* You can calculate or display merit here */}1
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default GetTabulationPdf;

// import React, { useEffect, useState } from "react";

// const GetTabulationPdf = () => {
//   const [data, setData] = useState(null);

//   // Load data from localStorage
//   useEffect(() => {
//     const storedData = localStorage.getItem("tabulation");
//     if (storedData) {
//       const parsedData = JSON.parse(storedData);
//       setData(parsedData.Data);
//     }
//   }, []);

//   if (!data) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="mt-20">
//       <div className="overflow-x-auto">
//         <table className="table-auto w-full border-collapse border border-gray-300">
//           <thead className="text-xs">
//             <tr>
//               <th
//                 rowSpan={2}
//                 className="border border-gray-300 px-2 py-1 text-center"
//               >
//                 Roll
//               </th>
//               <th
//                 rowSpan={2}
//                 className="border border-gray-300 px-2 py-1 text-center"
//               >
//                 Student Name
//               </th>
//               {data[0]?.TotalResult.map((subject, index) => (
//                 <th
//                   key={index}
//                   colSpan={2}
//                   className="border border-gray-300 px-2 py-1 text-center"
//                 >
//                   {subject.subject}
//                 </th>
//               ))}
//               <th
//                 rowSpan={2}
//                 className="border border-gray-300 px-2 py-1 text-center"
//               >
//                 Total Marks & GPA
//               </th>
//               <th
//                 rowSpan={2}
//                 className="border border-gray-300 px-2 py-1 text-center"
//               >
//                 Merit
//               </th>
//             </tr>
//             <tr>
//               {data[0]?.TotalResult.map((_, index) => (
//                 <React.Fragment key={index}>
//                   <th className="border border-gray-300 px-2 py-1 text-center">
//                     <div className="grid gap-1">
//                       <span>Cre</span> <span>MCQ</span> <span>PRA</span>
//                     </div>
//                   </th>
//                   <th className="border border-gray-300 px-2 py-1 text-center">
//                     <div className="grid gap-1">
//                       <span>To</span> <span>LG</span> <span>GP</span>
//                     </div>
//                   </th>
//                 </React.Fragment>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="text-xs">
//             {data.map((student, idx) => (
//               <tr key={idx}>
//                 <td className="border border-gray-300 px-2 py-1 text-center">
//                   {student.studentInfo.roll}
//                 </td>
//                 <td className="border border-gray-300 px-2 py-1 text-left">
//                   <p>{student.studentInfo.studentName}</p>
//                   <p>Student ID: {student.studentInfo.studentId}</p>
//                   <p>
//                     Shift: {student.studentInfo.shift} | Section:{" "}
//                     {student.studentInfo.section}
//                   </p>
//                 </td>
//                 {student.TotalResult.map((subject, index) => (
//                   <React.Fragment key={index}>
//                     <td className="border border-gray-300 px-2 py-1 text-center">
//                       <div className="grid gap-1">
//                         <span>{subject.subjective || 0}</span>
//                         <span>{subject.objective || 0}</span>
//                         <span>{subject.practical || 0}</span>
//                       </div>
//                     </td>
//                     <td className="border border-gray-300 px-2 py-1 text-center">
//                       <div className="grid gap-1">
//                         <span>{subject.totalMarks || 0}</span>
//                         <span>{subject.grade || "-"}</span>
//                         <span>{subject.GP || "-"}</span>
//                       </div>
//                     </td>
//                   </React.Fragment>
//                 ))}
//                 <td className="border border-gray-300 px-2 py-1 text-center">
//                   <div className="grid gap-1">
//                     <span>{student.summary.obtainedMarks || 0}</span>
//                     <span>{student.summary.gpa || "-"}</span>
//                   </div>
//                 </td>
//                 <td className="border border-gray-300 px-2 py-1 text-center">
//                   {idx + 1}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default GetTabulationPdf;

import React, { useEffect, useState } from "react";

const GetTabulationPdf = () => {
  const [data, setData] = useState(null);

  // Load data from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem("tabulation");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setData(parsedData.Data);
      console.log("total:", parsedData.Data);
    }
  }, []);

  console.log("data:", data);

  if (!data) {
    return <p>Loading...</p>;
  }

  // Extract unique subjects across all students
  const subjects = Array.from(
    new Set(
      data.flatMap((student) => student.TotalResult.map((sub) => sub.subject))
    )
  );
  // const result = data.filter((student) =>
  //   ["4", "5"].includes(student.studentInfo.class)
  // );
  const className = data[0].studentInfo.class;

  // console.log("data:", data);
  console.log("tabulation:", className);

  // if (!className) {
  //   return <p>Data not found!!!</p>;
  // }

  return (
    <div>
      {className === 4 || (className === 5 && <h1>Class 4 & 5</h1>)}

      <div className="mt-20">
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead className="text-xs">
              <tr>
                <th
                  rowSpan={2}
                  className="border border-gray-300 px-2 py-1 text-center"
                >
                  Roll
                </th>
                <th
                  rowSpan={2}
                  className="border border-gray-300 px-2 py-1 text-center"
                >
                  Student Name
                </th>
                {subjects.map((subject, index) => (
                  <th
                    key={index}
                    colSpan={2}
                    className="border border-gray-300 px-2 py-1 text-center"
                  >
                    {subject}
                  </th>
                ))}
                <th
                  rowSpan={2}
                  className="border border-gray-300 px-2 py-1 text-center"
                >
                  Total Marks & GPA
                </th>
                <th
                  rowSpan={2}
                  className="border border-gray-300 px-2 py-1 text-center"
                >
                  Merit
                </th>
              </tr>
              <tr>
                {subjects.map((_, index) => (
                  <React.Fragment key={index}>
                    <th className="border border-gray-300 px-2 py-1 text-center">
                      <div className="grid gap-1">
                        <span>Cre</span> <span>MCQ</span> <span>PRA</span>{" "}
                        <span>CA</span>
                      </div>
                    </th>
                    <th className="border border-gray-300 px-2 py-1 text-center">
                      <div className="grid gap-1">
                        <span>To</span> <span>LG</span> <span>GP</span>{" "}
                        <span></span>
                      </div>
                    </th>
                  </React.Fragment>
                ))}
              </tr>
            </thead>
            <tbody className="text-xs">
              {data.map((student, idx) => (
                <tr key={idx}>
                  <td className="border border-gray-300 px-2 py-1 text-center">
                    {student.studentInfo.roll}
                  </td>
                  <td className="border border-gray-300 px-2 py-1 text-left">
                    <p>{student.studentInfo.studentName}</p>
                    <p>Student ID: {student.studentInfo.studentId}</p>
                    <p>
                      Shift: {student.studentInfo.shift} | Section:{" "}
                      {student.studentInfo.section}
                    </p>
                  </td>
                  {subjects.map((subject, index) => {
                    const subjectData =
                      student.TotalResult.find(
                        (sub) => sub.subject === subject
                      ) || {};
                    return (
                      <React.Fragment key={index}>
                        <td className="border border-gray-300 px-2 py-1 text-center">
                          <div className="grid gap-1">
                            <span>{subjectData.subjective || 0}</span>
                            <span>{subjectData.objective || 0}</span>
                            <span>{subjectData.practical || 0}</span>
                            <span>{subjectData["CA(30%)"] || 0}</span>
                          </div>
                        </td>
                        <td className="border border-gray-300 px-2 py-1 text-center">
                          <div className="grid gap-1">
                            <span>{subjectData.totalMarks || 0}</span>
                            <span>{subjectData.grade || "-"}</span>
                            <span>{subjectData.GP || "-"}</span>
                            <span></span>
                          </div>
                        </td>
                      </React.Fragment>
                    );
                  })}
                  <td className="border border-gray-300 px-2 py-1 text-center">
                    <div className="grid gap-1">
                      <span>{student.summary.obtainedMarks}</span>
                      <span>{student.summary.gpa}</span>
                    </div>
                  </td>
                  <td className="border border-gray-300 px-2 py-1 text-center">
                    {student.meritPosition}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GetTabulationPdf;

// import Logo from "../../../assets/school-logo.png";
// import { useEffect, useRef, useState } from "react";
// import { useReactToPrint } from "react-to-print";

// const data = [
//   { title: "Session", value: "2024" },
//   { title: "Examination", value: "Test" },
//   { title: "Shift", value: "Morning" },
//   { title: "Class", value: "X" },
//   { title: "Section", value: "A" },
//   { title: "Group", value: "Science" },
// ];

// const FailList = () => {
//   const contentRef = useRef(null);
//   const reactToPrintFn = useReactToPrint({ contentRef });
//   const storedData = localStorage.getItem("failList");
//   const parsedData = JSON.parse(storedData);
//   console.log("failList:", parsedData);

//   return (
//     <div className="p-6">
//       <div className="flex justify-end mt-20">
//         <button
//           onClick={reactToPrintFn}
//           className="bg-blue-600 text-white px-2 py-1"
//         >
//           Print
//         </button>
//       </div>
//       <div
//         ref={contentRef}
//         className="relative max-w-full mx-auto p-6 bg-white"
//       >
//         <section className="flex justify-between items-center space-y-10">
//           <div>
//             <img
//               src={Logo}
//               alt="viddamoty school logo"
//               className="h-32 w-32 object-cover"
//             />
//           </div>
//           <div className="grid justify-items-center gap-4">
//             <h1 className="text-2xl font-bold">
//               Vidyamayee Govt. Girls High School
//             </h1>
//             <p className="text-lg font-bold">Sadar, Mymensingh</p>
//             <p className="border border-gray-400 rounded-md p-2 text-lg font-semibold text-center uppercase">
//               Merit List
//             </p>
//           </div>
//           <div className="h-60">
//             <table className="min-w-full table-auto border-collapse border border-gray-300">
//               <tbody>
//                 {data.map((row, index) => (
//                   <tr key={index} className="border border-gray-300">
//                     <td className="px-4 py-2 border border-gray-300 text-start text-sm">
//                       {row.title}
//                     </td>
//                     <td className="px-4 py-2 border border-gray-300 text-start text-sm">
//                       {row.value}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </section>
//         <div className="container mx-auto px-4">
//           <table className="min-w-full table-auto border-collapse border border-gray-200">
//             <thead>
//               <tr>
//                 <th className="border border-gray-300 px-4 py-2">Serial</th>
//                 <th className="border border-gray-300 px-4 py-2">
//                   Subject Code
//                 </th>
//                 <th className="border border-gray-300 px-4 py-2">
//                   Subject Name
//                 </th>
//                 <th className="border border-gray-300 px-4 py-2">Subjective</th>
//                 <th className="border border-gray-300 px-4 py-2">Objective</th>
//                 <th className="border border-gray-300 px-4 py-2">Practical</th>
//                 <th className="border border-gray-300 px-4 py-2">Total</th>
//                 <th className="border border-gray-300 px-4 py-2">Fail</th>
//               </tr>
//             </thead>
//             <tbody>
//               {subjects.map((subject, i) => (
//                 <tr key={i}>
//                   <td className="border border-gray-300 px-4 py-2">{i + 1}</td>
//                   <td className="border border-gray-300 px-4 py-2">
//                     {subject.subjectCode}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2">
//                     {subject.subjectName}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2">
//                     {subject.subjective}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2">
//                     {subject.objective}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2">
//                     {subject.practical}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2">
//                     {subject.total}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2">
//                     {subject.fail ? "Yes" : "No"}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FailList;

import Logo from "../../../assets/school-logo.png";
import { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import signature from "../../../assets/signature.png";

const dataInfo = [
  { title: "Session", value: "2024" },
  { title: "Examination", value: "Test" },
  { title: "Shift", value: "Morning" },
  { title: "Class", value: "X" },
  { title: "Section", value: "A" },
  { title: "Group", value: "Science" },
];

const FailList = () => {
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  // Retrieve data from localStorage
  // const storedData = localStorage.getItem("failList");
  const { data } = JSON.parse(localStorage.getItem("failList"));
  const { className, group, section, session, shift, term } = JSON.parse(
    localStorage.getItem("schoolInfo")
  );
  // console.log("first", subjectInfo);
  // const subjects = parsedData.subjects || [];
  // const subjectName = parsedData.map((subject) => {
  //   subject.subjects;
  // });
  // const results = subjectName.map((result) => result);
  console.log("failList:", data.length);
  return (
    <div className="p-6">
      <div className="flex justify-end">
        <button
          onClick={reactToPrintFn}
          className="bg-blue-600 text-white px-2 py-1"
        >
          Print
        </button>
      </div>
      <div
        ref={contentRef}
        className="relative max-w-full mx-auto bg-white p-6"
      >
        <section className="flex justify-between items-center space-y-10">
          <div>
            <img
              src={Logo}
              alt="vidyamayee school logo"
              className="h-32 w-32 object-cover"
            />
          </div>
          <div className="grid justify-items-center gap-4">
            <h1 className="text-2xl font-bold">
              Vidyamayee Govt. Girls High School
            </h1>
            <p className="text-lg font-bold">Mymensingh</p>
            <p className="border border-gray-400 rounded-md p-2 text-lg font-semibold text-center uppercase">
              Fail List
            </p>
          </div>
          <div className="h-auto">
            <div className="overflow-x-auto">
              <table className="table-auto border-collapse border border-gray-300 w-full">
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Year</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {session}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      Examination
                    </td>
                    <td className="border border-gray-300 px-4 py-2">{term}</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Class</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {className}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      Section
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {section}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Shift</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {shift}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Group</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {group}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      Fail Student
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {data?.length}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
        <div className="space-y-5">
          {data.map(({ studentInfo, subjects }, index) => (
            <div key={index} className="space-y-2">
              <div className="flex gap-5">
                <span>StudentId: {studentInfo?.studentId}</span>
                <span>Class: {studentInfo?.class}</span>
                <span>Roll: {studentInfo?.rollNo}</span>
                <span>Name: {studentInfo?.studentName}</span>
              </div>
              <table
                key={index}
                className="min-w-full table-auto border-collapse border border-gray-200"
              >
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">Serial</th>
                    <th className="border border-gray-300 px-4 py-2">
                      Subject Code
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Subject Name
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Subjective
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Objective
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Practical
                    </th>
                    <th className="border border-gray-300 px-4 py-2">CA</th>
                    <th className="border border-gray-300 px-4 py-2">Total</th>
                    <th className="border border-gray-300 px-4 py-2">Fail</th>
                  </tr>
                </thead>
                <tbody>
                  {subjects.map(
                    (subject, i) => (
                      console.log("ca:", subject),
                      (
                        <tr key={i}>
                          <td className="border border-gray-300 px-4 py-2">
                            {i + 1}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {subject?.subjectCode}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {subject?.subjectName}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {subject?.subjective}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {subject?.objective}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {subject?.practical}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {subject?.ca}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {subject?.total}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {subject?.fail}
                          </td>
                        </tr>
                      )
                    )
                  )}
                </tbody>
              </table>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 mt-16 pt-8">
          <div className="text-center flex flex-col items-center justify-end">
            <div className="border-t border-black mx-8 pt-1">
              Class Teacher's Signature
            </div>
          </div>
          <div className="text-center flex flex-col items-center justify-end">
            <img
              src={signature}
              alt="signature"
              className="w-auto h-20 object-cover"
            />
            <div className="border-t border-black mx-8 pt-1">
              Headmaster's Signature
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FailList;

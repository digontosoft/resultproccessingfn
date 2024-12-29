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

const data = [
  { title: "Session", value: "2024" },
  { title: "Examination", value: "Test" },
  { title: "Shift", value: "Morning" },
  { title: "Class", value: "X" },
  { title: "Section", value: "A" },
  { title: "Group", value: "Science" },
];

const FailList = () => {
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ content: () => contentRef.current });

  // Retrieve data from localStorage
  // const storedData = localStorage.getItem("failList");
  const { data } = JSON.parse(localStorage.getItem("failList"));
  // console.log("first", subjectInfo);
  // const subjects = parsedData.subjects || [];
  // const subjectName = parsedData.map((subject) => {
  //   subject.subjects;
  // });
  // const results = subjectName.map((result) => result);
  // console.log("subjects:", subjectName);
  return (
    <div className="p-6">
      <div className="flex justify-end mt-20">
        <button
          onClick={reactToPrintFn}
          className="bg-blue-600 text-white px-2 py-1"
        >
          Print
        </button>
      </div>
      <div
        ref={contentRef}
        className="relative max-w-full mx-auto p-6 bg-white"
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
            <p className="text-lg font-bold">Sadar, Mymensingh</p>
            <p className="border border-gray-400 rounded-md p-2 text-lg font-semibold text-center uppercase">
              Merit List
            </p>
          </div>
          {/* <div className="h-60">
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <tbody>
                {data.map((row, index) => (
                  <tr key={index} className="border border-gray-300">
                    <td className="px-4 py-2 border border-gray-300 text-start text-sm">
                      {row.title}
                    </td>
                    <td className="px-4 py-2 border border-gray-300 text-start text-sm">
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> */}
        </section>
        <div className="container mx-auto px-4">
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
                    <th className="border border-gray-300 px-4 py-2">Total</th>
                    <th className="border border-gray-300 px-4 py-2">Fail</th>
                  </tr>
                </thead>
                <tbody>
                  {subjects.map(
                    (subject, i) => (
                      console.log("first", subject?.subjectCode),
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
      </div>
    </div>
  );
};

export default FailList;

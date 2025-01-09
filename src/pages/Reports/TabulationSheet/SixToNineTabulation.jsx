import React, { useEffect, useRef, useState } from "react";
import FourToFiveTabulation from "./FourToFiveTabulation";
import { useReactToPrint } from "react-to-print";
import { transcriptData } from "../../results/transcript/transcriptData";

const SixToNineTabulation = () => {
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [data, setData] = useState(null);
  const [schoolInfo, setSchoolInfo] = useState(null);

  // Load data from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem("tabulation");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setData(parsedData.Data);
      console.log("tabulation:", parsedData);
    }
    const storedSchoolInfo = localStorage.getItem("tabulation-schoolInfo");
    if (storedSchoolInfo) {
      const parsedSchoolInfo = JSON.parse(storedSchoolInfo);
      setSchoolInfo(parsedSchoolInfo);
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
  console.log(data.length);

  // const result = data.filter((student) =>
  //   ["4", "5"].includes(student.studentInfo.class)
  // );
  const className = data[0].studentInfo.class;

  // console.log("data:", data);
  // console.log("tabulation:", className);

  const {
    session,
    term,
    className: classNameT,
    section,
    group,
    shift,
  } = schoolInfo;
  return (
    <div className="mt-20">
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
        className="relative max-w-full mx-auto p-6 bg-white "
      >
        <div className="mb-8 flex flex-col items-center">
          <h1 className="text-xl font-bold">{transcriptData.school.name}</h1>
          <p className="text-lg font-semibold">Mymensingh</p>
          <img
            src="/vidyamoyee_logo.png"
            alt="school logo"
            width={80}
            height={80}
            className=""
          />
          <h2 className="text-lg font-semibold border-[1px] border-black px-2 rounded-md">
            ACADEMIC TRANSCRIPT
          </h2>
          <p className="text-md font-semibold">
            {term}, {session}
          </p>
        </div>
        {/* Grade Scale */}
        <div className="text-xs mb-6 absolute top-4 right-4">
          <div className="overflow-x-auto">
            {/* <table className="table-auto border-collapse border border-gray-300 w-full text-left">
                     <tbody>
                       <tr className="border-b">
                         <td className="px-4 py-2 font-semibold">Session</td>
                         <td className="px-4 py-2">{session}</td>
                       </tr>
                       <tr className="border-b">
                         <td className="px-4 py-2 font-semibold">Term</td>
                         <td className="px-4 py-2">{term}</td>
                       </tr>
                       <tr className="border-b">
                         <td className="px-4 py-2 font-semibold">Shift</td>
                         <td className="px-4 py-2">{shift}</td>
                       </tr>
                       <tr className="border-b">
                         <td className="px-4 py-2 font-semibold">Section</td>
                         <td className="px-4 py-2">{section}</td>
                       </tr>
                       <tr className="border-b">
                         <td className="px-4 py-2 font-semibold">Group</td>
                         <td className="px-4 py-2">{group}</td>
                       </tr>
                       <tr>
                         <td className="px-4 py-2 font-semibold">Class Name</td>
                         <td className="px-4 py-2">{classNameT}</td>
                       </tr>
                     </tbody>
                   </table> */}
            <table className="table-auto border-collapse border border-gray-300 w-full text-left">
              <tbody>
                <tr className="border-b">
                  <td className="px-4 py-2 font-semibold">Session</td>
                  <td className="px-4 py-2 border-l border-gray-300">
                    {session}
                  </td>{" "}
                  {/* Border added */}
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-semibold">Term</td>
                  <td className="px-4 py-2 border-l border-gray-300">
                    {term}
                  </td>{" "}
                  {/* Border added */}
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-semibold">Shift</td>
                  <td className="px-4 py-2 border-l border-gray-300">
                    {shift}
                  </td>{" "}
                  {/* Border added */}
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-semibold">Section</td>
                  <td className="px-4 py-2 border-l border-gray-300">
                    {section}
                  </td>{" "}
                  {/* Border added */}
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-semibold">Group</td>
                  <td className="px-4 py-2 border-l border-gray-300">
                    {group}
                  </td>{" "}
                  {/* Border added */}
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Class Name</td>
                  <td className="px-4 py-2 border-l border-gray-300">
                    {classNameT}
                  </td>{" "}
                  {/* Border added */}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
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

export default SixToNineTabulation;

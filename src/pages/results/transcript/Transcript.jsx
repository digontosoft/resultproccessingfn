import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { transcriptData } from "./transcriptData";
import axios from "axios";

// Main Component
const Transcript = () => {
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [results, setResults] = useState([]);
  const url = import.meta.env.VITE_SERVER_BASE_URL;

  const {
    Data: { studentInfo, TotalResult },
  } = JSON.parse(localStorage.getItem("result"));
  console.log({ TotalResult });

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`${url}/result/get_all`);
        setResults(response.data.data); // Assuming API returns data in `data.data`
        console.log("results", response.data.data);
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };

    fetchResults();
  }, [url]);

  return (
    <>
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
        className="relative max-w-4xl mx-auto p-6 bg-white "
      >
        <div className="mb-8 flex flex-col items-center">
          <h1 className="text-xl font-bold">{transcriptData.school.name}</h1>
          <p className="text-lg font-semibold">Sadar Mymensingh</p>
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
          <p className="text-md font-semibold">Pre-Test, 2024</p>
        </div>

        {/* Student Information */}
        <div className="">
          <div>
            <p>
              <span className="font-semibold">Student ID:</span>{" "}
              {studentInfo.studentId}
            </p>
            <p>
              <span className="font-semibold">Name:</span>{" "}
              {studentInfo.firstName} {studentInfo.lastName}
            </p>
          </div>

          <div className="mt-4 flex flex-wrap justify-between">
            <p>
              <span className="font-semibold">Class:</span> {studentInfo.class}
            </p>
            <p>
              <span className="font-semibold">Section:</span>{" "}
              {studentInfo.section}
            </p>

            <p>
              <span className="font-semibold">Group:</span> {studentInfo.group}
            </p>
            <p>
              <span className="font-semibold">Roll:</span> {studentInfo?.roll}
            </p>
            <p>
              <span className="font-semibold">Merit:</span> {studentInfo?.merit}
            </p>
            <p>
              <span className="font-semibold">Type:</span>{" "}
              {transcriptData.student.studentType}
            </p>
            <p>
              <span className="font-semibold">
                4<sup>th</sup> Subject:
              </span>{" "}
              {transcriptData.student.fourthSubject}
            </p>
          </div>
        </div>

        {/* Grade Scale */}
        <div className="text-xs mb-6 absolute top-4 right-4">
          <div className="overflow-x-auto">
            <table className="min-w-full border">
              <thead>
                <tr className="">
                  <th className="border">Grade</th>
                  <th className="border">Marks</th>
                  <th className="border">GP</th>
                </tr>
              </thead>
              <tbody>
                {transcriptData.gradeScale.map((grade, index) => (
                  <tr key={index}>
                    <td className="border px-1 text-center">{grade.grade}</td>
                    <td className="border px-1 text-center">{grade.marks}</td>
                    <td className="border px-1 text-center">{grade.gp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Results Table */}
        <div className="text-sm mb-6 overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-1 py-1">Subjects</th>
                <th className="border px-1 py-1">Full Marks</th>
                <th className="border px-1 py-1">Subjective</th>
                <th className="border px-1 py-1">Objective</th>
                <th className="border px-1 py-1">Practical</th>
                <th className="border px-1 py-1">80%</th>
                <th className="border px-1 py-1">CA(20%)</th>
                <th className="border px-1 py-1">Total(100%)</th>
                <th className="border px-1 py-1">LG</th>
                <th className="border px-1 py-1">GP</th>
                <th className="border px-1 py-1">Highest</th>
              </tr>
            </thead>
            <tbody>
              {TotalResult.map((result, index) => (
                <tr key={index}>
                  <td className="border px-1 py-1">{result.subject}</td>
                  <td className="border px-1 py-1 text-center">
                    {result.fullMarks}
                  </td>
                  <td className="border px-1 py-1 text-center">
                    {result.subjective}
                  </td>
                  <td className="border px-1 py-1 text-center">
                    {result.objective}
                  </td>
                  <td className="border px-1 py-1 text-center">
                    {result.practical}
                  </td>
                  <td className="border px-1 py-1 text-center">
                    {result["80%"]}
                  </td>
                  <td className="border px-1 py-1 text-center">
                    {result["CA(20%)"]}
                  </td>
                  <td className="border px-1 py-1 text-center">
                    {result.totalMarks}
                  </td>
                  <td className="border px-1 py-1 text-center">
                    {result.grade}
                  </td>
                  <td className="border px-1 py-1 text-center">{result.GP}</td>
                  <td className="border px-1 py-1 text-center">
                    {result.Highest}
                  </td>
                </tr>
              ))}

              {/* Totla marks row */}
              <tr>
                <td className="border px-1 py-1 font-semibold text-right ">
                  Total Marks:
                </td>
                <td className="border px-1 py-1 text-center">
                  {transcriptData.summary.totalMarks}
                </td>
                <td className="border px-1 py-1 text-center"></td>
                <td className="border px-1 py-1 text-center"></td>
                <td className="border px-1 py-1 text-center"></td>
                <td className="border px-1 py-1 text-center">
                  {transcriptData.summary.obtainedMarks}
                </td>
                <td className="border px-1 py-1 text-center"></td>
                <td className="border px-1 py-1 text-center"></td>
                <td className="border px-1 py-1 text-center"></td>
                <td className="border px-1 py-1 text-center"></td>
                <td className="border px-1 py-1 text-center"></td>
              </tr>

              {/* Working days row */}
              <tr>
                <td className="border px-1 py-1 font-semibold text-right ">
                  Working days:
                </td>
                <td className="border px-1 py-1 text-center">
                  {/* Working days count here */}
                </td>
                <td className="border px-1 py-1 font-semibold text-right">
                  Present:
                </td>
                <td className="border px-1 py-1 text-center"></td>
                <td className="border px-1 py-1 font-semibold text-right ">
                  {/* Present count here */}
                </td>
                <td className="border px-1 py-1 text-center">Max. Present:</td>
                <td className="border px-1 py-1 text-center">
                  {/* Max. Present count here */}
                </td>
                <td className="border px-1 py-1 text-center"></td>
                <td className="border px-1 py-1 text-center"></td>
                <td className="border px-1 py-1 text-center"></td>
                <td className="border px-1 py-1 text-center"></td>
              </tr>

              {/* summary of results */}
              <tr>
                <td className="border px-1 py-1 font-semibold text-right ">
                  No. of Students:
                </td>
                <td className="border px-1 py-1 text-center">
                  {transcriptData.summary.studentsCount}
                </td>
                <td className="border px-1 py-1 font-semibold text-right">
                  GPA Without 4th:
                </td>
                <td className="border px-1 py-1 text-center">
                  {transcriptData.summary.gpaWithout4th}
                </td>
                <td className="border px-1 py-1 font-semibold text-right">
                  GPA:
                </td>
                <td className="border px-1 py-1 text-center">
                  {transcriptData.summary.gpa}
                </td>
                <td className="border py-1 font-semibold text-right">
                  Remark:
                </td>
                <td colSpan={4}>Good</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-3 gap-4 mt-16 pt-8">
          <div className="text-center">
            <div className="border-t border-black mx-8 pt-1">
              Guardian's Signature
            </div>
          </div>
          <div className="text-center">
            <div className="border-t border-black mx-8 pt-1">
              Class Teacher's Signature
            </div>
          </div>
          <div className="text-center">
            <div className="border-t border-black mx-8 pt-1">
              Headmaster's Signature
            </div>
          </div>
        </div>

        {/* Print Date */}
        <div className="text-sm text-gray-500 mt-8">
          Printing Date & Time: 18 August, 2024 09:18:25 AM
        </div>
      </div>
    </>
  );
};

export default Transcript;

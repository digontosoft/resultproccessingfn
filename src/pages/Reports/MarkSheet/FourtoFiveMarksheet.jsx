import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import signature from "../../../assets/signature.png";
import { transcriptData } from "../../results/transcript/transcriptData";
const FourtoFiveMarksheet = () => {
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const { shift, session, term } = JSON.parse(
    localStorage.getItem("schoolInfo")
  );
  const { Data } = JSON.parse(localStorage.getItem("withoutMerge"));
  console.log("marksheet", Data);

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
        className="relative max-w-full mx-auto py-6 px-1 bg-white printable-content"
      >
        {Data.map(
          ({ studentInfo, TotalResult, summary, meritPosition }, index) => (
            <div key={index} className="min-h-screen">
              <div className="flex justify-between w-full">
                <div className="mb-8 flex flex-col items-center mx-auto">
                  <h1 className="text-xl font-bold">
                    {transcriptData.school.name}
                  </h1>
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
                <div className="text-xs mb-6">
                  <div className="overflow-x-auto">
                    <table className="min-w-full border">
                      <thead>
                        <tr>
                          <th className="border">Grade</th>
                          <th className="border">Marks</th>
                          <th className="border">GP</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transcriptData.gradeScale.map((grade, index) => (
                          <tr key={index}>
                            <td className="border px-1 text-center">
                              {grade.grade}
                            </td>
                            <td className="border px-1 text-center">
                              {grade.marks}
                            </td>
                            <td className="border px-1 text-center">
                              {grade.gp}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="">
                <div>
                  <p>
                    <span className="font-semibold">Student ID:</span>{" "}
                    {studentInfo?.studentId}
                  </p>
                  <p>
                    <span className="font-semibold">Name:</span>{" "}
                    {studentInfo.studentName}
                  </p>
                  <p>
                    <span className="font-semibold">Father's Name:</span>{" "}
                    {studentInfo.fatherName}
                  </p>
                  <p>
                    <span className="font-semibold">Mother's Name:</span>{" "}
                    {studentInfo?.motherName}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap justify-between">
                  <p>
                    <span className="font-semibold">Class:</span>{" "}
                    {studentInfo.class}
                  </p>
                  <p>
                    <span className="font-semibold">Section:</span>{" "}
                    {studentInfo.section}
                  </p>
                  <p>
                    <span className="font-semibold">Shift:</span>{" "}
                    {studentInfo.shift}
                  </p>

                  <p>
                    <span className="font-semibold">Group:</span>{" "}
                    {studentInfo.group}
                  </p>
                  <p>
                    <span className="font-semibold">Roll:</span>{" "}
                    {studentInfo?.roll}
                  </p>
                  <p>
                    <span className="font-semibold">Merit:</span>{" "}
                    {meritPosition}
                  </p>
                  <p>
                    <span className="font-semibold">Type:</span>{" "}
                    {transcriptData.student.studentType}
                  </p>
                </div>
              </div>

              {/* Results Table */}
              <div className="text-xs mb-6 overflow-hidden flex">
                <table className="w-full border">
                  <thead>
                    <tr className="text-center">
                      <th colSpan="7" className="text-center">
                        {term}
                      </th>
                    </tr>
                    <tr>
                      <th className="border px-1 py-1">Subjects</th>
                      <th className="border px-1 py-1">Full Marks</th>
                      <th className="border px-1 py-1">Subjective</th>
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
                          {result.totalMarks}
                        </td>
                        <td className="border px-1 py-1 text-center">
                          {result.grade}
                        </td>
                        <td className="border px-1 py-1 text-center">
                          {result.GP}
                        </td>
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
                        {summary?.totalMarks}
                      </td>
                      <td className="border px-1 py-1 text-center"></td>
                      <td className="border px-1 py-1 text-center">
                        {summary?.obtainedMarks}
                      </td>
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
                      <td className="border px-1 py-1 text-center">
                        Max. Present:
                      </td>
                      <td className="border px-1 py-1 text-center">
                        {/* Max. Present count here */}
                      </td>
                    </tr>

                    {/* summary of results */}
                    <tr>
                      <td className="border px-1 py-1 font-semibold text-right ">
                        No. of Students:
                      </td>
                      <td className="border px-1 py-1 text-center">
                        {summary.studentsCount}
                      </td>
                      <td className="border px-1 py-1 font-semibold text-right">
                        GPA:
                      </td>
                      <td className="border px-1 py-1 text-center">
                        {summary?.gpa}
                      </td>
                      {/* <td className="border px-1 py-1 text-center"></td> */}
                      <td className="border py-1 font-semibold text-right">
                        Remark:
                      </td>
                      <td colSpan={4} className="text-center">
                        {summary?.remark}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Signature and Footer */}
              <div className="grid grid-cols-3 gap-4 mt-16 pt-8">
                <div className="text-center flex flex-col items-center justify-end">
                  <div className="border-t border-black mx-8 pt-1">
                    Guardian's Signature
                  </div>
                </div>
                <div className="text-center flex flex-col items-center justify-end">
                  <div className="border-t border-black mx-8 pt-1">
                    Class Teacher's Signature
                  </div>
                </div>
                <div className="text-center flex flex-col items-center justify-end">
                  <img
                    src={signature}
                    alt="signature"
                    className="w-auto h-12 object-cover"
                  />
                  <div className="border-t border-black mx-8 pt-1">
                    Headmaster's Signature
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default FourtoFiveMarksheet;

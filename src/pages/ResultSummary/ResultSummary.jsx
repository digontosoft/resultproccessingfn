// const data = [
//   { serial: 1, information: "Class A", numberOfStudents: 30, percentage: 75 },
//   { serial: 2, information: "Class B", numberOfStudents: 25, percentage: 62.5 },
//   { serial: 3, information: "Class C", numberOfStudents: 20, percentage: 50 },

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Logo from "../../assets/school-logo.png";
import signature from "../../assets/signature.png";
// ];
const ResultSummary = () => {
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const {
    data: {
      totalStudents,
      totalExaminees,
      totalPassed,
      totalFailed,
      passPercentage,
      gpaBreakdown,
      gpaPercentages,
      failPercentage,
      classInfo,
    },
  } = JSON.parse(localStorage.getItem("resultSummary"));
  // console.log("resultSummary", data);
  return (
    <div>
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
        className="relative max-w-full mx-auto bg-white p-6 space-y-5"
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
              Result Summary
            </p>
          </div>
          <div className="h-auto">
            <div className="overflow-x-auto">
              <table className="table-auto border-collapse border border-gray-300 w-full">
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Year</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {classInfo?.session}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      Examination
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {classInfo?.term}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Class</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {classInfo?.className}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">
                      Section
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {classInfo?.section}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Shift</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {classInfo?.shift}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Group</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {classInfo?.group}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Serial</th>
                <th className="border border-gray-300 px-4 py-2">
                  Information
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Number of Students
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Percentage (%)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2 text-center">
                  1
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  Examinee
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {totalExaminees}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {(totalExaminees / totalStudents) * 100}%
                </td>
              </tr>
              <tr className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2 text-center">
                  2
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  Absent
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  0
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  0%
                </td>
              </tr>
              <tr className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2 text-center">
                  3
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  Passed
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {totalPassed}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {passPercentage}%
                </td>
              </tr>
              <tr className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2 text-center">
                  4
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  Not Passed
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {totalFailed}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {failPercentage}%
                </td>
              </tr>
              <tr className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2 text-center">
                  5
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  GPA 5
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {gpaBreakdown["GPA 5.00"]}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {gpaPercentages["GPA 5.00"]}%
                </td>
              </tr>
              <tr className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2 text-center">
                  6
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  GPA 4
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {gpaBreakdown["GPA 4.00-4.99"]}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {gpaPercentages["GPA 4.00-4.99"]}%
                </td>
              </tr>
              <tr className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2 text-center">
                  7
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  GPA 3.50-3.99
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {gpaBreakdown["GPA 3.50-3.99"]}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {gpaPercentages["GPA 3.50-3.99"]}%
                </td>
              </tr>
              <tr className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2 text-center">
                  8
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  GPA 3.00-3.49
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {gpaBreakdown["GPA 3.00-3.49"]}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {gpaPercentages["GPA 3.00-3.49"]}%
                </td>
              </tr>
              <tr className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2 text-center">
                  9
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  GPA 2.00-2.99
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {gpaBreakdown["GPA 2.00-2.99"]}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {gpaPercentages["GPA 2.00-2.99"]}%
                </td>
              </tr>
              <tr className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2 text-center">
                  10
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  Below GPA 2
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {gpaBreakdown["Below GPA 2.00"]}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {gpaPercentages["Below GPA 2.00"]}%
                </td>
              </tr>
            </tbody>
          </table>
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

export default ResultSummary;

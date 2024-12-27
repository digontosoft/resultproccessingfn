import React from "react";

const GetTabulationPdf = () => {
  // Parse data from localStorage
  const information = JSON.parse(localStorage.getItem("tabulation"));
  const { Data } = information;

  console.log("data:", Data[0].TotalResult);

  return (
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
              {Data[0].TotalResult.map((subject) => (
                <th
                  key={subject}
                  colSpan={2}
                  className="border border-gray-300 px-2 py-1 text-center"
                >
                  {subject?.subject}
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
              {Array(5)
                .fill(null)
                .map((_, index) => (
                  <React.Fragment key={index}>
                    <th className="border border-gray-300 px-2 py-1 text-center">
                      <div className="grid gap-1">
                        <span>CA</span> <span>MCQ</span> <span>PRA</span>
                      </div>
                    </th>
                    <th className="border border-gray-300 px-2 py-1 text-center">
                      <div className="grid gap-1">
                        <span>To</span> <span>LG</span> <span>GP</span>
                      </div>
                    </th>
                  </React.Fragment>
                ))}
            </tr>
          </thead>
          <tbody className="text-xs">
            {Data.map((student, idx) => (
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
                {student.TotalResult.map((subject, index) => (
                  <React.Fragment key={index}>
                    <td className="border border-gray-300 px-2 py-1 text-center">
                      <div className="grid gap-1">
                        <span>{subject.subjective || 0}</span>{" "}
                        <span>{subject.objective || 0}</span>{" "}
                        <span>{subject.practical || 0}</span>
                      </div>
                    </td>
                    <td className="border border-gray-300 px-2 py-1 text-center">
                      <div className="grid gap-1">
                        <span>{subject.totalMarks || 0}</span>
                        <span>{subject.grade || "-"}</span>
                        <span>{subject.GP || "-"}</span>
                      </div>
                    </td>
                  </React.Fragment>
                ))}
                <td className="border border-gray-300 px-2 py-1 text-center">
                  <div className="grid gap-1">
                    <span>{student.summary.obtainedMarks || 0}</span>
                    <span>{student.summary.gpa || "-"}</span>
                  </div>
                </td>
                <td className="border border-gray-300 px-2 py-1 text-center">
                  {/* You can calculate or display merit here */}1
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetTabulationPdf;

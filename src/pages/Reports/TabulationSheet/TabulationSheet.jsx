const TabulationSheet = () => {
  return (
    <div>
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
              {[
                "Bengali 1st Paper",
                "Bengali 2nd Paper",
                "English 1st Paper",
                "English 2nd Paper",
                "Mathematics",
              ].map((subject) => (
                <th
                  key={subject}
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
              {Array(5)
                .fill(null)
                .map((_, index) => (
                  <>
                    <th
                      key={`ca-mcq-pra-${index}`}
                      className="border border-gray-300 px-2 py-1 text-center"
                    >
                      <div className="grid gap-1">
                        <span>CA</span> <span>MCQ</span> <span>PRA</span>
                      </div>
                    </th>
                    <th
                      key={`to-lg-gp-${index}`}
                      className="border border-gray-300 px-2 py-1 text-center"
                    >
                      <div className="grid gap-1">
                        <span>To</span> <span>LG</span> <span>GP</span>
                      </div>
                    </th>
                  </>
                ))}
            </tr>
          </thead>
          <tbody className="text-xs">
            {[
              {
                roll: 1,
                name: "Ahnaf Zahin",
                studentId: "231702",
                shift: "Morning",
                section: "A",
                subjects: [
                  { ca: 10, mcq: 15, pra: 2, total: 27, lg: "A+", gp: 5.0 },
                  { ca: 12, mcq: 10, pra: 5, total: 27, lg: "A+", gp: 5.0 },
                  { ca: 8, mcq: 13, pra: 4, total: 25, lg: "A", gp: 4.5 },
                  { ca: 9, mcq: 12, pra: 3, total: 24, lg: "A", gp: 4.0 },
                  { ca: 11, mcq: 14, pra: 4, total: 29, lg: "A+", gp: 5.0 },
                ],
                totalMarks: 500,
                gpa: "5.0",
                merit: 1,
              },
              {
                roll: 2,
                name: "John Doe",
                studentId: "123456",
                shift: "Day",
                section: "B",
                subjects: [
                  { ca: 9, mcq: 12, pra: 3, total: 24, lg: "A", gp: 4.0 },
                  { ca: 10, mcq: 14, pra: 4, total: 28, lg: "A+", gp: 5.0 },
                  { ca: 11, mcq: 13, pra: 5, total: 29, lg: "A+", gp: 5.0 },
                  { ca: 12, mcq: 10, pra: 4, total: 26, lg: "A", gp: 4.5 },
                  { ca: 8, mcq: 15, pra: 3, total: 26, lg: "A", gp: 4.5 },
                ],
                totalMarks: 470,
                gpa: "4.5",
                merit: 2,
              },
            ].map((student, idx) => (
              <tr key={idx}>
                <td className="border border-gray-300 px-2 py-1 text-center">
                  {student.roll}
                </td>
                <td className="border border-gray-300 px-2 py-1 text-left">
                  <p>{student.name}</p>
                  <p>Student ID: {student.studentId}</p>
                  <p>
                    Shift: {student.shift} | Section: {student.section}
                  </p>
                </td>
                {student.subjects.map((subject, index) => (
                  <>
                    <td
                      key={`ca-mcq-pra-${index}`}
                      className="border border-gray-300 px-2 py-1 text-center"
                    >
                      <div className="grid gap-1">
                        <span>{subject.ca}</span> <span>{subject.mcq}</span>{" "}
                        <span>{subject.pra}</span>
                      </div>
                    </td>
                    <td
                      key={`to-lg-gp-${index}`}
                      className="border border-gray-300 px-2 py-1 text-center"
                    >
                      <div className="grid gap-1">
                        <span>{subject.total}</span>
                        <span> {subject.lg}</span>
                        <span> {subject.gp}</span>
                      </div>
                    </td>
                  </>
                ))}
                <td className="border border-gray-300 px-2 py-1 text-center">
                  <div className="grid gap-1">
                    <span>{student.totalMarks}</span>
                    <span>{student.gpa}</span>
                  </div>
                </td>
                <td className="border border-gray-300 px-2 py-1 text-center">
                  {student.merit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TabulationSheet;

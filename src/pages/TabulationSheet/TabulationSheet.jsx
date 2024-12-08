const data = [
  { title: "Session", value: "2024" },
  { title: "Examination", value: "Test" },
  { title: "Shift", value: "Morning" },
  { title: "Class", value: "X" },
  { title: "Section", value: "A" },
  { title: "Group", value: "Science" },
];
// const students = [
//   {
//     roll: 1,
//     name: "Ahnaf Zahin",
//     studentId: "231702",
//     shift: "Morning",
//     section: "A",
//     subjects: [
//       {
//         name: "Bengali 1st Paper",
//         cre: 27,
//         mcq: 25,
//         total: 52,
//         lg: "A+",
//         gp: 5.0,
//       },
//       // Add other subjects
//     ],
//     totalMarks: 500,
//     gpa: "5.0",
//     merit: 1,
//   },
//   // Add more students...
// ];

import { PDFViewer } from "@react-pdf/renderer";
import Logo from "../../assets/school-logo.png";
import TabulationPdf from "./TabulationPdf";
const TabulationSheet = () => {
  return (
    <div>
      <div className="w-full h-auto min-h-180 border rounded-md">
        <div className="p-4 border-b">
          <span className="text-2xl font-semibold leading-normal">
            Tabulation Sheet
          </span>
        </div>
        <PDFViewer width="100%" height="600">
          <TabulationPdf />
        </PDFViewer>
      </div>

      <section className="flex justify-between items-center space-y-10">
        <div>
          <img
            src={Logo}
            alt="viddamoty school logo"
            className="h-32 w-32 object-cover"
          />
        </div>
        <div className="grid justify-items-center gap-4">
          <h1 className="text-2xl font-bold">
            Vidyamayee Govt. Girls High School
          </h1>
          <p className="text-lg font-bold">Sadar, Mymensingh</p>
          <p className="border border-gray-400 rounded-md p-2 text-lg font-semibold text-center uppercase">
            Tabulation Sheet
          </p>
        </div>
        <div className="h-60">
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
        </div>
      </section>
      <div className="overflow-x-auto">
        {/* Table */}
        <table className="table-auto w-full border-collapse border border-gray-300">
          {/* Header */}
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
              <th
                className="border border-gray-300 px-2 py-1 text-center"
                colSpan={2}
              >
                Bengali 1st Paper
              </th>
              <th
                className="border border-gray-300 px-2 py-1 text-center"
                colSpan={2}
              >
                Bengali 2nd Paper
              </th>
              <th
                className="border border-gray-300 px-2 py-1 text-center"
                colSpan={2}
              >
                Total
              </th>
              <th
                className="border border-gray-300 px-2 py-1 text-center"
                colSpan={2}
              >
                English 1st Paper
              </th>
              <th
                className="border border-gray-300 px-2 py-1 text-center"
                colSpan={2}
              >
                English 2nd Paper
              </th>
              <th
                className="border border-gray-300 px-2 py-1 text-center"
                colSpan={2}
              >
                Total
              </th>
              <th
                className="border border-gray-300 px-2 py-1 text-center"
                colSpan={2}
              >
                Mathemetics
              </th>
              <th
                className="border border-gray-300 px-2 py-1 text-center"
                colSpan={2}
              >
                Islam and Moral Education
              </th>
              <th
                className="border border-gray-300 px-2 py-1 text-center"
                colSpan={2}
              >
                Hindu Religion and Moral Education
              </th>
              <th
                className="border border-gray-300 px-2 py-1 text-center"
                colSpan={2}
              >
                Higher Mathemetics
              </th>
              <th
                className="border border-gray-300 px-2 py-1 text-center"
                colSpan={2}
              >
                Physics
              </th>
              <th
                className="border border-gray-300 px-2 py-1 text-center"
                colSpan={2}
              >
                Chemistry
              </th>
              <th
                className="border border-gray-300 px-2 py-1 text-center"
                colSpan={2}
              >
                Biology
              </th>
              <th
                className="border border-gray-300 px-2 py-1 text-center"
                colSpan={2}
              >
                Bangladesh And Global Studies
              </th>
              <th
                className="border border-gray-300 px-2 py-1 text-center"
                colSpan={2}
              >
                Information And Communication Technology
              </th>
              <th
                className="border border-gray-300 px-2 py-1 text-center"
                rowSpan={2}
              >
                Total Marks & GPA
              </th>
              <th
                className="border border-gray-300 px-2 py-1 text-center"
                rowSpan={2}
              >
                Merit
              </th>
              {/* Additional headers... */}
            </tr>
            <tr>
              {/* Sub-headers for Bengali 1st Paper */}
              <th className="px-2 py-1 text-center">
                <div className="grid gap-1">
                  <span>Cre</span> <span>MCQ</span> <span>Pra</span>
                </div>
              </th>
              <th className="border border-gray-300 px-2 py-1 text-center">
                <div className="grid gap-1">
                  <span>To</span> <span>LG</span> <span>GP</span>
                </div>
              </th>
              <th className="px-2 py-1 text-center">
                <div className="grid gap-1">
                  <span>Cre</span> <span>MCQ</span> <span>Pra</span>
                </div>
              </th>
              <th className="border border-gray-300 px-2 py-1 text-center">
                <div className="grid gap-1">
                  <span>To</span> <span>LG</span> <span>GP</span>
                </div>
              </th>
              <th className="px-2 py-1 text-center">
                <div className="grid gap-1">
                  <span>Cre</span> <span>MCQ</span> <span>Pra</span>
                </div>
              </th>
              <th className="border border-gray-300 px-2 py-1 text-center">
                <div className="grid gap-1">
                  <span>To</span> <span>LG</span> <span>GP</span>
                </div>
              </th>
              <th className="px-2 py-1 text-center">
                <div className="grid gap-1">
                  <span>Cre</span> <span>MCQ</span> <span>Pra</span>
                </div>
              </th>
              <th className="border border-gray-300 px-2 py-1 text-center">
                <div className="grid gap-1">
                  <span>To</span> <span>LG</span> <span>GP</span>
                </div>
              </th>
              <th className="px-2 py-1 text-center">
                <div className="grid gap-1">
                  <span>Cre</span> <span>MCQ</span> <span>Pra</span>
                </div>
              </th>
              <th className="border border-gray-300 px-2 py-1 text-center">
                <div className="grid gap-1">
                  <span>To</span> <span>LG</span> <span>GP</span>
                </div>
              </th>
              <th className="px-2 py-1 text-center">
                <div className="grid gap-1">
                  <span>Cre</span> <span>MCQ</span> <span>Pra</span>
                </div>
              </th>
              <th className="border border-gray-300 px-2 py-1 text-center">
                <div className="grid gap-1">
                  <span>To</span> <span>LG</span> <span>GP</span>
                </div>
              </th>
              <th className="px-2 py-1 text-center">
                <div className="grid gap-1">
                  <span>Cre</span> <span>MCQ</span> <span>Pra</span>
                </div>
              </th>
              <th className="border border-gray-300 px-2 py-1 text-center">
                <div className="grid gap-1">
                  <span>To</span> <span>LG</span> <span>GP</span>
                </div>
              </th>
              <th className="px-2 py-1 text-center">
                <div className="grid gap-1">
                  <span>Cre</span> <span>MCQ</span> <span>Pra</span>
                </div>
              </th>
              <th className="border border-gray-300 px-2 py-1 text-center">
                <div className="grid gap-1">
                  <span>To</span> <span>LG</span> <span>GP</span>
                </div>
              </th>
              <th className="px-2 py-1 text-center">
                <div className="grid gap-1">
                  <span>Cre</span> <span>MCQ</span> <span>Pra</span>
                </div>
              </th>
              <th className="border border-gray-300 px-2 py-1 text-center">
                <div className="grid gap-1">
                  <span>To</span> <span>LG</span> <span>GP</span>
                </div>
              </th>
              <th className="px-2 py-1 text-center">
                <div className="grid gap-1">
                  <span>Cre</span> <span>MCQ</span> <span>Pra</span>
                </div>
              </th>
              <th className="border border-gray-300 px-2 py-1 text-center">
                <div className="grid gap-1">
                  <span>To</span> <span>LG</span> <span>GP</span>
                </div>
              </th>
              <th className="px-2 py-1 text-center">
                <div className="grid gap-1">
                  <span>Cre</span> <span>MCQ</span> <span>Pra</span>
                </div>
              </th>
              <th className="border border-gray-300 px-2 py-1 text-center">
                <div className="grid gap-1">
                  <span>To</span> <span>LG</span> <span>GP</span>
                </div>
              </th>
              <th className="px-2 py-1 text-center">
                <div className="grid gap-1">
                  <span>Cre</span> <span>MCQ</span> <span>Pra</span>
                </div>
              </th>
              <th className="border border-gray-300 px-2 py-1 text-center">
                <div className="grid gap-1">
                  <span>To</span> <span>LG</span> <span>GP</span>
                </div>
              </th>
              <th className="px-2 py-1 text-center">
                <div className="grid gap-1">
                  <span>Cre</span> <span>MCQ</span> <span>Pra</span>
                </div>
              </th>
              <th className="border border-gray-300 px-2 py-1 text-center">
                <div className="grid gap-1">
                  <span>To</span> <span>LG</span> <span>GP</span>
                </div>
              </th>
              <th className="px-2 py-1 text-center">
                <div className="grid gap-1">
                  <span>Cre</span> <span>MCQ</span> <span>Pra</span>
                </div>
              </th>
              <th className="border border-gray-300 px-2 py-1 text-center">
                <div className="grid gap-1">
                  <span>To</span> <span>LG</span> <span>GP</span>
                </div>
              </th>
              <th className="px-2 py-1 text-center">
                <div className="grid gap-1">
                  <span>Cre</span> <span>MCQ</span> <span>Pra</span>
                </div>
              </th>
              <th className="border border-gray-300 px-2 py-1 text-center">
                <div className="grid gap-1">
                  <span>To</span> <span>LG</span> <span>GP</span>
                </div>
              </th>
            </tr>
          </thead>
          {/* Body */}
          <tbody className="text-xs">
            <tr>
              <td className="border border-gray-300 px-2 py-1 text-center">
                1
              </td>
              <td className="px-2 py-1 space-y-1 block w-40 h-auto">
                <p>Ahnaf Zahin</p>
                <p>Student ID: 231702</p>
                <p>Shift: Morning</p>
                <p>Section: A</p>
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                27
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                25
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                52
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                A+
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                5.0
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                -
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                1
              </td>
              <td className="border border-gray-300 px-2 py-1">Ahnaf Zahin</td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                27
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                25
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                52
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                A+
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                5.0
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                -
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                A+
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                5.0
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                -
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                25
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                52
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                A+
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                5.0
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                -
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                A+
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                5.0
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                -
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                25
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                52
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                A+
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                5.0
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                -
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                A+
              </td>
              <td className="border border-gray-300 px-2 py-1 text-center">
                5.0
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TabulationSheet;

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
            Mark Sheet
          </span>
        </div>
        <div className="space-y-4 px-40 py-5">
          <div>
            <label
              htmlFor="year"
              className="block text-sm font-medium text-gray-700"
            >
              Year <span className="text-red">*</span>
            </label>
            <select
              id="year"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="" disabled selected>
                Select Year
              </option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="exam"
              className="block text-sm font-medium text-gray-700"
            >
              Exam <span className="text-red">*</span>
            </label>
            <select
              id="exam"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="" disabled selected>
                Select Exam
              </option>
              <option value="midterm">Midterm</option>
              <option value="final">Final</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="shift"
              className="block text-sm font-medium text-gray-700"
            >
              Shift <span className="text-red">*</span>
            </label>
            <select
              id="shift"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="" disabled selected>
                Select Shift
              </option>
              <option value="morning">Morning</option>
              <option value="evening">Evening</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="class"
              className="block text-sm font-medium text-gray-700"
            >
              Class <span className="text-red">*</span>
            </label>
            <select
              id="class"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="" disabled selected>
                Select Class
              </option>
              <option value="class10">Class 10</option>
              <option value="class12">Class 12</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="section"
              className="block text-sm font-medium text-gray-700"
            >
              Section <span className="text-red">*</span>
            </label>
            <select
              id="section"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="" disabled selected>
                Select Section
              </option>
              <option value="a">A</option>
              <option value="b">B</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="group"
              className="block text-sm font-medium text-gray-700"
            >
              Group <span className="text-red">*</span>
            </label>
            <select
              id="group"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="" disabled selected>
                Select Group
              </option>
              <option value="science">Science</option>
              <option value="commerce">Commerce</option>
              <option value="arts">Arts</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="mergeResult"
              className="block text-sm font-medium text-gray-700"
            >
              Merge Result?
            </label>
            <div className="mt-2 flex items-center space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  id="mergeYes"
                  name="mergeResult"
                  value="yes"
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Yes</span>
              </label>

              <label className="inline-flex items-center">
                <input
                  type="radio"
                  id="mergeNo"
                  name="mergeResult"
                  value="no"
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">No</span>
              </label>
            </div>
          </div>
          <div>
            <label
              htmlFor="fromRoll"
              className="block text-sm font-medium text-gray-700"
            >
              Roll
            </label>
            <div className="flex space-x-4">
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm3 6a1 1 0 011-1h4a1 1 0 110 2H9a1 1 0 01-1-1z" />
                  </svg>
                </div>
                <input
                  type="number"
                  id="fromRoll"
                  name="fromRoll"
                  placeholder="From"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M3 10a7 7 0 1114 0 7 7 0 01-14 0zm7-3a1 1 0 100 2 1 1 0 000-2zm-2 6a1 1 0 102 0v-1a1 1 0 00-2 0v1z" />
                    </svg>
                  </div>
                  <input
                    type="number"
                    id="toRoll"
                    name="toRoll"
                    placeholder="To"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <button className="text-base font-normal uppercase py-2 px-4 rounded-md bg-blue-900 hover:bg-blue-700 text-white">
              Serach
            </button>
          </div>
        </div>
      </div>
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

      {/* <section className="flex justify-between items-center space-y-10">
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
      </section> */}
      {/* <div className="overflow-x-auto">
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
            </tr>
            <tr>
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
      </div> */}
    </div>
  );
};

export default TabulationSheet;

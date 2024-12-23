import FilterMeritList from "./FilterMeritList";
import Logo from "../../assets/school-logo.png";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useNavigate } from "react-router-dom";
const students = [
  {
    serial: 1,
    merit: 5,
    name: "Ahnaf Zahin",
    roll: 231702,
    section: "A",
    noOfFail: 0,
    gpa: 4.0,
    total: 500,
  },
  {
    serial: 2,
    merit: 10,
    name: "John Doe",
    roll: 231703,
    section: "B",
    noOfFail: 1,
    gpa: 3.5,
    total: 450,
  },
  {
    serial: 3,
    merit: 15,
    name: "Jane Smith",
    roll: 231704,
    section: "A",
    noOfFail: 2,
    gpa: 3.0,
    total: 400,
  },
];

const data = [
  { title: "Session", value: "2024" },
  { title: "Examination", value: "Test" },
  { title: "Shift", value: "Morning" },
  { title: "Class", value: "X" },
  { title: "Section", value: "A" },
  { title: "Group", value: "Science" },
];
const MeritList = () => {
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  return (
    <div className=" p-6">
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
              Merit List
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
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-2 py-1 text-xs text-left">
                  Serial
                </th>
                <th className="border border-gray-300 px-2 py-1 text-xs text-left">
                  Merit
                </th>
                <th className="border border-gray-300 px-2 py-1 text-xs text-left">
                  Student Name
                </th>
                <th className="border border-gray-300 px-2 py-1 text-xs text-left">
                  Roll
                </th>
                <th className="border border-gray-300 px-2 py-1 text-xs text-left">
                  Section
                </th>
                <th className="border border-gray-300 px-2 py-1 text-xs text-left">
                  No of Fail
                </th>
                <th className="border border-gray-300 px-2 py-1 text-xs text-left">
                  GPA
                </th>
                <th className="border border-gray-300 px-2 py-1 text-xs text-left">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-3 py-1 text-sm">
                    {student.serial}
                  </td>
                  <td className="border border-gray-300 px-3 py-1 text-sm">
                    {student.merit}
                  </td>
                  <td className="border border-gray-300 px-3 py-1 text-sm">
                    {student.name}
                  </td>
                  <td className="border border-gray-300 px-3 py-1 text-sm">
                    {student.roll}
                  </td>
                  <td className="border border-gray-300 px-3 py-1 text-sm">
                    {student.section}
                  </td>
                  <td className="border border-gray-300 px-3 py-1 text-sm">
                    {student.noOfFail}
                  </td>
                  <td className="border border-gray-300 px-3 py-1 text-sm">
                    {student.gpa}
                  </td>
                  <td className="border border-gray-300 px-3 py-1 text-sm">
                    {student.total}
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

export default MeritList;

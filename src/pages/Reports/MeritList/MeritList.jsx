// import FilterMeritList from "./FilterMeritList";
// import Logo from "../../../assets/school-logo.png";
// import { useRef } from "react";
// import { useReactToPrint } from "react-to-print";
// import { useNavigate } from "react-router-dom";
// const students = [
//   {
//     serial: 1,
//     merit: 5,
//     name: "Ahnaf Zahin",
//     roll: 231702,
//     section: "A",
//     noOfFail: 0,
//     gpa: 4.0,
//     total: 500,
//   },
//   {
//     serial: 2,
//     merit: 10,
//     name: "John Doe",
//     roll: 231703,
//     section: "B",
//     noOfFail: 1,
//     gpa: 3.5,
//     total: 450,
//   },
//   {
//     serial: 3,
//     merit: 15,
//     name: "Jane Smith",
//     roll: 231704,
//     section: "A",
//     noOfFail: 2,
//     gpa: 3.0,
//     total: 400,
//   },
// ];

// const data = [
//   { title: "Session", value: "2024" },
//   { title: "Examination", value: "Test" },
//   { title: "Shift", value: "Morning" },
//   { title: "Class", value: "X" },
//   { title: "Section", value: "A" },
//   { title: "Group", value: "Science" },
// ];
// const MeritList = () => {
//   const contentRef = useRef(null);
//   const reactToPrintFn = useReactToPrint({ contentRef });

//   return (
//     <div className=" p-6">
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
//         <div className="overflow-x-auto">
//           <table className="min-w-full table-auto border-collapse border border-gray-300">
//             <thead>
//               <tr>
//                 <th className="border border-gray-300 px-2 py-1 text-xs text-left">
//                   Serial
//                 </th>
//                 <th className="border border-gray-300 px-2 py-1 text-xs text-left">
//                   Merit
//                 </th>
//                 <th className="border border-gray-300 px-2 py-1 text-xs text-left">
//                   Student Name
//                 </th>
//                 <th className="border border-gray-300 px-2 py-1 text-xs text-left">
//                   Roll
//                 </th>
//                 <th className="border border-gray-300 px-2 py-1 text-xs text-left">
//                   Section
//                 </th>
//                 <th className="border border-gray-300 px-2 py-1 text-xs text-left">
//                   No of Fail
//                 </th>
//                 <th className="border border-gray-300 px-2 py-1 text-xs text-left">
//                   GPA
//                 </th>
//                 <th className="border border-gray-300 px-2 py-1 text-xs text-left">
//                   Total
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {students.map((student, index) => (
//                 <tr key={index}>
//                   <td className="border border-gray-300 px-3 py-1 text-sm">
//                     {student.serial}
//                   </td>
//                   <td className="border border-gray-300 px-3 py-1 text-sm">
//                     {student.merit}
//                   </td>
//                   <td className="border border-gray-300 px-3 py-1 text-sm">
//                     {student.name}
//                   </td>
//                   <td className="border border-gray-300 px-3 py-1 text-sm">
//                     {student.roll}
//                   </td>
//                   <td className="border border-gray-300 px-3 py-1 text-sm">
//                     {student.section}
//                   </td>
//                   <td className="border border-gray-300 px-3 py-1 text-sm">
//                     {student.noOfFail}
//                   </td>
//                   <td className="border border-gray-300 px-3 py-1 text-sm">
//                     {student.gpa}
//                   </td>
//                   <td className="border border-gray-300 px-3 py-1 text-sm">
//                     {student.total}
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

// export default MeritList;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../api";
import ResultNav from "../../../components/ResultNav";
import axios from "axios";
import { groupData, termsData } from "../../../data/data";
import useUserProtectFilter from "../../../hooks/useUserProtectFilter";

const MeritList = () => {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState("");
  const [formData, setFormData] = useState({
    className: "",
    group: "",
    section: "",
    shift: "",
    session: "",
    term: "",
    roll: "",
    studentId: "",
  });

  const currentYear = new Date().getFullYear();
  const shifts = ["Morning", "Day"];
  const sessions = [currentYear, currentYear - 1, currentYear - 2];
  const terms = ["Annual", "Half Yearly", "Pretest", "Test", "Model Test"];
  const classes = ["4", "5", "6", "7", "8", "9", "10"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "className") {
      setSelectedClass(value);
      // Reset group when class changes
      if (!["9", "10"].includes(value)) {
        setFormData((prev) => ({ ...prev, group: "" }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    try {
      const response = await api.post("/result/individual", formData);
      console.log("individual-result:", response.data);

      if (response.status === 200) {
        localStorage.setItem("result", JSON.stringify(response.data));
        navigate("/get-result/transcript");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const FormSelect = ({ label, name, options, required = true }) => (
    <div className="mb-4.5">
      <label className="mb-3 block text-black dark:text-white">{label}</label>
      <select
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        required={required}
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      >
        <option value="">Select {label}</option>
        {Array.isArray(options)
          ? options.map((option) => (
              <option
                key={typeof option === "object" ? option.value : option}
                value={typeof option === "object" ? option.value : option}
              >
                {typeof option === "object" ? option.label : option}
              </option>
            ))
          : null}
      </select>
    </div>
  );

  return (
    <div className="container mx-auto px-4">
      <div className="mt-4 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Get Student Result
          </h3>
        </div>

        <div className="p-6.5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormSelect
                label="Select Class"
                name="className"
                options={classes}
              />

              {["9", "10"].includes(selectedClass) && (
                <FormSelect
                  label="Select Group"
                  name="group"
                  options={groupData}
                />
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormSelect label="Section" name="section" options={["A", "B"]} />
              <FormSelect label="Shift" name="shift" options={shifts} />
              <FormSelect label="Session" name="session" options={sessions} />
              <FormSelect label="Term" name="term" options={termsData} />
              <div className="mb-4.5">
                <label className="mb-3 block text-black dark:text-white">
                  Student Id
                </label>
                <input
                  name="studentId"
                  type="number"
                  min="0"
                  value={formData.studentId}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-lg font-semibold">Merge Result?</label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="mergeResult"
                      value="yes"
                      className="form-radio text-blue-600"
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="mergeResult"
                      value="no"
                      checked
                      className="form-radio text-blue-600"
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>

              <div className="">
                <label className="mb-3 block text-black dark:text-white">
                  Roll From
                </label>
                <input
                  type="number"
                  min="0"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="">
                <label className="mb-3 block text-black dark:text-white">
                  Roll To
                </label>
                <input
                  type="number"
                  min="0"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center bg-primary py-3 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MeritList;

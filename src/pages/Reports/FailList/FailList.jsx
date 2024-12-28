import Logo from "../../../assets/school-logo.png";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

const data = [
  { title: "Session", value: "2024" },
  { title: "Examination", value: "Test" },
  { title: "Shift", value: "Morning" },
  { title: "Class", value: "X" },
  { title: "Section", value: "A" },
  { title: "Group", value: "Science" },
];
const subjects = [
  {
    serial: 1,
    subjectCode: "101",
    subjectName: "Mathematics",
    subjective: 40,
    objective: 30,
    practical: 20,
    total: 90,
    fail: false,
  },
  {
    serial: 2,
    subjectCode: "102",
    subjectName: "English",
    subjective: 35,
    objective: 25,
    practical: 0,
    total: 60,
    fail: false,
  },
  {
    serial: 3,
    subjectCode: "103",
    subjectName: "Physics",
    subjective: 30,
    objective: 20,
    practical: 25,
    total: 75,
    fail: false,
  },
  {
    serial: 4,
    subjectCode: "104",
    subjectName: "Chemistry",
    subjective: 25,
    objective: 20,
    practical: 30,
    total: 75,
    fail: false,
  },
  {
    serial: 5,
    subjectCode: "105",
    subjectName: "Biology",
    subjective: 20,
    objective: 15,
    practical: 35,
    total: 70,
    fail: true,
  },
];
const FailList = () => {
  const contentRef = useRef(null);
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [meritList, setMeritList] = useState([]);

  useEffect(() => {
    // Retrieve data from localStorage
    const storedData = localStorage.getItem("meritList");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setMeritList(parsedData.data || []); // Use the "data" field from the response
    }
  }, []);
  return (
    <div className="p-6">
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
        <div className="container mx-auto px-4">
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Serial</th>
                <th className="border border-gray-300 px-4 py-2">
                  Subject Code
                </th>
                <th className="border border-gray-300 px-4 py-2">
                  Subject Name
                </th>
                <th className="border border-gray-300 px-4 py-2">Subjective</th>
                <th className="border border-gray-300 px-4 py-2">Objective</th>
                <th className="border border-gray-300 px-4 py-2">Practical</th>
                <th className="border border-gray-300 px-4 py-2">Total</th>
                <th className="border border-gray-300 px-4 py-2">Fail</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject) => (
                <tr
                  key={subject.serial}
                  // className={`${
                  //   subject.fail ? "bg-red-100" : "bg-green-100"
                  // } hover:bg-gray-200`}
                >
                  <td className="border border-gray-300 px-4 py-2">
                    {subject.serial}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {subject.subjectCode}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {subject.subjectName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {subject.subjective}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {subject.objective}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {subject.practical}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {subject.total}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {subject.fail ? "Yes" : "No"}
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

export default FailList;

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { api } from "../../../api";
// import ResultNav from "../../../components/ResultNav";
// import axios from "axios";
// import { groupData, termsData } from "../../../data/data";
// import useUserProtectFilter from "../../../hooks/useUserProtectFilter";

// const MeritList = () => {
//   const navigate = useNavigate();
//   const [selectedClass, setSelectedClass] = useState("");
//   const [formData, setFormData] = useState({
//     className: "",
//     group: "",
//     section: "",
//     shift: "",
//     session: "",
//     term: "",
//     // roll: "",
//     studentId: "",
//   });

//   const currentYear = new Date().getFullYear();
//   const shifts = ["Morning", "Day"];
//   const sessions = [currentYear, currentYear - 1, currentYear - 2];
//   const terms = ["Annual", "Half Yearly", "Pretest", "Test", "Model Test"];
//   const classes = ["4", "5", "6", "7", "8", "9", "10"];

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     if (name === "className") {
//       setSelectedClass(value);
//       // Reset group when class changes
//       if (!["9", "10"].includes(value)) {
//         setFormData((prev) => ({ ...prev, group: "" }));
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Form submitted:", formData);
//     // try {
//     //   const response = await api.post("/result/individual", formData);
//     //   console.log("individual-result:", response.data);

//     //   if (response.status === 200) {
//     //     localStorage.setItem("result", JSON.stringify(response.data));
//     //     navigate("/get-result/transcript");
//     //   }
//     // } catch (error) {
//     //   console.log(error);
//     // }
//   };

//   const FormSelect = ({ label, name, options, required = true }) => (
//     <div className="mb-4.5">
//       <label className="mb-3 block text-black dark:text-white">{label}</label>
//       <select
//         name={name}
//         value={formData[name]}
//         onChange={handleInputChange}
//         required={required}
//         className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//       >
//         <option value="">Select {label}</option>
//         {Array.isArray(options)
//           ? options.map((option) => (
//               <option
//                 key={typeof option === "object" ? option.value : option}
//                 value={typeof option === "object" ? option.value : option}
//               >
//                 {typeof option === "object" ? option.label : option}
//               </option>
//             ))
//           : null}
//       </select>
//     </div>
//   );

//   return (
//     <div className="container mx-auto px-4">
//       <div className="mt-4 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//         <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
//           <h3 className="font-medium text-black dark:text-white">
//             Get Student Result
//           </h3>
//         </div>

//         <div className="p-6.5">
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <FormSelect
//                 label="Select Class"
//                 name="className"
//                 options={classes}
//               />

//               {["9", "10"].includes(selectedClass) && (
//                 <FormSelect
//                   label="Select Group"
//                   name="group"
//                   options={groupData}
//                 />
//               )}
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               <FormSelect label="Section" name="section" options={["A", "B"]} />
//               <FormSelect label="Shift" name="shift" options={shifts} />
//               <FormSelect label="Session" name="session" options={sessions} />
//               <FormSelect label="Term" name="term" options={termsData} />
//               <div className="flex flex-col space-y-2">
//                 <label className="text-lg font-semibold">Merge Result?</label>
//                 <div className="flex items-center space-x-4">
//                   <label className="flex items-center space-x-2">
//                     <input
//                       type="radio"
//                       name="mergeResult"
//                       value="yes"
//                       className="form-radio text-blue-600"
//                     />
//                     <span>Yes</span>
//                   </label>
//                   <label className="flex items-center space-x-2">
//                     <input
//                       type="radio"
//                       name="mergeResult"
//                       value="no"
//                       checked
//                       className="form-radio text-blue-600"
//                     />
//                     <span>No</span>
//                   </label>
//                 </div>
//               </div>
//             </div>

//             <button
//               type="submit"
//               className="inline-flex items-center justify-center bg-primary py-3 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
//             >
//               Search
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MeritList;

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { groupData, termsData } from "../../../data/data";
// import axios from "axios";
// import { toast } from "react-toastify";

// const MeritList = () => {
//   const navigate = useNavigate();
//   const url = import.meta.env.VITE_SERVER_BASE_URL;
//   const [selectedClass, setSelectedClass] = useState("");
//   const [formData, setFormData] = useState({
//     className: "",
//     group: "",
//     section: "",
//     shift: "",
//     session: "",
//     term: "",
//     is_merged: false,
//   });

//   const currentYear = new Date().getFullYear();
//   const shifts = ["Morning", "Day"];
//   const sessions = [currentYear, currentYear - 1, currentYear - 2];
//   const classes = ["4", "5", "6", "7", "8", "9", "10"];

//   const payload = {
//     session: "2024",
//     term: "Annual",
//     className: "9",
//     section: "A",
//     shift: "Morning",
//     group: "General",
//     is_merged: true,
//   };

//   // Pre-fill form data with payload
//   useEffect(() => {
//     setFormData((prev) => ({
//       ...prev,
//       ...payload,
//     }));
//     setSelectedClass(payload.className);
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));

//     if (name === "className") {
//       setSelectedClass(value);
//       // Reset group when class changes
//       if (!["9", "10"].includes(value)) {
//         setFormData((prev) => ({ ...prev, group: "" }));
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Form submitted:", formData);
//     const response = await axios.post(`${url}/result/merit-list`, formData);
//     if (response.status === 200) {
//       toast.success("Merit list generated successfully!");
//     }
//     console.log("individual-result:", response.data);
//   };

//   const FormSelect = ({ label, name, options, required = true }) => (
//     <div className="mb-4.5">
//       <label className="mb-3 block text-black dark:text-white">{label}</label>
//       <select
//         name={name}
//         value={formData[name]}
//         onChange={handleInputChange}
//         required={required}
//         className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
//       >
//         <option value="">Select {label}</option>
//         {Array.isArray(options)
//           ? options.map((option) => (
//               <option
//                 key={typeof option === "object" ? option.value : option}
//                 value={typeof option === "object" ? option.value : option}
//               >
//                 {typeof option === "object" ? option.label : option}
//               </option>
//             ))
//           : null}
//       </select>
//     </div>
//   );

//   return (
//     <div className="container mx-auto px-4">
//       <div className="mt-4 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//         <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
//           <h3 className="font-medium text-black dark:text-white">
//             Get Student Result
//           </h3>
//         </div>

//         <div className="p-6.5">
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <FormSelect
//                 label="Select Class"
//                 name="className"
//                 options={classes}
//               />

//               {["9", "10"].includes(selectedClass) && (
//                 <FormSelect
//                   label="Select Group"
//                   name="group"
//                   options={groupData}
//                 />
//               )}
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               <FormSelect label="Section" name="section" options={["A", "B"]} />
//               <FormSelect label="Shift" name="shift" options={shifts} />
//               <FormSelect label="Session" name="session" options={sessions} />
//               <FormSelect label="Term" name="term" options={termsData} />
//               <div className="flex flex-col space-y-2">
//                 <label className="text-lg font-semibold">Merge Result?</label>
//                 <div className="flex items-center space-x-4">
//                   <label className="flex items-center space-x-2">
//                     <input
//                       type="radio"
//                       name="is_merged"
//                       value={true}
//                       checked={formData.is_merged === true}
//                       onChange={handleInputChange}
//                       className="form-radio text-blue-600"
//                     />
//                     <span>Yes</span>
//                   </label>
//                   <label className="flex items-center space-x-2">
//                     <input
//                       type="radio"
//                       name="is_merged"
//                       value={false}
//                       checked={formData.is_merged === false}
//                       onChange={handleInputChange}
//                       className="form-radio text-blue-600"
//                     />
//                     <span>No</span>
//                   </label>
//                 </div>
//               </div>
//             </div>

//             <button
//               type="submit"
//               className="inline-flex items-center justify-center bg-primary py-3 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
//             >
//               Search
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MeritList;

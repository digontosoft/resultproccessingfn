import { useForm } from "react-hook-form";

const FilterResult = ({ onFilter }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    onFilter(data); // Pass filter criteria to parent component
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="col-span-1">
            <select
              {...register("className")}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Class</option>
              <option value="9">9</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="col-span-1">
            <select
              {...register("section")}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Section</option>
              <option value="A">A</option>
            </select>
          </div>
          <div className="col-span-1">
            <select
              {...register("shift")}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Shift</option>
              <option value="Morning">Morning</option>
              <option value="Day">Day</option>
            </select>
          </div>
          <div className="col-span-1">
            <select
              {...register("subjectName")}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Subject</option>
              <option value="Bangla">Bangla</option>
              <option value="English">English</option>
            </select>
          </div>
        </div>
        <div className="flex justify-center items-center w-40">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterResult;

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import FilterResult from "./FilterResult";

// const ResultList = () => {
//   const [results, setResults] = useState([]);
//   const [filteredResults, setFilteredResults] = useState([]); // For filtered results
//   const [students, setStudents] = useState([]);
//   const url = import.meta.env.VITE_SERVER_BASE_URL;

//   // Fetch students
//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const response = await axios.get(`${url}/getAllStudent`);
//         setStudents(response.data.data);
//       } catch (error) {
//         console.error("Error fetching students:", error);
//       }
//     };

//     fetchStudents();
//   }, [url]);

//   // Fetch results
//   useEffect(() => {
//     const fetchResults = async () => {
//       try {
//         const response = await axios.get(`${url}/result/get_all`);
//         setResults(response.data.data);
//         console.log("result: ", response.data.data);
//         setFilteredResults(response.data.data); // Initialize filtered results
//       } catch (error) {
//         console.error("Error fetching results:", error);
//       }
//     };

//     fetchResults();
//   }, [url]);

//   // Filter results based on criteria
//   const handleFilter = (criteria) => {
//     const filtered = results.filter((result) => {
//       return (
//         (!criteria.className || result.className === criteria.className) &&
//         (!criteria.section || result.section === criteria.section) &&
//         (!criteria.shift || result.shift === criteria.shift) &&
//         (!criteria.subjectName || result.subjectName === criteria.subjectName)
//       );
//     });
//     setFilteredResults(filtered);
//   };

//   return (
//     <div>
//       <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
//         <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
//           <h3 className="font-medium text-black dark:text-white">Marks List</h3>
//         </div>
//         <div className="p-6.5 space-y-5">
//           <FilterResult onFilter={handleFilter} />
//         </div>
//         <div className="p-6.5">
//           <table className="w-full table-auto overflow-x-auto">
//             <thead>
//               <tr className="bg-gray-2 text-left dark:bg-meta-4">
//                 <th className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
//                   S.ID
//                 </th>
//                 <th className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
//                   Name
//                 </th>
//                 <th className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
//                   Class
//                 </th>
//                 <th className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
//                   Shift
//                 </th>
//                 <th className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
//                   Section
//                 </th>
//                 <th className="py-4 px-4 font-medium text-black dark:text-white">
//                   Subject
//                 </th>
//                 <th className="py-4 px-4 font-medium text-black dark:text-white">
//                   Subjective
//                 </th>
//                 <th className="py-4 px-4 font-medium text-black dark:text-white">
//                   Objective
//                 </th>
//                 <th className="py-4 px-4 font-medium text-black dark:text-white">
//                   Practical
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredResults.map((result) => {
//                 const student = students.find(
//                   (s) => s.studentId === result.studentId
//                 );
//                 return (
//                   <tr key={result._id}>
//                     <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
//                       {result.studentId}
//                     </td>
//                     <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
//                       {student?.studentName || "Unknown"}
//                     </td>
//                     <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
//                       {result.className}
//                     </td>
//                     <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
//                       {result.shift}
//                     </td>
//                     <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
//                       {result.section}
//                     </td>
//                     <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
//                       {result.subjectName}
//                     </td>
//                     <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
//                       {result.subjective}
//                     </td>
//                     <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
//                       {result.objective}
//                     </td>
//                     <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
//                       {result.practical}
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResultList;

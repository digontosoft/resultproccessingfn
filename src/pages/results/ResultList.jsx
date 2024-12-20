// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Controller, useForm } from "react-hook-form";
// import useAxios from "../../hooks/useAxios";
// import { toast } from "react-toastify";
// import FilterResult from "./FilterResult";

// const ResultList = () => {
//   const { gurdedApi } = useAxios();
//   const [results, setResults] = useState([]);
//   const [subjects, setSubjects] = useState([]);
//   const [filteredResults, setFilteredResults] = useState([]);
//   const [selectedStudent, setSelectedStudent] = useState(null); // For edit modal
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Edit modal visibility
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Delete modal visibility
//   const [deleteId, setDeleteId] = useState(null); // ID of the result to delete
//   const url = import.meta.env.VITE_SERVER_BASE_URL;
//   const { control, handleSubmit, reset } = useForm();

//   useEffect(() => {
//     const fetchResults = async () => {
//       try {
//         const response = await axios.get(`${url}/result/get_all`);
//         setResults(response.data.data);
//         setFilteredResults(response.data.data);
//         console.log("first", response.data.data);
//       } catch (error) {
//         console.error("Error fetching results:", error);
//       }
//     };

//     fetchResults();
//   }, [url]);

//   const openEditModal = (student) => {
//     setSelectedStudent(student);
//     setIsEditModalOpen(true);
//     reset(student); // Populate form with selected student's marks
//   };

//   const closeEditModal = () => {
//     setSelectedStudent(null);
//     setIsEditModalOpen(false);
//   };

//   const openDeleteModal = (id) => {
//     setDeleteId(id);
//     setIsDeleteModalOpen(true);
//   };

//   const closeDeleteModal = () => {
//     setDeleteId(null);
//     setIsDeleteModalOpen(false);
//   };

//   const onSubmit = async (data) => {
//     try {
//       const response = await axios.put(
//         `${url}/result/update/${selectedStudent._id}`,
//         data
//       );
//       if (response.status === 200) {
//         toast.success("Marks updated successfully");
//         setResults((prev) =>
//           prev.map((result) =>
//             result._id === selectedStudent._id ? { ...result, ...data } : result
//           )
//         );
//       }
//     } catch (error) {
//       toast.error("Failed to update marks");
//     }
//     closeEditModal();
//   };

//   const handleDelete = async () => {
//     try {
//       const response = await axios.delete(`${url}/result/delete/${deleteId}`);
//       if (response.status === 200) {
//         toast.success("Marks deleted successfully");
//         setResults((prevResults) =>
//           prevResults.filter((result) => result._id !== deleteId)
//         );
//       }
//     } catch (error) {
//       toast.error("Failed to delete marks");
//     }
//     closeDeleteModal();
//   };

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
//                 <th className="py-4 px-4 font-medium text-black dark:text-white">
//                   Action
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {results?.map((student) => (
//                 <tr key={student._id}>
//                   <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
//                     {student?.studentId}
//                   </td>
//                   <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
//                     {student?.className}
//                   </td>
//                   <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
//                     {student?.shift}
//                   </td>
//                   <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
//                     {student?.section}
//                   </td>
//                   <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
//                     {student?.subjectName}
//                   </td>
//                   <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
//                     {student?.subjective}
//                   </td>
//                   <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
//                     {student?.objective}
//                   </td>
//                   <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
//                     {student?.practical}
//                   </td>
//                   <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark flex gap-5">
//                     <button
//                       className="text-blue-500"
//                       onClick={() => openEditModal(student)}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       className="text-red-500"
//                       onClick={() => openDeleteModal(student._id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Edit Modal */}
//       {isEditModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="w-1/3 rounded bg-white p-6 shadow-lg">
//             <h3 className="mb-4 text-lg font-medium text-black">Edit Marks</h3>
//             <form onSubmit={handleSubmit(onSubmit)}>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Subjective
//                 </label>
//                 <Controller
//                   name="subjective"
//                   control={control}
//                   render={({ field }) => (
//                     <input
//                       type="number"
//                       {...field}
//                       className="mt-1 w-full rounded border-gray-300 p-2"
//                     />
//                   )}
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Objective
//                 </label>
//                 <Controller
//                   name="objective"
//                   control={control}
//                   render={({ field }) => (
//                     <input
//                       type="number"
//                       {...field}
//                       className="mt-1 w-full rounded border-gray-300 p-2"
//                     />
//                   )}
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Practical
//                 </label>
//                 <Controller
//                   name="practical"
//                   control={control}
//                   render={({ field }) => (
//                     <input
//                       type="number"
//                       {...field}
//                       className="mt-1 w-full rounded border-gray-300 p-2"
//                     />
//                   )}
//                 />
//               </div>
//               <div className="flex justify-end gap-2">
//                 <button
//                   type="button"
//                   onClick={closeEditModal}
//                   className="rounded bg-gray-300 px-4 py-2"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="rounded bg-blue-500 px-4 py-2 text-white"
//                 >
//                   Save
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {isDeleteModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="w-1/3 rounded bg-white p-6 shadow-lg">
//             <h3 className="mb-4 text-lg font-medium text-black">
//               Confirm Delete
//             </h3>
//             <p>Are you sure you want to delete this result?</p>
//             <div className="flex justify-end gap-2 mt-4">
//               <button
//                 onClick={closeDeleteModal}
//                 className="rounded bg-gray-300 px-4 py-2"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleDelete}
//                 className="rounded bg-red-500 px-4 py-2 text-white"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ResultList;

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import FilterResult from "./FilterResult";
import useAxios from "../../hooks/useAxios";
import { Controller, useForm } from "react-hook-form";

const ResultList = () => {
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]); // For filtered results
  const [students, setStudents] = useState([]);
  const { gurdedApi } = useAxios();
  // const [results, setResults] = useState([]);
  const [subjects, setSubjects] = useState([]);
  // const [filteredResults, setFilteredResults] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null); // For edit modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Edit modal visibility
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Delete modal visibility
  const [deleteId, setDeleteId] = useState(null); // ID of the result to delete
  const url = import.meta.env.VITE_SERVER_BASE_URL;
  const { control, handleSubmit, reset } = useForm();

  // Fetch students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${url}/getAllStudent`);
        setStudents(response.data.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, [url]);

  // Fetch results
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`${url}/result/get_all`);
        setResults(response.data.data);
        console.log("result: ", response.data.data);
        setFilteredResults(response.data.data); // Initialize filtered results
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };

    fetchResults();
  }, [url]);

  // Filter results based on criteria
  const handleFilter = (criteria) => {
    const filtered = results.filter((result) => {
      return (
        (!criteria.className || result.className === criteria.className) &&
        (!criteria.section || result.section === criteria.section) &&
        (!criteria.shift || result.shift === criteria.shift) &&
        (!criteria.subjectName || result.subjectName === criteria.subjectName)
      );
    });
    setFilteredResults(filtered);
  };

  // const openEditModal = (student) => {
  //   setSelectedStudent(student);
  //   setIsEditModalOpen(true);
  //   reset(student); // Populate form with selected student's marks
  // };

  const openEditModal = (result) => {
    setSelectedStudent(result);
    setIsEditModalOpen(true);
    reset({
      subjective: result.subjective,
      objective: result.objective,
      practical: result.practical,
    });
  };

  const closeEditModal = () => {
    setSelectedStudent(null);
    setIsEditModalOpen(false);
  };

  const openDeleteModal = (id) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteId(null);
    setIsDeleteModalOpen(false);
  };

  const onSubmit = async (data) => {
    try {
      const response = await axios.put(
        `${url}/result/update/${selectedStudent._id}`,
        data
      );
      if (response.status === 200) {
        toast.success("Marks updated successfully");
        setResults((prev) =>
          prev.map((result) =>
            result._id === selectedStudent._id ? { ...result, ...data } : result
          )
        );
      }
    } catch (error) {
      toast.error("Failed to update marks");
    }
    closeEditModal();
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${url}/result/delete/${deleteId}`);
      if (response.status === 200) {
        toast.success("Marks deleted successfully");
        setResults((prevResults) =>
          prevResults.filter((result) => result._id !== deleteId)
        );
      }
    } catch (error) {
      toast.error("Failed to delete marks");
    }
    closeDeleteModal();
  };

  return (
    <div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">Marks List</h3>
        </div>
        <div className="p-6.5 space-y-5">
          <FilterResult onFilter={handleFilter} />
        </div>
        <div className="p-6.5">
          <table className="w-full table-auto overflow-x-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  S.ID
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Name
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Class
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Shift
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Section
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Subject
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Subjective
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Objective
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Practical
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Practical
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.map((result) => {
                const student = students.find(
                  (s) => s.studentId === result.studentId
                );
                return (
                  <tr key={result._id}>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      {result.studentId}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      {student?.studentName || "Unknown"}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      {result.className}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      {result.shift}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      {result.section}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      {result.subjectName}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      {result.subjective}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      {result.objective}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      {result.practical}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark flex gap-5">
                      <button
                        className="text-blue-500"
                        onClick={() => openEditModal(student)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-500"
                        onClick={() => openDeleteModal(student._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-1/3 rounded bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-medium text-black">Edit Marks</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Subjective
                </label>
                <Controller
                  name="subjective"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="number"
                      {...field}
                      className="mt-1 w-full rounded border-gray-300 p-2"
                    />
                  )}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Objective
                </label>
                <Controller
                  name="objective"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="number"
                      {...field}
                      className="mt-1 w-full rounded border-gray-300 p-2"
                    />
                  )}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Practical
                </label>
                <Controller
                  name="practical"
                  control={control}
                  render={({ field }) => (
                    <input
                      type="number"
                      {...field}
                      className="mt-1 w-full rounded border-gray-300 p-2"
                    />
                  )}
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="rounded bg-gray-300 px-4 py-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded bg-blue-500 px-4 py-2 text-white"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-1/3 rounded bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-medium text-black">
              Confirm Delete
            </h3>
            <p>Are you sure you want to delete this result?</p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={closeDeleteModal}
                className="rounded bg-gray-300 px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="rounded bg-red-500 px-4 py-2 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultList;

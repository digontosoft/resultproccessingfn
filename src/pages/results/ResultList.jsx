import { useEffect, useState } from "react";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import useAxios from "../../hooks/useAxios";
import { toast } from "react-toastify";
import FilterResult from "./FilterResult";
import useUserProtectFilter from "../../hooks/useUserProtectFilter";
import useSingleUser from "../../hooks/useSingleUser";

const ResultList = () => {
  const { gurdedApi } = useAxios();
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null); // For edit modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Edit modal visibility
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Delete modal visibility
  const [deleteId, setDeleteId] = useState(null); // ID of the result to delete
  const url = import.meta.env.VITE_SERVER_BASE_URL;
  const [subjects, setSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const { control, handleSubmit, reset } = useForm();
  const { filterClass, filterSection, filterShift, sessions } =
    useUserProtectFilter();
  const { getUser } = useSingleUser();

  //   // Fetch students
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

  const getAllResult = async () => {
    try {
      const response = await axios.get(`${url}/result/get_all`);
      setResults(response.data.data);
      console.log("result:", response.data.data);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  useEffect(() => {
    getAllResult();
  }, [url]);

  const openEditModal = (student) => {
    setSelectedStudent(student);
    setIsEditModalOpen(true);
    reset(student); // Populate form with selected student's marks
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
        setTimeout(() => {
          window.location.reload();
        }, 500);
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
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
      closeDeleteModal();
    } catch (error) {
      toast.error("Failed to delete marks");
    }
  };

  // Filter results based on criteria
  const handleFilter = (criteria) => {
    const filtered = results.filter((result) => {
      return (
        (!criteria.className || result.className === criteria.className) &&
        (!criteria.section || result.section === criteria.section) &&
        (!criteria.shift || result.shift === criteria.shift) &&
        (!criteria.subjectName ||
          result.subjectName === criteria.subjectName) &&
        (!criteria.sessions || result.session === criteria.sessions)
      );
    });
    setFilteredResults(filtered);
    console.log("filtered", filtered);
    console.log("criteria", criteria);
  };

  useEffect(() => {
    if (getUser.userType === "teacher" || getUser.userType === "operator") {
      const data = results.filter(
        (item) =>
          item.className === getUser.class_id.value &&
          item.section === getUser.section &&
          item.shift === getUser.shift
      );
      setFilteredResults(data);
    } else {
      setFilteredResults(results);
    }
  }, [getUser]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(`${url}/subjects`);
        setSubjects(response.data.subjects);
        console.log("subjects:", response.data.subjects);
      } catch (error) {
        toast.error("Failed to fetch subjects");
      }
    };

    fetchSubjects();
  }, [url]);

  //console.log("subject",subjects);

  const handleFilterChange = (event) => {
    const selectedValue = event.target.value;
    console.log("selected value", selectedValue);

    const selectedOption = filterClass.find(
      (option) => option.value === selectedValue
    );
    console.log(selectedOption);

    const filtered = subjects.filter(
      (subject) => subject.class._id === selectedOption._id
    );

    setFilteredSubjects(filtered);
    // setClassData(selectedOption.value);
  };
  console.log("subjects:", results);

  return (
    <div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">Marks List</h3>
        </div>
        <div className="p-6.5 space-y-5">
          <FilterResult
            onFilter={handleFilter}
            handleFilterChange={handleFilterChange}
            filteredSubjects={filteredSubjects}
            filterClass={filterClass}
            filterSection={filterSection}
            filterShift={filterShift}
            sessions={sessions}
          />
        </div>

        <div className="p-6.5 w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  SI.No
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  ST.ID
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Roll
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Class
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Name
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Shift
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Section
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white  xl:pl-11">
                  Subject
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white  xl:pl-11">
                  Subjective
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white  xl:pl-11">
                  Objective
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white  xl:pl-11">
                  Practical
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white  xl:pl-11">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredResults?.map((result, i) => {
                const student = students.find(
                  (s) => s.studentId === result.studentId
                );
                return (
                  <tr key={result._id}>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      {i + 1}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      {result?.studentId}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      {student?.roll}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      {result?.className}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                      {student?.studentName || "Unknown"}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4  dark:border-strokedark xl:pl-11">
                      {result?.shift}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4  dark:border-strokedark xl:pl-11">
                      {result?.section}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4  dark:border-strokedark xl:pl-11">
                      {result?.subjectName}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4  dark:border-strokedark xl:pl-11">
                      {result?.subjective}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4  dark:border-strokedark xl:pl-11">
                      {result?.objective}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4  dark:border-strokedark xl:pl-11">
                      {result?.practical}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4  dark:border-strokedark flex gap-5">
                      <button
                        className="text-blue-500"
                        onClick={() => openEditModal(result)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-500"
                        onClick={() => openDeleteModal(result._id)}
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
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <div className="mb-4 rounded-t-lg bg-gradient-to-r from-blue-500 to-indigo-500 p-4">
              <h3 className="text-lg font-semibold text-white">Edit Marks</h3>
            </div>
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
                      className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring focus:ring-blue-200"
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
                      className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring focus:ring-blue-200"
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
                      className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring focus:ring-blue-200"
                    />
                  )}
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="rounded-lg bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
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
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <div className="mb-4 rounded-t-lg bg-red-500 p-4">
              <h3 className="text-lg font-semibold text-white">
                Confirm Delete
              </h3>
            </div>
            <p className="text-gray-700">
              Are you sure you want to delete this result? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={closeDeleteModal}
                className="rounded-lg bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300"
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

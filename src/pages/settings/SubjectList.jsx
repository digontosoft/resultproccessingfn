import axios from "axios";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";

const groups = ["general", "science", "humanities", "business"];

const SubjectList = () => {
  const [filters, setFilters] = useState({
    className: "",
    group: "",
    session: "",
  });
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [subjectToDelete, setSubjectToDelete] = useState(null);
  const url = import.meta.env.VITE_SERVER_BASE_URL;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      code: "",
      marks: "",
    },
  });

  // Fetch subjects
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(`${url}/subjects`);
        const data = response.data.subjects;
        setSubjects(data);
        setFilteredSubjects(data); // Initially set all subjects
      } catch (error) {
        toast.error("Failed to fetch subjects");
        console.error(error);
      }
    };

    fetchSubjects();
  }, [url]);

  // Fetch classes
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(`${url}/class`);
        const data = response.data.classes;
        setClasses(data);
      } catch (error) {
        toast.error("Failed to fetch classes");
        console.error(error);
      }
    };

    fetchClasses();
  }, [url]);

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);

    // Filter subjects based on class and group
    const filtered = subjects.filter((subject) => {
      return (
        (!updatedFilters.className ||
          subject.class?.name === updatedFilters.className) &&
        (!updatedFilters.group || subject.group === updatedFilters.group)
      );
    });

    setFilteredSubjects(filtered);
  };

  // Open edit modal
  const openEditModal = (subject) => {
    setEditingSubject(subject);
    reset({
      name: subject.name,
      code: subject.subjectCode,
      marks: subject.marks,
    });
    setIsEditModalOpen(true);
  };

  // Handle edit form submit
  const onEditSubmit = async (data) => {
    try {
      const response = await axios.put(`${url}/subject/${subjects._id}`, {
        name: data.name,
        subjectCode: data.code,
        marks: data.marks,
      });

      if (response.status === 200) {
        // Update the subject list after successful edit
        setSubjects((prev) =>
          prev.map((subject) =>
            subject._id === editingSubject._id
              ? { ...subject, ...data, subjectCode: data.code }
              : subject
          )
        );
        setFilteredSubjects((prev) =>
          prev.map((subject) =>
            subject._id === editingSubject._id
              ? { ...subject, ...data, subjectCode: data.code }
              : subject
          )
        );
        toast.success("Subject updated successfully");
        setIsEditModalOpen(false); // Close the modal after editing
      }
    } catch (error) {
      toast.error("Failed to update subject");
      console.error(error);
    }
  };

  // Handle delete action (Show confirmation modal)
  const handleDeleteConfirmation = (id) => {
    setSubjectToDelete(id);
    setIsDeleteModalOpen(true); // Open confirmation modal
  };

  // Confirm delete
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${url}/subject/${subjectToDelete}`);

      if (response.status === 200) {
        toast.success("Subject deleted successfully");
        setSubjects((prev) =>
          prev.filter((subject) => subject._id !== subjectToDelete)
        );
        setFilteredSubjects((prev) =>
          prev.filter((subject) => subject._id !== subjectToDelete)
        );
        setIsDeleteModalOpen(false); // Close confirmation modal after deletion
      }
    } catch (error) {
      toast.error("Failed to delete the subject");
      console.error(error);
      setIsDeleteModalOpen(false); // Close modal in case of error
    }
  };

  // Close the confirmation modal without deleting
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <div>
      <div className="p-6 space-y-4">
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            name="className"
            value={filters.className}
            onChange={handleFilterChange}
            className="w-full rounded-lg border border-stroke py-2 px-4 text-black bg-white dark:bg-boxdark dark:text-white"
          >
            <option value="">Select Class</option>
            {classes.map((cls) => (
              <option key={cls._id} value={cls.name}>
                {cls.name}
              </option>
            ))}
          </select>
          <select
            name="group"
            value={filters.group}
            onChange={handleFilterChange}
            className="w-full rounded-lg border border-stroke py-2 px-4 text-black bg-white dark:bg-boxdark dark:text-white"
          >
            <option value="">Select Group</option>
            {groups.map((grp) => (
              <option key={grp} value={grp}>
                {grp}
              </option>
            ))}
          </select>
        </div>

        {/* Subject Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-stroke">
            <thead>
              <tr className="bg-gray-100 dark:bg-strokedark">
                <th className="border border-stroke px-4 py-2 text-left">
                  Subject Name
                </th>
                <th className="border border-stroke px-4 py-2 text-left">
                  Code
                </th>
                <th className="border border-stroke px-4 py-2 text-left">
                  Class
                </th>
                <th className="border border-stroke px-4 py-2 text-left">
                  Marks
                </th>
                <th className="border border-stroke px-4 py-2 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredSubjects.length > 0 ? (
                filteredSubjects.map((subject) => (
                  <tr key={subject._id}>
                    <td className="border border-stroke px-4 py-2">
                      {subject.name}
                    </td>
                    <td className="border border-stroke px-4 py-2">
                      {subject.subjectCode}
                    </td>
                    <td className="border border-stroke px-4 py-2">
                      {subject?.class?.name}
                    </td>
                    <td className="border border-stroke px-4 py-2">
                      {subject.marks}
                    </td>
                    <td className="border border-stroke px-4 py-2">
                      <button
                        onClick={() => openEditModal(subject)}
                        className="mr-2 text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteConfirmation(subject._id)} // Trigger delete confirmation modal
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="border border-stroke px-4 py-2 text-center"
                  >
                    No subjects found for the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit Subject</h2>
            <form onSubmit={handleSubmit(onEditSubmit)} className="space-y-4">
              <div>
                <label className="block mb-1">Subject Name</label>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: "Subject Name is required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="w-full border border-stroke rounded px-3 py-2"
                    />
                  )}
                />
                {errors.name && (
                  <span className="text-red-500 text-sm">
                    {errors.name.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block mb-1">Code</label>
                <Controller
                  name="code"
                  control={control}
                  rules={{ required: "Code is required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="w-full border border-stroke rounded px-3 py-2"
                    />
                  )}
                />
                {errors.code && (
                  <span className="text-red-500 text-sm">
                    {errors.code.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block mb-1">Marks</label>
                <Controller
                  name="marks"
                  control={control}
                  rules={{ required: "Marks are required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="number"
                      className="w-full border border-stroke rounded px-3 py-2"
                    />
                  )}
                />
                {errors.marks && (
                  <span className="text-red-500 text-sm">
                    {errors.marks.message}
                  </span>
                )}
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Delete Subject</h2>
            <p>Are you sure you want to delete this subject?</p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
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

export default SubjectList;

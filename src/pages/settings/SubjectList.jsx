import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

const classes = ["Class 1", "Class 2", "Class 3", "Class 4"];
const groups = ["Science", "Commerce", "Arts"];
const sessions = ["2023", "2024", "2025", "2026"];

// Mock data
const initialSubjects = [
  {
    id: 1,
    className: "Class 1",
    group: "Science",
    session: "2023",
    name: "Math",
    code: "M101",
    marks: 100,
  },
  {
    id: 2,
    className: "Class 1",
    group: "Commerce",
    session: "2023",
    name: "Accounting",
    code: "A102",
    marks: 100,
  },
  {
    id: 3,
    className: "Class 2",
    group: "Arts",
    session: "2024",
    name: "History",
    code: "H201",
    marks: 100,
  },
];

const SubjectList = () => {
  const [filters, setFilters] = useState({
    className: "",
    group: "",
    session: "",
  });
  const [subjects, setSubjects] = useState(initialSubjects);
  const [filteredSubjects, setFilteredSubjects] = useState(initialSubjects);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);

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

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));

    const filtered = initialSubjects.filter((subject) =>
      Object.entries({ ...filters, [name]: value }).every(
        ([key, val]) => val === "" || subject[key] === val
      )
    );
    setFilteredSubjects(filtered);
  };

  // Open edit modal
  const openEditModal = (subject) => {
    setEditingSubject(subject);
    reset(subject);
    setIsEditModalOpen(true);
  };

  // Handle edit form submit
  const onEditSubmit = (data) => {
    setSubjects((prev) =>
      prev.map((subject) =>
        subject.id === editingSubject.id ? { ...subject, ...data } : subject
      )
    );
    setFilteredSubjects((prev) =>
      prev.map((subject) =>
        subject.id === editingSubject.id ? { ...subject, ...data } : subject
      )
    );
    setIsEditModalOpen(false);
  };

  // Handle delete action
  const handleDelete = (id) => {
    const updatedSubjects = subjects.filter((subject) => subject.id !== id);
    setSubjects(updatedSubjects);
    setFilteredSubjects(updatedSubjects);
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
              <option key={cls} value={cls}>
                {cls}
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
          <select
            name="session"
            value={filters.session}
            onChange={handleFilterChange}
            className="w-full rounded-lg border border-stroke py-2 px-4 text-black bg-white dark:bg-boxdark dark:text-white"
          >
            <option value="">Select Session</option>
            {sessions.map((session) => (
              <option key={session} value={session}>
                {session}
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
                  <tr key={subject.id}>
                    <td className="border border-stroke px-4 py-2">
                      {subject.name}
                    </td>
                    <td className="border border-stroke px-4 py-2">
                      {subject.code}
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
                        onClick={() => handleDelete(subject.id)}
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
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="mr-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectList;

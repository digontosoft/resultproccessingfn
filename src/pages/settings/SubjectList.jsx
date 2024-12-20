import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAxios from "../../hooks/useAxios";
import useUserProtectFilter from "../../hooks/useUserProtectFilter";
import useSingleUser from "../../hooks/useSingleUser";

import { groupData } from "../../data/data";

const SubjectList = () => {
  const { gurdedApi } = useAxios();
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [filterGroup, setFilterGroup] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [subjectToDelete, setSubjectToDelete] = useState(null);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const url = import.meta.env.VITE_SERVER_BASE_URL;
  const { filterClass } = useUserProtectFilter();
  const { getUser } = useSingleUser();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await gurdedApi.get(`/class`);
        setClasses(response.data.classes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchClasses();
  }, [gurdedApi]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(`${url}/subjects`);
        const data = response.data.subjects;
        setSubjects(data);
        //setFilteredSubjects(data);
      } catch (error) {
        toast.error("Failed to fetch subjects");
        console.error(error);
      }
    };

    fetchSubjects();
  }, [url]);

  const handleFilterChange = (classId, group) => {
    const updatedClass = classId || selectedClass;
    const updatedGroup = group || selectedGroup;

    setSelectedClass(updatedClass);
    setSelectedGroup(updatedGroup);
    //console.log({selectedClass,selectedGroup});

    if (updatedClass && updatedGroup) {
      const filtered = subjects.filter(
        (subject) =>
          subject.class._id === updatedClass && subject.group === updatedGroup
      );
      setFilteredSubjects(filtered);
      // console.log("filtered",filtered);
    } else {
      setFilteredSubjects(subjects);
    }
  };

  const openEditModal = (subject) => {
    setEditingSubject(subject);
    reset({
      name: subject.name,
      code: subject.subjectCode,
      marks: subject.marks,
      class: subject.class.name,
    });
    setIsEditModalOpen(true);
  };
  //console.log("subjects",subjects);
  //console.log("user",getUser)
  useEffect(() => {
    if (getUser.userType === "teacher" || getUser.userType === "operator") {
      const data = subjects.filter(
        (item) => item.class.name === getUser.class_id.name
      );
      setFilteredSubjects(data);
      if (getUser.class_id.value !== "9" || getUser.class_id.value !== "10") {
        setFilterGroup(groupData.slice(0, 1));
      } else {
        setFilterGroup(groupData.slice(1, 4));
      }
    } else {
      // setFilteredSubjects(subjects)
      setFilterGroup(groupData);
    }
  }, [getUser, subjects, selectedClass, selectedGroup]);

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingSubject(null);
  };

  const onEditSubmit = async (data) => {
    console.log("data", data);
    try {
      const response = await axios.put(`${url}/subject/${editingSubject._id}`, {
        name: data.name,
        subjectCode: data.code,
        marks: data.marks,
        class: data.class._id,
      });

      if (response.status === 200) {
        const updatedSubjects = subjects.map((subject) =>
          subject._id === editingSubject._id
            ? { ...subject, ...data, subjectCode: data.code }
            : subject
        );
        setSubjects(updatedSubjects);
        setFilteredSubjects(updatedSubjects);
        toast.success("Subject updated successfully");
        closeEditModal();
      }
    } catch (error) {
      toast.error("Failed to update subject");
      console.error(error);
    }
  };

  const handleDeleteConfirmation = (id) => {
    setSubjectToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${url}/subject/${subjectToDelete}`);

      if (response.status === 200) {
        const updatedSubjects = subjects.filter(
          (subject) => subject._id !== subjectToDelete
        );
        setSubjects(updatedSubjects);
        setFilteredSubjects(updatedSubjects);
        toast.success("Subject deleted successfully");
        closeDeleteModal();
      }
    } catch (error) {
      toast.error("Failed to delete the subject");
      console.error(error);
    }
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSubjectToDelete(null);
  };

  return (
    <div>
      {/* Filter Section */}
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            name="className"
            onChange={(e) => handleFilterChange(e.target.value, null)}
            className="w-full rounded-lg border py-2 px-4"
          >
            <option value="">Select Class</option>
            {filterClass.map((cls) => (
              <option key={cls._id} value={cls._id}>
                {cls.name}
              </option>
            ))}
          </select>
          <select
            name="group"
            onChange={(e) => handleFilterChange(null, e.target.value)}
            className="w-full rounded-lg border py-2 px-4"
          >
            <option value="">Select Group</option>
            {filterGroup.map((grp) => (
              <option key={grp} value={grp}>
                {grp}
              </option>
            ))}
          </select>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2 text-left">Subject Name</th>
                <th className="border px-4 py-2 text-left">Code</th>
                <th className="border px-4 py-2 text-left">Class</th>
                <th className="border px-4 py-2 text-left">Marks</th>
                <th className="border px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubjects.length > 0 ? (
                filteredSubjects.map((subject) => (
                  <tr key={subject._id}>
                    <td className="border px-4 py-2">{subject.name}</td>
                    <td className="border px-4 py-2">{subject.subjectCode}</td>
                    <td className="border px-4 py-2">
                      {subject?.class?.value}
                    </td>
                    <td className="border px-4 py-2">{subject.marks}</td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => openEditModal(subject)}
                        className="mr-2 text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteConfirmation(subject._id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="border px-4 py-2 text-center">
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
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Subject</h2>
            <form onSubmit={handleSubmit(onEditSubmit)}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Subject Name
                </label>
                <input
                  {...register("name", { required: true })}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Enter subject name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">Name is required</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Subject Code
                </label>
                <input
                  {...register("code", { required: true })}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Enter subject code"
                />
                {errors.code && (
                  <p className="text-red-500 text-sm">Code is required</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Class</label>
                <input
                  {...register("class", { required: true })}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Enter class"
                />
                {errors.class && (
                  <p className="text-red-500 text-sm">Class is required</p>
                )}
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Marks</label>
                <input
                  {...register("marks", { required: true })}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Enter marks"
                />
                {errors.marks && (
                  <p className="text-red-500 text-sm">Marks are required</p>
                )}
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
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
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this subject?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectList;

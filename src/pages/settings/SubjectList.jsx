import axios from "axios";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import useAxios from "../../hooks/useAxios";

const groups = ["general", "science", "humanities", "business"];

const SubjectList = () => {
  const { gurdedApi } = useAxios();
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [subjectToDelete, setSubjectToDelete] = useState(null);
  const [teacherSubjects, setTeacherSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const url = import.meta.env.VITE_SERVER_BASE_URL;
  const {
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await gurdedApi.get(`/class`);
        const classNames = response.data.classes;
        setClasses(classNames);
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
        setTeacherSubjects(data);
        setFilteredSubjects(data); // Initially set all subjects
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

    // Only filter when both classId and group are provided
    if (updatedClass && updatedGroup) {
      const filtered = teacherSubjects.filter(
        (subject) =>
          subject.class._id === updatedClass && subject.group === updatedGroup
      );
      setFilteredSubjects(filtered);
    } else {
      // Clear the filtered subjects or reset based on your requirements
      setFilteredSubjects([]);
    }
  };

  const openEditModal = (subject) => {
    setEditingSubject(subject);
    reset({
      name: subject.name,
      code: subject.subjectCode,
      marks: subject.marks,
    });
    setIsEditModalOpen(true);
  };

  const onEditSubmit = async (data) => {
    try {
      const response = await axios.put(`${url}/subject/${editingSubject._id}`, {
        name: data.name,
        subjectCode: data.code,
        marks: data.marks,
      });

      if (response.status === 200) {
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
        setIsEditModalOpen(false);
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
        toast.success("Subject deleted successfully");
        setSubjects((prev) =>
          prev.filter((subject) => subject._id !== subjectToDelete)
        );
        setFilteredSubjects((prev) =>
          prev.filter((subject) => subject._id !== subjectToDelete)
        );
        setIsDeleteModalOpen(false);
      }
    } catch (error) {
      toast.error("Failed to delete the subject");
      console.error(error);
      setIsDeleteModalOpen(false);
    }
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <div>
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            name="className"
            onChange={(e) => handleFilterChange(e.target.value, null)}
            className="w-full rounded-lg border border-stroke py-2 px-4 text-black bg-white dark:bg-boxdark dark:text-white"
          >
            <option value="">Select Class</option>
            {classes.map((cls) => (
              <option key={cls._id} value={cls._id}>
                {cls.name}
              </option>
            ))}
          </select>
          <select
            name="group"
            onChange={(e) => handleFilterChange(null, e.target.value)}
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
                  <td
                    colSpan="5"
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
    </div>
  );
};

export default SubjectList;

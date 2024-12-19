import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAxios from "../../hooks/useAxios";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import EmptyState from "./EmptyState";
import ErrorState from "./ErrorState";
import LoadingState from "./LoadingState";
import StudentEditModal from "./StudentEditModal";
import StudentTable from "./StudentTable";
import StudentViewModal from "./StudentViewModal";

import useSingleUser from "../../hooks/useSingleUser";

import FilterStudents from "./FilterStudents";
import GlobalLoadingState from "../../components/GlobalLoadingState/GlobalLoadingState";

const StudentList = () => {
  const { gurdedApi } = useAxios();
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const { getUser, loading } = useSingleUser();
  const [filterStudent, setFilterStudent] = useState([]);

  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await gurdedApi.get(`/class`);
        const classNames = response.data.classes;
        setClasses(classNames);
      } catch (error) {
        toast.error("Failed to fetch classes");
      }
    };

    fetchClasses();
  }, [gurdedApi]);

  const getStudents = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await gurdedApi.get("/getAllStudent");

      if (response.status === 200) {
        //const data =
        setStudents(response.data.data);

        setFilteredStudents(response.data.data); // Initialize filtered students
      }
    } catch (error) {
      //console.error(error);
      setError(error.response?.data?.message || "Failed to fetch students");
      toast.error(`Error: ${error.response?.data?.message || "Unknown error"}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getStudents();
  }, [gurdedApi]);

  // const handleFilter = (filterCriteria) => {
  //   const filtered = students.filter((student) => {
  //     return (
  //       (!filterCriteria.year || student.year === filterCriteria.year) &&
  //       (!filterCriteria.shift || student.shift === filterCriteria.shift) &&
  //       (!filterCriteria.class || student.class === filterCriteria.class) &&
  //       (!filterCriteria.group || student.group === filterCriteria.group) &&
  //       (!filterCriteria.section || student.section === filterCriteria.section)
  //     );
  //   });
  //   setFilteredStudents(filtered);
  //   console.log("filter:", filtered);
  // };

  const handleFilter = (filterCriteria) => {
    const filtered = students.filter((student) => {
      return (
        (!filterCriteria.year ||
          student.year.toString() === filterCriteria.year) &&
        (!filterCriteria.shift || student.shift === filterCriteria.shift) &&
        (!filterCriteria.class || student.class === filterCriteria.class) &&
        (!filterCriteria.group || student.group === filterCriteria.group) &&
        (!filterCriteria.section || student.section === filterCriteria.section)
      );
    });

    if (filtered.length === 0) {
      console.warn("No students matched the filter criteria:", filterCriteria);
    }

    setFilteredStudents(filtered);
    console.log("filter:", filtered);
  };

  const handleView = (student) => {
    setSelectedStudent(student);
    setOpenModal(true);
    setIsEditing(false);
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setOpenModal(true);
    setIsEditing(true);
  };

  const handleDelete = (student) => {
    setSelectedStudent(student);
    setConfirmDelete(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setConfirmDelete(false);
    setSelectedStudent(null);
    setIsEditing(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await gurdedApi.put(
        `/student/${selectedStudent?.studentId}`,
        selectedStudent
      );
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.studentId === selectedStudent.studentId
            ? selectedStudent
            : student
        )
      );
      toast.success("Student updated successfully");
      handleCloseModal();
    } catch (error) {
      toast.error("Failed to update student");
      console.error(error);
    }
  };

  const confirmDeleteStudent = async () => {
    try {
      await gurdedApi.delete(`/student/${selectedStudent._id}`);
      await getStudents();
      toast.success("Student deleted successfully");
      handleCloseModal();
    } catch (error) {
      toast.error("Failed to delete student");
      console.error(error);
    }
  };

  useEffect(() => {
    if (students && getUser.userType === "teacher") {
      const data = students.filter(
        (item) =>
          item.class === getUser.class_id.name &&
          item.section === getUser.section &&
          item.shift === getUser.shift
      );
      setFilterStudent(data);
    }
  }, [getUser]);

  if (isLoading) return <LoadingState />;

  if (isLoading) return <GlobalLoadingState />;

  if (error) return <ErrorState error={error} />;
  if (!filteredStudents.length) return <EmptyState />;

  return (
    <>
      {/* <StudentTable
        students={filterStudent}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      /> */}

      {selectedStudent && openModal && !isEditing && (
        <StudentViewModal
          student={selectedStudent}
          onClose={handleCloseModal}
        />
      )}

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Student List
          </h3>
        </div>
        <div className="p-6.5 space-y-5">
          <FilterStudents classes={classes} onFilter={handleFilter} />
          <StudentTable
            students={filteredStudents}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          {selectedStudent && openModal && !isEditing && (
            <StudentViewModal
              student={selectedStudent}
              onClose={handleCloseModal}
            />
          )}

          {selectedStudent && openModal && isEditing && (
            <StudentEditModal
              student={selectedStudent}
              onSubmit={handleFormSubmit}
              onChange={setSelectedStudent}
              onClose={handleCloseModal}
            />
          )}

          {confirmDelete && (
            <DeleteConfirmationModal
              onConfirm={confirmDeleteStudent}
              onClose={handleCloseModal}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default StudentList;

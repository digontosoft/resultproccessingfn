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

const StudentList = () => {
  const { gurdedApi } = useAxios();
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const {getUser,loading} = useSingleUser()
  const [filterStudent,setFilterStudent] = useState([])
  
console.log(getUser);

  

  const getStudents = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await gurdedApi.get("/getAllStudent");

      if (response.status === 200) {
        //const data = 
        setStudents(response.data.data);
        //console.log("students:", response.data.data);
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

  useEffect(()=>{
    if(students) {
      const data =  students.filter((item)=>item.class===getUser.class_id.name)
      setFilterStudent(data)
    }
  },[getUser])
  
  

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;
  if (!students.length) return <EmptyState />;

  return (
    <>
      <StudentTable
        students={filterStudent}
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
    </>
  );
};

export default StudentList;

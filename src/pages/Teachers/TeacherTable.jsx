import { useState, useEffect } from "react";
import AssignClassAndSubject from "./AssignClassAndSubject";
import axios from "axios";
import { toast } from "react-toastify";

const TeacherTable = () => {
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const url = import.meta.env.VITE_SERVER_BASE_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${url}/users?userType=teacher`);
        const allUsers = response.data.data;
        setTeachers(allUsers);
        // console.log("first", allUsers);
      } catch (error) {
        toast.error("Failed to fetch users");
        console.error(error);
      }
    };

    fetchUsers();
  }, [url]);

  const handleAssignClick = (teacher) => {
    setSelectedTeacher(teacher);
    setIsModalOpen(true);
  };

  return (
    <div className="teacher-table">
      <table className="table-auto w-full border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.id}>
              <td className="border px-4 py-2">
                {teacher?.firstName} {teacher?.lastName}
              </td>
              <td className="border px-4 py-2">{teacher.email}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() => handleAssignClick(teacher)}
                >
                  Assign
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <AssignClassAndSubject
          teacher={selectedTeacher}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default TeacherTable;

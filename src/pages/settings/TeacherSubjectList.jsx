import { useEffect, useState } from "react";
import axios from "axios";

const TeacherSubjectList = () => {
  const [teacherSubjects, setTeacherSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [deleteId, setDeleteId] = useState(null); // Track the ID being deleted
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal open state
  const url = import.meta.env.VITE_SERVER_BASE_URL;

  useEffect(() => {
    const fetchTeacherSubjects = async () => {
      try {
        const response = await axios.get(`${url}/teacher-subjects`);
        setTeacherSubjects(response.data.data);
        console.log("teacherSubjects", response.data.data);
      } catch (error) {
        console.error("Error fetching teacher subjects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherSubjects();
  }, [url]);

  const handleDeleteClick = (teacherId) => {
    setDeleteId(teacherId);
    setIsModalOpen(true); // Open the modal on delete button click
  };

  const handleDelete = async (teacherId) => {
    setDeleting(true);
    try {
      await axios.delete(`${url}/teacher-subjects/${teacherId}`);
      setTeacherSubjects((prev) =>
        prev.filter((teacher) => teacher._id !== teacherId)
      );
      console.log(`Deleted teacher subject with ID: ${teacherId}`);
    } catch (error) {
      console.error("Error deleting teacher subject:", error);
    } finally {
      setDeleting(false);
      setIsModalOpen(false); // Close the modal after deletion
      setDeleteId(null); // Reset the ID being deleted
    }
  };

  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-2xl font-semibold mb-6 text-center text-blue-600">
        Teacher Subject List
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : teacherSubjects.length === 0 ? (
        <p className="text-center text-gray-500">No data available</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300 bg-white">
            <thead>
              <tr className="bg-blue-100 text-gray-700">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Teacher Name
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Class
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Shift
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Subjects
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {teacherSubjects.map((teacher) => (
                <tr key={teacher._id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">
                    {teacher?.teacher_id?.firstName}{" "}
                    {teacher?.teacher_id?.lastName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {teacher.ClassVsSubject.map((cls, idx) => (
                      <div key={idx}>{cls.class_id.name}</div>
                    ))}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {teacher.ClassVsSubject.map((cls, idx) => (
                      <div key={idx}>{cls.shift}</div>
                    ))}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {teacher.ClassVsSubject.map((cls, idx) => (
                      <div key={idx}>
                        {cls.subjects.map((subject, subIdx) => (
                          <span
                            key={subIdx}
                            className="inline-block bg-blue-200 text-blue-800 text-sm px-2 py-1 rounded-full mr-2 mb-1"
                          >
                            {subject.name}
                          </span>
                        ))}
                      </div>
                    ))}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      onClick={() => handleDeleteClick(teacher._id)}
                      className={`bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ${
                        deleting && deleteId === teacher._id
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      disabled={deleting && deleteId === teacher._id}
                    >
                      {deleting && deleteId === teacher._id
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Delete Teacher Subject
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this teacher's subject
              assignments?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherSubjectList;

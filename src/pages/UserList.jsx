import { useEffect, useState } from "react";
import ProfileTable from "./userList/UserTable";
import StudentViewModal from "./students/StudentViewModal";
import StudentEditModal from "./students/StudentEditModal";
import DeleteConfirmationModal from "./students/DeleteConfirmationModal";
import { gurdedApi } from "../api";
import AddUser from "./userList/AddUser";
import { toast } from "react-toastify";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const UserList = () => {
  const [profile, setProfile] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { auth } = useAuth();
  const authToken = auth.token;
  const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;
  const getUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      // const response = await gurdedApi.get("/users");
      const response = await axios.get(`${baseUrl}/users`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      console.log("rwessd", response);
      if (response.status === 200) {
        setProfile(response?.data.data);
        console.log("profile:", response.data.data);
      }
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Failed to fetch users");
      toast.error(`Error: ${error.response?.data?.message || "Unknown error"}`);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  const handleView = (profile) => {
    setSelectedProfile(profile);
    setOpenModal(true);
    setIsEditing(false);
  };

  const handleEdit = (profile) => {
    setSelectedProfile(profile);
    setOpenModal(true);
    setIsEditing(true);
  };

  const handleDelete = (profile) => {
    setSelectedProfile(profile);
    setConfirmDelete(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setConfirmDelete(false);
    setSelectedProfile(null);
    setIsEditing(false);
  };
  const confirmDeleteProfile = () => {
    setProfile((prevProfile) =>
      prevProfile.filter((p) => p.email !== selectedProfile.email)
    );
    console.log("Profile deleted successfully");
    handleCloseModal();
  };

  return (
    <>
      <AddUser />
      <ProfileTable
        profile={profile}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {selectedProfile && openModal && !isEditing && (
        <StudentViewModal
          student={selectedProfile}
          onClose={handleCloseModal}
        />
      )}

      {selectedProfile && openModal && isEditing && (
        <StudentEditModal
          student={selectedProfile}
          onSubmit={handleFormSubmit}
          onChange={setSelectedProfile}
          onClose={handleCloseModal}
        />
      )}

      {confirmDelete && (
        <DeleteConfirmationModal
          onConfirm={confirmDeleteProfile}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};
export default UserList;

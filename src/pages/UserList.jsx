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
import UserViewModal from "./userList/UserViewModal";
import UserEditModal from "./userList/UserEditModal";

const UserList = () => {
  const [profile, setProfile] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [classes, setClasses] = useState([]);
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

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(`${baseUrl}/class`);
        const classNames = response.data.classes;
        setClasses(classNames);
      } catch (error) {
        toast.error("Failed to fetch classes");
      }
    };

    fetchClasses();
  }, [baseUrl]);

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
  const handleFormSubmit = async (e) => {
    console.log("profile:", selectedProfile);
    e.preventDefault();
    try {
      await axios.put(`${baseUrl}/teacher/${selectedProfile?._id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        ...selectedProfile,
      });
      setProfile((prevUser) =>
        prevUser.map((profile) =>
          profile._id === selectedProfile._id ? selectedProfile : profile
        )
      );
      toast.success("Profile updated successfully");
      handleCloseModal();
    } catch (error) {
      toast.error("Failed to update profile");
      console.error(error);
    }
  };
  const confirmDeleteProfile = async () => {
    setProfile((prevProfile) =>
      prevProfile.filter((p) => p._id !== profile._id)
    );
    console.log("Profile deleted successfully:", selectedProfile._id);
    handleCloseModal();
    try {
      await gurdedApi.delete(`/user/${selectedProfile._id}`);
      await getUsers();
      toast.success("Profile deleted successfully");
      handleCloseModal();
    } catch (error) {
      toast.error("Failed to delete student");
      console.error(error);
    }
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
        <UserViewModal profile={selectedProfile} onClose={handleCloseModal} />
      )}

      {selectedProfile && openModal && isEditing && (
        <UserEditModal
          profile={selectedProfile}
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

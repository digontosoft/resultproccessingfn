import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Modal from '../components/Modal/Modal';
import useAxios from '../hooks/useAxios';

const StudentList = () => {
	const { gurdedApi } = useAxios();
	const [students, setStudents] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [openModal, setOpenModal] = useState(false);
	const [selectedStudent, setSelectedStudent] = useState(null);
	const [isEditing, setIsEditing] = useState(false);
	const [confirmDelete, setConfirmDelete] = useState(false);

	const getStudents = async () => {
		try {
			setIsLoading(true);
			setError(null);
			const response = await gurdedApi.get('/users');

			if (response.status === 200) {
				const filteredStudents = response.data.data.filter(
					(user) => user.userType === 'student'
				);
				setStudents(filteredStudents);
			}
		} catch (error) {
			console.error(error);
			setError(error.response?.data?.message || 'Failed to fetch students');
			toast.error(`Error: ${error.response?.data?.message || 'Unknown error'}`);
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
			await gurdedApi.put(`/user/${selectedStudent.id}`, selectedStudent);
			setStudents((prevStudents) =>
				prevStudents.map((student) =>
					student.id === selectedStudent.id ? selectedStudent : student
				)
			);
			toast.success('Student updated successfully');
			handleCloseModal();
		} catch (error) {
			toast.error('Failed to update student');
			console.error(error);
		}
	};

	const confirmDeleteStudent = async () => {
		try {
			await gurdedApi.delete(`/user/${selectedStudent._id}`);

			await getStudents();
			toast.success('Student deleted successfully');
			handleCloseModal();
		} catch (error) {
			toast.error('Failed to delete student');
			console.error(error);
		}
	};

	if (isLoading) {
		return (
			<div className="flex h-[400px] items-center justify-center rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
				<div className="flex flex-col items-center gap-2">
					<div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
					<p className="text-sm text-gray-500 dark:text-gray-400">
						Loading students...
					</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="rounded-sm border border-stroke bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark">
				<div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:bg-red-900/50 dark:text-red-400">
					{error}
				</div>
			</div>
		);
	}

	if (!students.length) {
		return (
			<div className="rounded-sm border border-stroke bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark">
				<div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600 dark:bg-gray-800 dark:text-gray-400">
					No students found.
				</div>
			</div>
		);
	}

	return (
		<>
			<div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
				<div className="max-w-full overflow-x-auto">
					<table className="w-full table-auto">
						<thead>
							<tr className="bg-gray-2 text-left dark:bg-meta-4">
								<th className="py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
									Name
								</th>
								<th className="py-4 px-4 font-medium text-black dark:text-white">
									Email
								</th>
								<th className="py-4 px-4 font-medium text-black dark:text-white">
									Phone
								</th>
								<th className="py-4 px-4 font-medium text-black dark:text-white">
									Class
								</th>
								<th className="py-4 px-4 font-medium text-black dark:text-white">
									Section
								</th>
								<th className="py-4 px-4 font-medium text-black dark:text-white">
									Action
								</th>
							</tr>
						</thead>
						<tbody>
							{students.map((student, index) => (
								<tr key={index}>
									<td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
										<h5 className="font-medium text-black dark:text-white">
											{`${student?.firstName} ${student?.lastName}`}
										</h5>
									</td>
									<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
										<p className="text-black dark:text-white">
											{student?.email}
										</p>
									</td>
									<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
										<p className="text-black dark:text-white">
											{student?.phoneNumber}
										</p>
									</td>
									<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
										<p className="text-black dark:text-white">
											{student?.class}
										</p>
									</td>
									<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
										<p className="text-black dark:text-white">
											{student?.section}
										</p>
									</td>
									<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
										<div className="flex items-center space-x-3.5">
											<button
												className="hover:text-primary"
												onClick={() => handleView(student)}
											>
												<img
													src="/view.svg"
													alt="view icon"
													width={18}
													height={18}
												/>
											</button>
											<button
												className="hover:text-primary"
												onClick={() => handleEdit(student)}
											>
												<img
													src="/edit.svg"
													alt="edit icon"
													width={18}
													height={18}
												/>
											</button>
											<button
												className="hover:text-primary"
												onClick={() => handleDelete(student)}
											>
												<img
													src="/delete.svg"
													alt="delete icon"
													width={18}
													height={18}
												/>
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{selectedStudent && (
				<Modal open={openModal} onClose={handleCloseModal}>
					{!isEditing ? (
						<div className="w-[500px]">
							<h2 className="text-xl font-semibold mb-4">
								{`${selectedStudent.firstName} ${selectedStudent.lastName}`}
							</h2>
							<p>
								<strong>Email: </strong>
								{selectedStudent.email}
							</p>
							<p>
								<strong>Phone: </strong>
								{selectedStudent.phoneNumber}
							</p>
							<p>
								<strong>Class: </strong>
								{selectedStudent.class}
							</p>
							<p>
								<strong>Section: </strong>
								{selectedStudent.section}
							</p>
						</div>
					) : (
						<form onSubmit={handleFormSubmit} className="text-black">
							<div className="grid grid-cols-2 gap-4">
								<div>
									<label className="block mb-2 text-sm font-medium">
										First Name
									</label>
									<input
										type="text"
										value={selectedStudent.firstName}
										onChange={(e) =>
											setSelectedStudent({
												...selectedStudent,
												firstName: e.target.value,
											})
										}
										className="border p-2 w-full mb-4"
									/>
								</div>
								<div>
									<label className="block mb-2 text-sm font-medium">
										Last Name
									</label>
									<input
										type="text"
										value={selectedStudent.lastName}
										onChange={(e) =>
											setSelectedStudent({
												...selectedStudent,
												lastName: e.target.value,
											})
										}
										className="border p-2 w-full mb-4"
									/>
								</div>
							</div>
							<label className="block mb-2 text-sm font-medium">Email</label>
							<input
								type="email"
								value={selectedStudent.email}
								onChange={(e) =>
									setSelectedStudent({
										...selectedStudent,
										email: e.target.value,
									})
								}
								className="border p-2 w-full mb-4"
							/>
							<label className="block mb-2 text-sm font-medium">
								Phone Number
							</label>
							<input
								type="tel"
								value={selectedStudent.phoneNumber}
								onChange={(e) =>
									setSelectedStudent({
										...selectedStudent,
										phoneNumber: e.target.value,
									})
								}
								className="border p-2 w-full mb-4"
							/>
							<div className="grid grid-cols-2 gap-4">
								<div>
									<label className="block mb-2 text-sm font-medium">
										Class
									</label>
									<input
										type="text"
										value={selectedStudent.class}
										onChange={(e) =>
											setSelectedStudent({
												...selectedStudent,
												class: e.target.value,
											})
										}
										className="border p-2 w-full mb-4"
									/>
								</div>
								<div>
									<label className="block mb-2 text-sm font-medium">
										Section
									</label>
									<input
										type="text"
										value={selectedStudent.section}
										onChange={(e) =>
											setSelectedStudent({
												...selectedStudent,
												section: e.target.value,
											})
										}
										className="border p-2 w-full mb-4"
									/>
								</div>
							</div>
							<button type="submit" className="bg-primary text-white py-2 px-4">
								Save Changes
							</button>
						</form>
					)}
				</Modal>
			)}

			{confirmDelete && (
				<Modal open={confirmDelete} onClose={handleCloseModal}>
					<div className="text-center">
						<p className="text-xl text-black mb-4">
							Are you sure you want to delete this student?
						</p>
						<div className="flex justify-center space-x-4">
							<button
								className="bg-danger text-white py-2 px-4"
								onClick={confirmDeleteStudent}
							>
								Yes, Delete
							</button>
							<button
								className="bg-gray-300 text-gray-800 py-2 px-4"
								onClick={handleCloseModal}
							>
								Cancel
							</button>
						</div>
					</div>
				</Modal>
			)}
		</>
	);
};

export default StudentList;

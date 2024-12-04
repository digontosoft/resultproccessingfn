import React from 'react';
import Modal from '../../components/Modal/Modal';

const StudentViewModal = ({ student, onClose }) => {
	return (
		<Modal open={true} onClose={onClose}>
			<div className="max-w-3xl p-6 max-h-96 overflow-y-auto">
				<div className="border-b pb-4 mb-6">
					<h2 className="text-2xl font-semibold text-gray-800">
						{`${student.firstName} ${student.lastName}`}
					</h2>
					<p className="text-gray-600">Student ID: {student.studentId}</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
					{/* Personal Information Section */}
					<div className="col-span-1 md:col-span-2">
						<h3 className="text-lg font-semibold mb-3 text-gray-700">
							Personal Information
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<p className="mb-2">
									<span className="font-medium text-gray-700">
										First Name:{' '}
									</span>
									<span>{student.firstName}</span>
								</p>
								<p className="mb-2">
									<span className="font-medium text-gray-700">Last Name: </span>
									<span>{student.lastName}</span>
								</p>
								<p className="mb-2">
									<span className="font-medium text-gray-700">Email: </span>
									<span>{student.email}</span>
								</p>
								<p className="mb-2">
									<span className="font-medium text-gray-700">Phone: </span>
									<span>{student.phoneNumber}</span>
								</p>
							</div>
							<div>
								<p className="mb-2">
									<span className="font-medium text-gray-700">
										Date of Birth:{' '}
									</span>
									<span>
										{new Date(student.dateOfBirth).toLocaleDateString()}
									</span>
								</p>
								<p className="mb-2">
									<span className="font-medium text-gray-700">Religion: </span>
									<span>{student.religion}</span>
								</p>
								<p className="mb-2">
									<span className="font-medium text-gray-700">Status: </span>
									<span className="capitalize">{student.userStatus}</span>
								</p>
								<p className="mb-2">
									<span className="font-medium text-gray-700">User Type: </span>
									<span className="capitalize">{student.userType}</span>
								</p>
							</div>
						</div>
					</div>

					{/* Academic Information Section */}
					<div className="col-span-1 md:col-span-2">
						<h3 className="text-lg font-semibold mb-3 mt-4 text-gray-700">
							Academic Information
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<p className="mb-2">
									<span className="font-medium text-gray-700">Class: </span>
									<span>{student.class}</span>
								</p>
								<p className="mb-2">
									<span className="font-medium text-gray-700">Section: </span>
									<span>{student.section}</span>
								</p>
							</div>
							<div>
								<p className="mb-2">
									<span className="font-medium text-gray-700">Shift: </span>
									<span>{student.shift}</span>
								</p>
								<p className="mb-2">
									<span className="font-medium text-gray-700">Group: </span>
									<span>{student.group}</span>
								</p>
							</div>
						</div>
					</div>

					{/* Family Information Section */}
					<div className="col-span-1 md:col-span-2">
						<h3 className="text-lg font-semibold mb-3 mt-4 text-gray-700">
							Family Information
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<p className="mb-2">
								<span className="font-medium text-gray-700">
									Father's Name:{' '}
								</span>
								<span>{student.fatherName}</span>
							</p>
							<p className="mb-2">
								<span className="font-medium text-gray-700">
									Mother's Name:{' '}
								</span>
								<span>{student.motherName}</span>
							</p>
						</div>
					</div>

					{/* Address Section */}
					<div className="col-span-1 md:col-span-2">
						<h3 className="text-lg font-semibold mb-3 mt-4 text-gray-700">
							Address
						</h3>
						<p className="mb-2">{student.address}</p>
					</div>
				</div>

				<div className="mt-6 text-right">
					<button
						onClick={onClose}
						className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300"
					>
						Close
					</button>
				</div>
			</div>
		</Modal>
	);
};

export default StudentViewModal;

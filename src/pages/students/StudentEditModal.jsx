import Modal from '../../components/Modal/Modal';

const StudentEditModal = ({ student, onSubmit, onChange, onClose }) => {
	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(e);
	};

	return (
		<Modal open={true} onClose={onClose}>
			<form
				onSubmit={handleSubmit}
				className="text-black max-h-150 overflow-y-auto p-4"
			>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{/* Personal Information */}
					<div>
						<label className="block mb-2 text-sm font-medium">
							Student Name
						</label>
						<input
							type="text"
							value={student?.studentName}
							onChange={(e) =>
								onChange({ ...student, firstName: e.target.value })
							}
							className="border rounded p-2 w-full mb-4"
						/>
					</div>
					<div>
						<label className="block mb-2 text-sm font-medium">
							Phone Number
						</label>
						<input
							type="tel"
							value={student?.mobile}
							onChange={(e) => onChange({ ...student, mobile: e.target.value })}
							className="border rounded p-2 w-full mb-4"
						/>
					</div>

					{/* Academic Information */}
					<div>
						<label className="block mb-2 text-sm font-medium">Class</label>
						<input
							type="text"
							value={student?.class}
							onChange={(e) => onChange({ ...student, class: e.target.value })}
							className="border rounded p-2 w-full mb-4"
						/>
					</div>
					<div>
						<label className="block mb-2 text-sm font-medium">Section</label>
						<input
							type="text"
							value={student?.section}
							onChange={(e) =>
								onChange({ ...student, section: e.target.value })
							}
							className="border rounded p-2 w-full mb-4"
						/>
					</div>
					<div>
						<label className="block mb-2 text-sm font-medium">Shift</label>
						<input
							type="text"
							value={student?.shift}
							onChange={(e) => onChange({ ...student, shift: e.target.value })}
							className="border rounded p-2 w-full mb-4"
						/>
					</div>
					<div>
						<label className="block mb-2 text-sm font-medium">Group</label>
						<input
							type="text"
							value={student?.group}
							onChange={(e) => onChange({ ...student, group: e.target.value })}
							className="border rounded p-2 w-full mb-4"
						/>
					</div>

					{/* Family Information */}
					<div>
						<label className="block mb-2 text-sm font-medium">
							Father's Name
						</label>
						<input
							type="text"
							value={student?.fatherName}
							onChange={(e) =>
								onChange({ ...student, fatherName: e.target.value })
							}
							className="border rounded p-2 w-full mb-4"
						/>
					</div>

					{/* Other Information */}
					<div>
						<label className="block mb-2 text-sm font-medium">Religion</label>
						<input
							type="text"
							value={student?.religion}
							onChange={(e) =>
								onChange({ ...student, religion: e.target.value })
							}
							className="border rounded p-2 w-full mb-4"
						/>
					</div>

					{/* Full Width Fields */}

					{/* Read-only Fields */}
					<div>
						<label className="block mb-2 text-sm font-medium">Student ID</label>
						<input
							type="text"
							value={student?.studentId}
							readOnly
							className="border rounded p-2 w-full mb-4 bg-gray-100"
						/>
					</div>
				</div>

				<div className="flex justify-end gap-4 mt-6">
					<button
						type="button"
						onClick={onClose}
						className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300"
					>
						Cancel
					</button>
					<button
						type="submit"
						className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
					>
						Save Changes
					</button>
				</div>
			</form>
		</Modal>
	);
};

export default StudentEditModal;

import Modal from '../../components/Modal/Modal';

const StudentEditModal = ({ student, onSubmit, onChange, onClose }) => {
	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(e);
	};

	return (
		<Modal open={true} onClose={onClose}>
			<form onSubmit={handleSubmit} className="text-black">
				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className="block mb-2 text-sm font-medium">First Name</label>
						<input
							type="text"
							value={student.firstName}
							onChange={(e) =>
								onChange({ ...student, firstName: e.target.value })
							}
							className="border p-2 w-full mb-4"
						/>
					</div>
					<div>
						<label className="block mb-2 text-sm font-medium">Last Name</label>
						<input
							type="text"
							value={student.lastName}
							onChange={(e) =>
								onChange({ ...student, lastName: e.target.value })
							}
							className="border p-2 w-full mb-4"
						/>
					</div>
				</div>
				<label className="block mb-2 text-sm font-medium">Email</label>
				<input
					type="email"
					value={student.email}
					onChange={(e) => onChange({ ...student, email: e.target.value })}
					className="border p-2 w-full mb-4"
				/>
				<label className="block mb-2 text-sm font-medium">Phone Number</label>
				<input
					type="tel"
					value={student.phoneNumber}
					onChange={(e) =>
						onChange({ ...student, phoneNumber: e.target.value })
					}
					className="border p-2 w-full mb-4"
				/>
				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className="block mb-2 text-sm font-medium">Class</label>
						<input
							type="text"
							value={student.class}
							onChange={(e) => onChange({ ...student, class: e.target.value })}
							className="border p-2 w-full mb-4"
						/>
					</div>
					<div>
						<label className="block mb-2 text-sm font-medium">Section</label>
						<input
							type="text"
							value={student.section}
							onChange={(e) =>
								onChange({ ...student, section: e.target.value })
							}
							className="border p-2 w-full mb-4"
						/>
					</div>
				</div>
				<button type="submit" className="bg-primary text-white py-2 px-4">
					Save Changes
				</button>
			</form>
		</Modal>
	);
};

export default StudentEditModal;

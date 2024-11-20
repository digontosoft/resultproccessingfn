import Modal from '../../components/Modal/Modal';

const StudentViewModal = ({ student, onClose }) => {
	return (
		<Modal open={true} onClose={onClose}>
			<div className="w-[500px]">
				<h2 className="text-xl font-semibold mb-4">
					{`${student.firstName} ${student.lastName}`}
				</h2>
				<p>
					<strong>Email: </strong>
					{student.email}
				</p>
				<p>
					<strong>Phone: </strong>
					{student.phoneNumber}
				</p>
				<p>
					<strong>Class: </strong>
					{student.class}
				</p>
				<p>
					<strong>Section: </strong>
					{student.section}
				</p>
			</div>
		</Modal>
	);
};

export default StudentViewModal;

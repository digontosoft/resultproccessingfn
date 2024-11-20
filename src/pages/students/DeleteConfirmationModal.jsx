import Modal from '../../components/Modal/Modal';

const DeleteConfirmationModal = ({ onConfirm, onClose }) => {
	return (
		<Modal open={true} onClose={onClose}>
			<div className="text-center">
				<p className="text-xl text-black mb-4">
					Are you sure you want to delete this student?
				</p>
				<div className="flex justify-center space-x-4">
					<button
						className="bg-danger text-white py-2 px-4"
						onClick={onConfirm}
					>
						Yes, Delete
					</button>
					<button
						className="bg-gray-300 text-gray-800 py-2 px-4"
						onClick={onClose}
					>
						Cancel
					</button>
				</div>
			</div>
		</Modal>
	);
};

export default DeleteConfirmationModal;

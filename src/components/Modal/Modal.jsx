const Modal = ({ open, onClose, children }) => {
	return (
		// backdrop
		<div
			onClick={onClose}
			className={`
        z-[9999] fixed inset-0 flex justify-center items-center transition-colors
        ${open ? 'visible bg-black/70' : 'invisible'}
      `}
		>
			{/* modal */}
			<div
				onClick={(e) => e.stopPropagation()}
				className={`
          bg-white rounded-xl shadow p-6 transition-all
          ${open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'}
        `}
			>
				<button
					onClick={onClose}
					className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="icon icon-tabler icons-tabler-outline icon-tabler-x"
					>
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path d="M18 6l-12 12" />
						<path d="M6 6l12 12" />
					</svg>
				</button>
				{children}
			</div>
		</div>
	);
};

export default Modal;

const StudentTableRow = ({ student, onView, onEdit, onDelete }) => {
	return (
		<tr>
			<td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
				<h5 className="font-medium text-black dark:text-white">
					{`${student?.firstName} ${student?.lastName}`}
				</h5>
			</td>
			<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
				<p className="text-black dark:text-white">{student?.email}</p>
			</td>
			<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
				<p className="text-black dark:text-white">{student?.phoneNumber}</p>
			</td>
			<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
				<p className="text-black dark:text-white">{student?.class}</p>
			</td>
			<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
				<p className="text-black dark:text-white">{student?.section}</p>
			</td>
			<td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
				<div className="flex items-center space-x-3.5">
					<button
						className="hover:text-primary"
						onClick={() => onView(student)}
					>
						<img src="/view.svg" alt="view icon" width={18} height={18} />
					</button>
					<button
						className="hover:text-primary"
						onClick={() => onEdit(student)}
					>
						<img src="/edit.svg" alt="edit icon" width={18} height={18} />
					</button>
					<button
						className="hover:text-primary"
						onClick={() => onDelete(student)}
					>
						<img src="/delete.svg" alt="delete icon" width={18} height={18} />
					</button>
				</div>
			</td>
		</tr>
	);
};

export default StudentTableRow;

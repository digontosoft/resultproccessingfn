import StudentTableRow from './StudentTableRow';

const StudentTable = ({ students, onView, onEdit, onDelete }) => {
	return (
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
							<StudentTableRow
								key={index}
								student={student}
								onView={onView}
								onEdit={onEdit}
								onDelete={onDelete}
							/>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default StudentTable;
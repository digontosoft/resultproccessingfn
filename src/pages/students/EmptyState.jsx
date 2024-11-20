const EmptyState = () => {
	return (
		<div className="rounded-sm border border-stroke bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark">
			<div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600 dark:bg-gray-800 dark:text-gray-400">
				No students found.
			</div>
		</div>
	);
};

export default EmptyState;

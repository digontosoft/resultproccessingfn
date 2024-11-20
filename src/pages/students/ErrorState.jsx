const ErrorState = ({ error }) => {
	return (
		<div className="rounded-sm border border-stroke bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark">
			<div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:bg-red-900/50 dark:text-red-400">
				{error}
			</div>
		</div>
	);
};

export default ErrorState;

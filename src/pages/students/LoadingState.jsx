const LoadingState = () => {
	return (
		<div className="flex h-[400px] items-center justify-center rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
			<div className="flex flex-col items-center gap-2">
				<div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
				<p className="text-sm text-gray-500 dark:text-gray-400">
					Loading students...
				</p>
			</div>
		</div>
	);
};

export default LoadingState;

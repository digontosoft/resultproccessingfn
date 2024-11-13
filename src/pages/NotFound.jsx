import { Link } from 'react-router-dom';

const NotFound = () => {
	return (
		<div className="flex h-screen flex-col items-center justify-center bg-gray-100 text-gray-800">
			<h1 className="text-9xl font-bold">404</h1>
			<p className="mt-4 text-2xl font-semibold">Page Not Found</p>
			<p className="mt-2 text-gray-600">
				Sorry, the page you are looking for does not exist.
			</p>
			<Link
				to="/"
				className="mt-6 rounded bg-blue-500 px-6 py-3 text-white transition hover:bg-blue-600"
			>
				Go Back Home
			</Link>
		</div>
	);
};

export default NotFound;

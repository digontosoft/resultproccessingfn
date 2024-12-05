import { Link } from 'react-router-dom';

const ResultNav = () => {
	return (
		<nav className="bg-white shadow-md py-4">
			<div className="container mx-auto flex justify-between items-center px-4">
				{/* Logo Section */}
				<div className="text-lg font-semibold text-gray-800">
					<Link to="/get-result">
						<img src="/vidyamoyee_logo.png" alt="logo" width={80} />
					</Link>
				</div>

				{/* "Get Result" Button */}
				<div>
					<h4 className="bg-green-700 text-white px-4 py-2 rounded-lg shadow transition">
						Get Result
					</h4>
				</div>
			</div>
		</nav>
	);
};

export default ResultNav;

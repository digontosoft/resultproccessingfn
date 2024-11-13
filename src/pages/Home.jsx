import useAuth from '../hooks/useAuth';

const Home = () => {
	const { auth } = useAuth();
	return (
		<div>
			Home <br /> userType: {auth?.userType}
		</div>
	);
};
export default Home;

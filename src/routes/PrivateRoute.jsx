import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PrivateRoutes = () => {
	const { auth } = useAuth();
	console.log(auth);

	return (
		<>
			{auth?.email ? (
				<>
					<Outlet />
				</>
			) : (
				<Navigate to="/auth/signin" />
			)}
		</>
	);
};
export default PrivateRoutes;

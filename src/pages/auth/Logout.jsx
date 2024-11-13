import { IconLogout2 } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Logout = () => {
	const { setAuth } = useAuth();
	const navigate = useNavigate();
	const handleLogout = () => {
		setAuth({});
		localStorage.removeItem('auth');
		navigate('/auth/signin');
	};

	return (
		<button
			onClick={handleLogout}
			className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
		>
			<IconLogout2 stroke={1.25} />
			Log Out
		</button>
	);
};
export default Logout;

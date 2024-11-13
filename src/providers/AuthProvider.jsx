import { useState } from 'react';
import { AuthContext } from '../context';

const AuthProvider = ({ children }) => {
	const authData = JSON.parse(localStorage.getItem('auth'));

	const [auth, setAuth] = useState(authData ? authData : {});

	return (
		<AuthContext.Provider value={{ auth, setAuth }}>
			{children}
		</AuthContext.Provider>
	);
};
export default AuthProvider;

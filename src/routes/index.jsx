import { Route, Routes } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout';
import NotFound from '../pages/NotFound';
import SignIn from '../pages/auth/SignIn';
import AuthProvider from '../providers/AuthProvider';
import PrivateRoutes from './PrivateRoute';

const AppRoutes = () => {
	return (
		<AuthProvider>
			<Routes>
				<Route path="/auth/signin" index element={<SignIn />} />
				<Route element={<PrivateRoutes />}>
					<Route element={<DefaultLayout />}>
						<Route path="/" index element={<p>Home</p>} />
						<Route
							path="/add-student"
							element={<p className="w-full h-fit bg-red">add-student</p>}
						/>
						<Route path="/add-student-bulk" element={<p>add-student-bulk</p>} />

						<Route
							path="/add-result"
							element={<p className="w-full h-fit bg-red">add-result</p>}
						/>
						<Route path="/add-result-bulk" element={<p>add-result-bulk</p>} />
						<Route path="/manage-users" element={<p>manage-users</p>} />
					</Route>
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</AuthProvider>
	);
};
export default AppRoutes;

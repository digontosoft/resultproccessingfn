import { Route, Routes } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout';
import AddResult from '../pages/AddResult';
import AddResultsBulk from '../pages/AddResultsBulk';
import AddStudents from '../pages/AddStudents';
import AddStudentsBulk from '../pages/AddStudentsBulk';
import Home from '../pages/Home';
import ManageUsers from '../pages/ManageUsers';
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';
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
						<Route path="/" index element={<Home />} />
						<Route path="/add-student" element={<AddStudents />} />
						<Route path="/add-student-bulk" element={<AddStudentsBulk />} />

						<Route path="/add-result" element={<AddResult />} />
						<Route path="/add-result-bulk" element={<AddResultsBulk />} />
						<Route path="/manage-users" element={<ManageUsers />} />
						<Route path="/profile" element={<Profile />} />
					</Route>
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</AuthProvider>
	);
};
export default AppRoutes;

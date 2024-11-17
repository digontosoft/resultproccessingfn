import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import SidebarItem from './SidebarItem';
import SidebarLinkGroup from './SidebarLinkGroup';
import Logo from '/logo.png';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
	const location = useLocation();
	const { pathname } = location;
	const { auth } = useAuth();
	const userType = auth.userType;

	const trigger = useRef(null);
	const sidebar = useRef(null);

	const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
	const [sidebarExpanded, setSidebarExpanded] = useState(
		storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
	);

	useEffect(() => {
		const clickHandler = ({ target }) => {
			if (!sidebar.current || !trigger.current) return;
			if (
				!sidebarOpen ||
				sidebar.current.contains(target) ||
				trigger.current.contains(target)
			)
				return;
			setSidebarOpen(false);
		};
		document.addEventListener('click', clickHandler);
		return () => document.removeEventListener('click', clickHandler);
	});

	useEffect(() => {
		const keyHandler = ({ keyCode }) => {
			if (!sidebarOpen || keyCode !== 27) return;
			setSidebarOpen(false);
		};
		document.addEventListener('keydown', keyHandler);
		return () => document.removeEventListener('keydown', keyHandler);
	});

	useEffect(() => {
		localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
		if (sidebarExpanded) {
			document.querySelector('body')?.classList.add('sidebar-expanded');
		} else {
			document.querySelector('body')?.classList.remove('sidebar-expanded');
		}
	}, [sidebarExpanded]);

	const adminMenuItems = [
		{
			label: 'Students',
			icon: '/user.svg',
			links: [
				{ to: '/add-student', label: 'Add Student' },
				{ to: '/add-student-bulk', label: 'Add Student Bulk' },
				{ to: '/student-list', label: 'Student List' },
			],
			activeCondition:
				pathname.includes === 'student' || pathname.includes('dashboard'),
		},
		{
			label: 'Results',
			icon: '/text-grammar.svg',
			links: [
				{ to: '/add-result', label: 'Add Result' },
				{ to: '/add-result-bulk', label: 'Add Result Bulk' },
				{ to: '/result-list', label: 'Result List' },
			],
			activeCondition:
				pathname.includes === 'result' || pathname.includes('dashboard'),
		},
		{
			label: 'Manage Users',
			icon: '/users.svg',
			links: [
				{ to: '/add-user', label: 'Add User' },
				{ to: '/user-list', label: 'User List' },
				{ to: '/manage-users', label: 'Manage Users' },
			],
			activeCondition:
				pathname.includes === 'user' || pathname.includes('dashboard'),
		},
	];

	const teacherMenuItems = [
		{
			label: 'Students',
			icon: '/user.svg',
			links: [
				{ to: '/add-student', label: 'Add Student' },
				{ to: '/add-student-bulk', label: 'Add Student Bulk' },
				{ to: '/student-list', label: 'Student List' },
			],
			activeCondition:
				pathname.includes === 'student' || pathname.includes('dashboard'),
		},
		{
			label: 'Results',
			icon: '/text-grammar.svg',
			links: [
				{ to: '/add-result', label: 'Add Result' },
				{ to: '/add-result-bulk', label: 'Add Result Bulk' },
				{ to: '/result-list', label: 'Result List' },
			],
			activeCondition:
				pathname.includes === 'result' || pathname.includes('dashboard'),
		},
	];

	const studentMenuItems = [
		{
			label: 'Results',
			icon: '/report-analytics.svg',
			links: [
				{ to: '/result', label: 'View Result' },
				{ to: '/profile', label: 'Profile' },
			],
			activeCondition:
				pathname.includes === 'result' || pathname.includes('profile'),
		},
	];

	// Function to get menu items based on user type
	const getMenuItems = () => {
		switch (userType) {
			// user type: "admin"
			case 'superadmin':
				return adminMenuItems;
			// UserType: "teacher"
			case 'classadmin':
				return teacherMenuItems;
			// userType: "student"
			case 'student':
				return studentMenuItems;
			default:
				return [];
		}
	};

	return (
		<aside
			ref={sidebar}
			className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
				sidebarOpen ? 'translate-x-0' : '-translate-x-full'
			}`}
		>
			<div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
				<NavLink to="/">
					<img src={Logo} alt="Logo" />
				</NavLink>

				<button
					ref={trigger}
					onClick={() => setSidebarOpen(!sidebarOpen)}
					aria-controls="sidebar"
					aria-expanded={sidebarOpen}
					className="block lg:hidden"
				>
					<img src="/x.svg" stroke={2} color="#fff" />
				</button>
			</div>

			<div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
				<nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
					<div>
						<ul className="mb-6 flex flex-col gap-1.5">
							{getMenuItems().map((item, idx) => (
								<SidebarLinkGroup
									key={idx}
									activeCondition={item.activeCondition}
								>
									{(handleClick, open) => (
										<SidebarItem
											label={item.label}
											icon={item.icon}
											links={item.links}
											open={open}
											onClick={() =>
												sidebarExpanded
													? handleClick()
													: setSidebarExpanded(true)
											}
											active={item.activeCondition}
										/>
									)}
								</SidebarLinkGroup>
							))}
						</ul>
					</div>
				</nav>
			</div>
		</aside>
	);
};

export default Sidebar;

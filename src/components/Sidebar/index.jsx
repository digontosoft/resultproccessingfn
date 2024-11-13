import {
	IconTextGrammar,
	IconUser,
	IconUsers,
	IconX,
} from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SidebarItem from './SidebarItem';
import SidebarLinkGroup from './SidebarLinkGroup';
import Logo from '/logo.png';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
	const location = useLocation();
	const { pathname } = location;

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

	const menuItems = [
		{
			label: 'Students',
			icon: IconUser,
			links: [
				{ to: '/add-student', label: 'Add Student' },
				{ to: '/add-student-bulk', label: 'Add Student Bulk' },
			],
			activeCondition: pathname === '/' || pathname.includes('dashboard'),
		},
		{
			label: 'Results',
			icon: IconTextGrammar,
			links: [
				{ to: '/add-result', label: 'Add Result' },
				{ to: '/add-result-bulk', label: 'Add Result Bulk' },
			],
			activeCondition: pathname === '/' || pathname.includes('dashboard'),
		},
	];

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
					<IconX stroke={2} color="#fff" />
				</button>
			</div>

			<div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
				<nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
					<div>
						<ul className="mb-6 flex flex-col gap-1.5">
							{menuItems.map((item, idx) => (
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

							<li>
								<NavLink
									to="/manage-users"
									className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
										pathname.includes('calendar') &&
										'bg-graydark dark:bg-meta-4'
									}`}
								>
									<IconUsers stroke={1.25} />
									Manage Users
								</NavLink>
							</li>
						</ul>
					</div>
				</nav>
			</div>
		</aside>
	);
};

export default Sidebar;

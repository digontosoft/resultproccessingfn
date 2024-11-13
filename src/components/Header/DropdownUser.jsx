import { useState } from 'react';
import { Link } from 'react-router-dom';

import { IconChevronDown, IconSettings, IconUser } from '@tabler/icons-react';
import Logout from '../../pages/auth/Logout';
import ClickOutside from '../ClickOutside';
import UserOne from '/user/user-01.png';

const DropdownUser = () => {
	const [dropdownOpen, setDropdownOpen] = useState(false);

	return (
		<ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
			<Link
				onClick={() => setDropdownOpen(!dropdownOpen)}
				className="flex items-center gap-4"
				to="#"
			>
				<span className="hidden text-right lg:block">
					<span className="block text-sm font-medium text-black dark:text-white">
						Md Readwan
					</span>
					<span className="block text-xs">Admin</span>
				</span>

				<span className="h-12 w-12 rounded-full">
					<img src={UserOne} alt="User" />
				</span>

				<IconChevronDown stroke={1.25} className="hidden sm:block" />
			</Link>

			{/* <!-- Dropdown --> */}
			{dropdownOpen && (
				<div
					className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark`}
				>
					<ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
						<li>
							<Link
								to="/profile"
								className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
							>
								<IconUser stroke={1.25} />
								My Profile
							</Link>
						</li>

						<li>
							<Link
								to="/settings"
								className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
							>
								<IconSettings stroke={1.25} />
								Account Settings
							</Link>
						</li>
					</ul>

					<Logout />
				</div>
			)}
		</ClickOutside>
	);
};

export default DropdownUser;

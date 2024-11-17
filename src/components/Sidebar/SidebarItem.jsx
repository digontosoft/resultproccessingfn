import React from 'react';
import { NavLink } from 'react-router-dom';

const SidebarItem = ({ label, icon, links, open, onClick, active }) => {
	return (
		<React.Fragment>
			<NavLink
				to="#"
				className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark ${
					active ? 'bg-graydark' : ''
				}`}
				onClick={(e) => {
					e.preventDefault();
					onClick();
				}}
			>
				<img className="invert" src={icon} stroke={1.5} />
				{label}
				<img
					src="/chevron-down.svg"
					stroke={1}
					className={`invert absolute right-4 top-1/2 -translate-y-1/2 ${
						open ? 'rotate-180' : ''
					}`}
				/>
			</NavLink>
			<div
				className={`translate transform overflow-hidden ${
					!open ? 'hidden' : ''
				}`}
			>
				<ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
					{links.map((link, idx) => (
						<li key={idx}>
							<NavLink
								to={link.to}
								className={({ isActive }) =>
									'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
									(isActive && '!text-white')
								}
							>
								{link.label}
							</NavLink>
						</li>
					))}
				</ul>
			</div>
		</React.Fragment>
	);
};

export default SidebarItem;

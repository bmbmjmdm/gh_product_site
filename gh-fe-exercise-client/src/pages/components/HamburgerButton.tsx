import React from 'react'
import XIcon from './XIcon'

type HamburgerButtonProps = {
	active: boolean
	onClick: () => void
}

export default function HamburgerButton(props: HamburgerButtonProps) {
	const { active, onClick } = props
	const activeClass = active ? 'block' : 'hidden'
	const inactiveClass = active ? 'hidden' : 'block'

	return (
		<>
			<button
				onClick={onClick}
				type="button"
				className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
				aria-controls="mobile-menu"
				aria-expanded="false"
			>
				<span className="absolute -inset-0.5"></span>
				<span className="sr-only">Open menu</span>
				<svg
					className={`${inactiveClass} h-8 w-8`}
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth="1.5"
					stroke="currentColor"
					aria-hidden="true"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
					/>
				</svg>
				<span className={activeClass}>
					<XIcon />
				</span>
			</button>
		</>
	)
}

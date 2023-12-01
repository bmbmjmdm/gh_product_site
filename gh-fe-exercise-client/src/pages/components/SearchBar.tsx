import React from 'react'
import SearchIcon from './SearchIcon'

export default function SearchBar() {
	return (
		<>
			<input
				className="text-gray-300 bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
				placeholder="Search..."
			/>
			<button
				type="button"
				className="ml-2 relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
			>
				<span className="absolute -inset-1.5"></span>
				<span className="sr-only">Search</span>
				<SearchIcon />
			</button>
		</>
	)
}

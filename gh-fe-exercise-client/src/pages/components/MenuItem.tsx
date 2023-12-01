import React from 'react'

type MenuItemProps = {
	name: string
	href: string
	isSelected: boolean
}

export default function MenuItem(props: MenuItemProps) {
	const { name, href, isSelected } = props
	const textColor = isSelected ? 'text-white' : 'text-gray-300 hover:text-white'
	const backgroundColor = isSelected ? 'bg-gray-900' : 'hover:bg-gray-700'
	const classes = `${textColor} ${backgroundColor} block rounded-md px-3 py-2 text-base font-medium`
	const ariaCurrent = isSelected ? 'page' : undefined

	return (
		<a href={href} className={classes} aria-current={ariaCurrent}>
			{name}
		</a>
	)
}

import React from 'react'
import CartIcon from './CartIcon'
import { useSelector } from 'react-redux'
import { selectCart } from '../redux/cartSlice'

type CartButtonProps = {
	onClick: () => void
}

// This is a button that looks like a cart and is generally used for opening the cart overlay
export default function CartButton(props: CartButtonProps) {
	const { onClick } = props

	// we want to show a badge on the cart button to show how many items are in the cart
	const cartCount = useSelector(selectCart).reduce((acc, product) => acc + product.quantity, 0)
	const hideBadge = cartCount === 0 ? 'hidden' : ''

	return (
		<>
			<button
				type="button"
				onClick={onClick}
				className="ml-6 relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
			>
				<span className="absolute -inset-1.5"></span>
				<span className="sr-only">View cart</span>
				{/* Badge showing cart count */}
				<div
					className={`${hideBadge} absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-indigo-600 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900`}
				>
					{cartCount}
				</div>
				<CartIcon />
			</button>
		</>
	)
}

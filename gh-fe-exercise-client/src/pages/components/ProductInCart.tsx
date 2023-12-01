import { useCallback, useState } from 'react'
import { removeFromCart, updateCart, updateQuantity } from '../redux/cartSlice'
import { AppDispatch } from '../redux/store'
import { useDispatch } from 'react-redux'
import { Product } from '../helpers/ShopTypes'

type ProductInCartProps = {
	product: Product
	quantity: number
}

// Shows a product in our cart with its associated information, allowing the user to change the quantity or remove it
export default function ProductInCart(props: ProductInCartProps) {
	const { product, quantity } = props
	const { name, price, image, id } = product
	const dispatch = useDispatch<AppDispatch>()

	const totalPrice = price * quantity
	const ppDescription = quantity > 1 ? `$${price} x ${quantity}` : ''

	// remove the product from the cart by setting its quantity to 0
	// we are no longer using the server for this, so its a bit simpler
	const removeItem = useCallback(() => {
		dispatch(removeFromCart({ id }))
	}, [dispatch, id])

	// update the quantity of the product in the cart
	// we are no longer using the server for this, so its a bit simpler
	const setQuantity = useCallback(
		(newQuantity: number) => {
			if (newQuantity < 1) newQuantity = 1
			dispatch(
				updateQuantity({
					id: id,
					quantity: newQuantity,
				}),
			)
		},
		[dispatch, id],
	)

	return (
		<li className="flex py-6">
			{/* Product image */}
			<div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
				<img src={image} alt={name} className="h-full w-full object-cover object-center" />
			</div>

			<div className="ml-4 flex flex-1 flex-col">
				<div>
					<div className="flex justify-between text-base font-medium text-gray-900">
						{/* Product name */}
						<h3>
							<a href="#">{name}</a>
						</h3>
						{/* Total price */}
						<p className="ml-4">${totalPrice}</p>
					</div>
					{/* Price breakdown */}
					<p className="mt-1 text-sm text-gray-500">{ppDescription}</p>
				</div>
				<div className="flex flex-1 items-end justify-between text-sm">
					{/* Quantity controls */}
					<span className="flex row">
						<p className="text-gray-500">Qty</p>
						<input
							onChange={(e) => setQuantity(parseInt(e.target.value))}
							type="number"
							min="1"
							max="99"
							value={quantity}
							className="focus:outline-none form-input w-16 text-center"
						/>
					</span>
					{/* Remove controls */}
					<div className="flex">
						<button
							type="button"
							onClick={removeItem}
							className="font-medium text-indigo-600 hover:text-indigo-500"
						>
							Remove
						</button>
					</div>
				</div>
			</div>
		</li>
	)
}

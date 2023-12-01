import { useCallback, useState } from 'react'
import CartIcon from './CartIcon'
import { useDispatch } from 'react-redux'
import { Product } from '../helpers/ShopTypes'
import { AppDispatch } from '../redux/store'
import { addToCart } from '../redux/cartSlice'

// Shows a card containing various product information
export default function ProductCard(props: Product) {
	const { name, price, image, description, id } = props
	const dispatch = useDispatch<AppDispatch>()

	// the user is allowed to expand/collapse the description
	const [showDescription, setShowDescription] = useState(false)
	const descriptionClass = showDescription ? '' : 'truncate'

	// add an item to the cart. if its already there, increase the quantity by 1
	// we are no longer using the server for this, so its a bit simpler
	const addToCartCallback = useCallback(() => {
		dispatch(addToCart(props))
	}, [props, dispatch])

	return (
		<div>
			<div className="shadow group relative bg-white rounded-md p-6">
				{/* Image, taking up most of the card */}
				<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
					<img src={image} alt={name} className="h-full w-full object-cover object-center" />
				</div>
				<div className="mt-4 flex justify-between">
					{/* Product name */}
					<h3 className="text-sm text-gray-700">
						<a onClick={() => setShowDescription(!showDescription)}>
							<span aria-hidden="true" className="absolute inset-0"></span>
							{name}
						</a>
					</h3>
					{/* Price */}
					<button
						onClick={addToCartCallback}
						className="hover:text-indigo-600 text-gray-900 z-[1] relative text-sm font-medium "
					>
						${price}
					</button>
				</div>
				<div className="mt-3 flex justify-between">
					{/* Description, truncated until pressed */}
					<p className={`text-sm text-gray-500 ${descriptionClass}`}>{description}</p>
					{/* Add to cart button */}
					<button
						onClick={addToCartCallback}
						className="hover:text-indigo-600 text-gray-500 z-[1] relative pl-3"
					>
						<CartIcon size={6} />
					</button>
				</div>
			</div>
		</div>
	)
}

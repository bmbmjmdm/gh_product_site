import { useDispatch, useSelector } from 'react-redux'
import XIcon from './XIcon'
import { buyCart, createCart, selectCart } from '../redux/cartSlice'
import ProductInCart from './ProductInCart'
import { AppDispatch } from '../redux/store'
import { errorPath } from '../helpers/Constants'

type CartOverlayProps = {
	visible: boolean
	onClose: () => void
}

// The cart overlay is shown when the cart button is pressed. Here, users can modify or buy their cart items
export default function CartOverlay(props: CartOverlayProps) {
	const { visible, onClose } = props
	const productsInCart = useSelector(selectCart)
	const dispatch = useDispatch<AppDispatch>()

	// When the cart overlay is visible, animate it in. Othwerwise, hide it
	const backgroundClasses = visible ? 'bg-opacity-75 z-10' : 'bg-opacity-0 z-[-1]'
	const menuClasses = visible ? 'translate-x-0 z-20' : 'translate-x-full'

	// convert our products into components
	const productComponents = productsInCart.map((product) => (
		<ProductInCart key={product.id} product={product.product} quantity={product.quantity} />
	))

	// calculate total cost based on products price and quantity
	const totalCost = productsInCart.reduce((acc, product) => acc + product.product.price * product.quantity, 0)

	// if theres no items in our cart, the user cant check out and should be told why
	const hideCheckout = productsInCart.length === 0 ? 'hidden' : ''
	const hideEmptyCartMessage = productsInCart.length === 0 ? '' : 'hidden'

	const buyCartPressed = async () => {
		const success = await dispatch(createCart())
		if (success.meta.requestStatus === 'fulfilled') dispatch(buyCart())
		else window.location.href = errorPath
	}

	return (
		<>
			{/* Overlay that darkens the rest of the screen */}
			<div className={`${backgroundClasses} fixed inset-0 bg-gray-500 transition-opacity`}></div>

			{/* Cart container */}
			<div className={`${menuClasses} fixed inset-0 overflow-hidden transition-transform`}>
				<div className="absolute inset-0 overflow-hidden">
					<div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
						<div className="pointer-events-auto w-screen max-w-md">
							<div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
								<div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
									<div className="flex items-start justify-between">
										{/* Title */}
										<h2 className="text-lg font-medium text-gray-900" id="slide-over-title">
											Shopping cart
										</h2>
										<div className="ml-3 flex h-7 items-center">
											{/* Close button */}
											<button
												onClick={onClose}
												type="button"
												className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
											>
												<span className="absolute -inset-0.5"></span>
												<span className="sr-only">Close panel</span>
												<XIcon />
											</button>
										</div>
									</div>

									{/* List of products in the users cart */}
									<div className="mt-8">
										<div className="flow-root">
											<ul role="list" className="-my-6 divide-y divide-gray-200">
												{productComponents}
											</ul>
										</div>
									</div>
									{/* Empty cart message */}
									<button
										onClick={onClose}
										type="button"
										className={`${hideEmptyCartMessage} text-2xl text-indigo-600 hover:text-indigo-500 mt-8`}
									>
										Your cart is empty!
									</button>
								</div>

								{/* Totals */}
								<div className="border-t border-gray-200 px-4 py-6 sm:px-6">
									<div className="flex justify-between text-base font-medium text-gray-900">
										<p>Total</p>
										<p>${totalCost}</p>
									</div>
									<p className="mt-0.5 text-sm text-gray-500">Shipping and taxes included.</p>

									{/* Buttons to pay or close cart view */}
									<div className={`${hideCheckout} mt-6 flex`}>
										<button
											onClick={buyCartPressed}
											className={`flex flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700`}
										>
											Checkout
										</button>
									</div>
									<div className="mt-5 flex justify-center text-center">
										<p>
											<button
												onClick={onClose}
												type="button"
												className="font-medium text-indigo-600 hover:text-indigo-500"
											>
												Continue Shopping
												<span aria-hidden="true"> &rarr;</span>
											</button>
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

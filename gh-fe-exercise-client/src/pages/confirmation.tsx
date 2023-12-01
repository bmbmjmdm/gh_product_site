import { useSelector } from 'react-redux'
import { selectPage } from './redux/navigationSlice'
import Image from 'next/image'
import SuccessImage from './assets/success.png'
import FailureImage from './assets/failure.png'

// this page is shown when the user has successfully or unsuccessfully placed an order
export default function Confirmation() {
	const page = useSelector(selectPage)

	// setup the page appropriately based on the success of the order
	const title = page === 'Success' ? 'Order Placed!' : 'Order Failed...'
	const body =
		page === 'Success'
			? 'Your order has been placed! You will receive an email confirmation shortly.'
			: 'Something went wrong, please return to your cart and try again.'
	const image = page === 'Success' ? SuccessImage : FailureImage

	return (
		<div className="py-5 px-5 flex items-center flex-col">
			{/* Main image showing success or failure */}
			<Image alt={page} src={image} className="h-60 w-60" />
			{/* A card showing some details about what happened */}
			<div className="bg-white shadow overflow-hidden sm:rounded-lg mt-10">
				<div className="px-4 py-5 sm:px-6">
					<h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
					<p className="mt-1 max-w-2xl text-sm text-gray-500">{body}</p>
				</div>
			</div>
		</div>
	)
}

import { Cart } from '../helpers/ShopTypes'

const baseURL = 'https://fe-exercise-2-5a6f452ebcac.herokuapp.com/api'

// returns a list of products that conform to the Product type
export function getProductsAPI() {
	return fetch(`${baseURL}/products`)
}

// returns a list of categories that conform to the Category type
export function getCategoriesAPI() {
	return fetch(`${baseURL}/categories`)
}

export type CartWithMeta = {
	id: number
	createdAt: string
	status: string
	products: Cart
}
// returns a CartWithMeta-typed object
export function getOrderAPI(id: number) {
	console.log('getting order')
	return fetch(`${baseURL}/orders/${id}`)
}

// returns nothing, but tells the API to create an order object reflecting whats currently in our cart
export function createOrderAPI(cart: Cart) {
	console.log('creating order')
	return fetch(`${baseURL}/orders`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			products: cart,
		}),
	})
}

// returns nothing, but tells the API to update a given product quantity in a given cart
export function updateOrderAPI(obj: { cartId: number; productId: number; quantity: number }) {
	return fetch(`${baseURL}/orders/${obj.cartId}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			action: 'update_quantity',
			productId: obj.productId,
			quantity: obj.quantity,
		}),
	})
}

// returns nothing, but tells the API to mark a given cart as purchased
export function buyOrderAPI(id: number) {
	return fetch(`${baseURL}/orders/${id}/buy`, {
		method: 'POST',
	})
}

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { buyOrderAPI, createOrderAPI, getOrderAPI, updateOrderAPI } from './API'
import { Cart, Category, Product } from '../helpers/ShopTypes'
import { errorPath, localStorageKey, successPath } from '../helpers/Constants'
import { AsyncStatus } from '../helpers/MiscTypes'
import { RootState } from './store'

export type CartState = {
	cart: Cart
	id: number
	status: AsyncStatus
	errorMessage: string
}

const initialState: CartState = {
	cart: [],
	id: -1,
	status: AsyncStatus.idle,
	errorMessage: '',
}

// A thunk for our asynchronous API call to get the contents of our current order id
export const getCart = createAsyncThunk('cart/getCart', async (arg: number, { getState }) => {
	const response = await getOrderAPI(arg)
	if (response.status === 500) {
		throw new Error('Server error')
	}
	return response.json()
})

// A thunk for our asynchronous API call to create a new order with an empty cart
export const createCart = createAsyncThunk('cart/createCart', async (arg, { getState }) => {
	const state = getState() as RootState
	const response = await createOrderAPI(state.cart.cart)
	if (response.status === 500) {
		throw new Error('Server error')
	}
	return response.json()
})

// A thunk for our asynchronous API call to update the quantity of a product for our current order
export const updateCart = createAsyncThunk(
	'cart/updateCart',
	async (arg: { productId: number; quantity: number; product: Product }, { getState }) => {
		const state = getState() as RootState
		const response = await updateOrderAPI({
			cartId: state.cart.id,
			productId: arg.productId,
			quantity: arg.quantity,
		})
		if (response.status === 500) {
			throw new Error('Server error')
		}
		return response.json()
	},
)

// A thunk for our asynchronous API call to buy our current order
export const buyCart = createAsyncThunk('cart/buyCart', async (arg, { getState }) => {
	const state = getState() as RootState
	const response = await buyOrderAPI(state.cart.id)
	if (response.status === 500) {
		throw new Error('Server error')
	}
	return 'Success'
})

// the slice that builds our various reducers/actions/state for categories
export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		// load the cart from storage or create a new one
		loadCart: (state, action) => {
			const cart = localStorage.getItem(localStorageKey)
			state.cart = cart ? JSON.parse(cart) : []
		},
		// reducer for adding an item to the cart
		addToCart: (state, action) => {
			const productInCart = state.cart.find((product) => product.id === action.payload.id)
			if (!productInCart) {
				// this is a new product in the cart, add it
				state.cart.push({
					id: action.payload.id,
					quantity: 1,
					product: action.payload,
				})
			} else {
				// this is an existing product in the cart, update it
				productInCart.quantity += 1
			}
			// update the cart in local storage so we can load it later
			localStorage.setItem(localStorageKey, JSON.stringify(state.cart))
		},
		// reducer for removing an item from the cart
		removeFromCart: (state, action) => {
			state.cart = state.cart.filter((product) => product.id !== action.payload.id)
			// update the cart in local storage so we can load it later
			localStorage.setItem(localStorageKey, JSON.stringify(state.cart))
		},
		// update the quantity of an item in cart
		updateQuantity: (state, action) => {
			const productInCart = state.cart.find((product) => product.id === action.payload.id)
			if (productInCart) {
				productInCart.quantity = action.payload.quantity
			}
			// update the cart in local storage so we can load it later
			localStorage.setItem(localStorageKey, JSON.stringify(state.cart))
		},
	},
	extraReducers: (builder) => {
		builder

			// getCart reducers
			.addCase(getCart.pending, (state, action) => {
				// if we're getting a cart that means we're loading it from storage
				// set our state id to match the id we looked up from storage
				state.id = action.meta.arg
				state.status = AsyncStatus.loading
			})
			.addCase(getCart.fulfilled, (state, action) => {
				state.status = AsyncStatus.succeeded
				state.cart = action.payload.products
			})
			.addCase(getCart.rejected, (state, action) => {
				state.status = AsyncStatus.failed
				state.errorMessage = 'Failed to get cart'
			})

			// createCart reducers
			.addCase(createCart.pending, (state) => {
				state.status = AsyncStatus.loading
			})
			.addCase(createCart.fulfilled, (state, action) => {
				// we have a server side id for our cart, lets save it so we can buy it
				state.id = action.payload.id
				// no longer using this for server side storage
				// localStorage.setItem(localStorageKey, action.payload.id.toString());
				state.status = AsyncStatus.succeeded
			})
			.addCase(createCart.rejected, (state, action) => {
				state.status = AsyncStatus.failed
				state.errorMessage = 'Failed to create cart'
			})

			// buyCart reducers
			.addCase(buyCart.pending, (state) => {
				state.status = AsyncStatus.loading
			})
			.addCase(buyCart.fulfilled, (state, action) => {
				// clear our local cart info
				state.cart = []
				state.id = -1
				localStorage.removeItem(localStorageKey)
				state.status = AsyncStatus.succeeded
				// navigate to the success page
				window.location.href = successPath
			})
			.addCase(buyCart.rejected, (state, action) => {
				state.status = AsyncStatus.failed
				state.errorMessage = 'Failed to buy cart'
				console.log(action)
				// navigate to the failure page
				window.location.href = errorPath
			})

			// updateCart reducers
			.addCase(updateCart.pending, (state, action) => {
				state.status = AsyncStatus.loading
			})
			.addCase(updateCart.fulfilled, (state, action) => {
				// we successfully updated cart on the BE, reflect it on the FE now
				const productInCart = state.cart.find((product) => product.id === action.meta.arg.productId)
				if (!productInCart) {
					// this is a new product in the cart, add it
					state.cart.push({
						id: action.meta.arg.productId,
						quantity: action.meta.arg.quantity,
						product: action.meta.arg.product,
					})
				} else {
					// this is an existing product in the cart, update it
					productInCart.quantity = action.meta.arg.quantity
					if (productInCart.quantity === 0) {
						// if quantity is now 0, remove it from the cart
						state.cart = state.cart.filter((product) => product.id !== action.meta.arg.productId)
					}
				}
				state.status = AsyncStatus.succeeded
			})
			.addCase(updateCart.rejected, (state, action) => {
				state.status = AsyncStatus.failed
				state.errorMessage = 'Failed to update cart'
			})
	},
})

// selectors to extract data from our state
export const selectCart = (state: RootState) => state.cart.cart
export const selectCartError = (state: RootState) => state.cart.errorMessage
export const selectCartStatus = (state: RootState) => state.cart.status

export default cartSlice.reducer

export const { addToCart, removeFromCart, updateQuantity, loadCart } = cartSlice.actions

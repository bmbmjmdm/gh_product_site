import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getProductsAPI } from './API'
import { Category, Product } from '../helpers/ShopTypes'
import { AsyncStatus } from '../helpers/MiscTypes'
import { RootState } from './store'

export type ProductsState = {
	products: Product[]
	status: AsyncStatus
	errorMessage: string
}

const initialState: ProductsState = {
	products: [],
	status: AsyncStatus.idle,
	errorMessage: '',
}

// A thunk for our asynchronous API call to get all products
export const getProducts = createAsyncThunk('products/getProducts', async () => {
	const response = await getProductsAPI()
	if (response.status === 500) {
		throw new Error('Server error')
	}
	return response.json()
})

// the slice that builds our various reducers/actions/state for products
export const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getProducts.pending, (state) => {
				state.status = AsyncStatus.loading
			})
			.addCase(getProducts.fulfilled, (state, action) => {
				state.status = AsyncStatus.succeeded
				state.products = action.payload
			})
			.addCase(getProducts.rejected, (state, action) => {
				state.status = AsyncStatus.failed
				state.errorMessage = 'Failed to load products'
			})
	},
})

// selectors to extract data from our state
export const selectProducts = (state: RootState) => state.products.products
export const selectProductsError = (state: RootState) => state.products.errorMessage
export const selectProductsStatus = (state: RootState) => state.products.status

export default productsSlice.reducer

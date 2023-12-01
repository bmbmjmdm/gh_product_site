import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getCategoriesAPI } from './API'
import { Category } from '../helpers/ShopTypes'
import { AsyncStatus } from '../helpers/MiscTypes'
import { RootState } from './store'

export type CategoriesState = {
	categories: Category[]
	status: AsyncStatus
	errorMessage: string
}

const initialState: CategoriesState = {
	categories: [],
	status: AsyncStatus.idle,
	errorMessage: '',
}

// A thunk for our asynchronous API call to get all categories
export const getCategories = createAsyncThunk('categories/getCategories', async () => {
	const response = await getCategoriesAPI()
	if (response.status === 500) {
		throw new Error('Server error')
	}
	return response.json()
})

// the slice that builds our various reducers/actions/state for categories
export const categoriesSlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getCategories.pending, (state) => {
				state.status = AsyncStatus.loading
			})
			.addCase(getCategories.fulfilled, (state, action) => {
				state.status = AsyncStatus.succeeded
				// sorty categories based on the order we're told
				state.categories = action.payload.sort((a: Category, b: Category) => a.order - b.order)
			})
			.addCase(getCategories.rejected, (state, action) => {
				state.status = AsyncStatus.failed
				state.errorMessage = 'Failed to load categories'
			})
	},
})

// selectors to extract data from our state
export const selectCategories = (state: RootState) => state.categories.categories
export const selectCategoriesError = (state: RootState) => state.categories.errorMessage
export const selectCategoriesStatus = (state: RootState) => state.categories.status

export default categoriesSlice.reducer

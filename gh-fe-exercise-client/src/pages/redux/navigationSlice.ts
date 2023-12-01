import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './store'

export type NavigationState = {
	page: string
}

const initialState: NavigationState = {
	page: '',
}

// the slice that builds our various reducers/actions/state for navigation
export const navigationSlice = createSlice({
	name: 'nav',
	initialState,
	reducers: {
		setPage: (state, action) => {
			state.page = action.payload
		},
	},
})

// selectors to extract data from our state
export const selectPage = (state: RootState) => state.nav.page

export default navigationSlice.reducer

export const { setPage } = navigationSlice.actions

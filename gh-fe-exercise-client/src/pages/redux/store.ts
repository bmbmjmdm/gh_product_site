import { configureStore } from '@reduxjs/toolkit'
import productsReducer, { ProductsState } from './productsSlice'
import cartReducer, { CartState } from './cartSlice'
import categoriesReducer, { CategoriesState } from './categoriesSlice'
import navigationReducer, { NavigationState } from './navigationSlice'

export const store = configureStore({
	reducer: {
		products: productsReducer,
		cart: cartReducer,
		categories: categoriesReducer,
		nav: navigationReducer,
	},
})

export type AppDispatch = typeof store.dispatch

export type RootState = {
	products: ProductsState
	cart: CartState
	categories: CategoriesState
	nav: NavigationState
}

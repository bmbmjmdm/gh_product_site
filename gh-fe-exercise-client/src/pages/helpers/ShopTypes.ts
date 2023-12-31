export type Category = {
	name: string
	order: number
}

export type Product = {
	id: number
	name: string
	description: string
	image: string
	price: number
	category: Category
}

export type Cart = {
	id: number
	quantity: number
	product: Product
}[]

import { useSelector } from 'react-redux'
import { selectProducts } from './redux/productsSlice'
import ProductCard from './components/ProductCard'
import { useEffect, useState } from 'react'
import { selectPage } from './redux/navigationSlice'

export default function Products() {
	const products = useSelector(selectProducts)
	const [filteredProducts, setFilteredProducts] = useState(products)
	const page = useSelector(selectPage)

	// when the page changes, update our filtered products
	useEffect(() => {
		const newFilteredProducts = products.filter((product) => product.category.name === page)
		setFilteredProducts(newFilteredProducts)
	}, [page, products])

	return (
		<div className="">
			<div className="mx-auto max-w-2xl px-4 py-5 sm:px-6 lg:max-w-7xl lg:px-8">
				<div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
					{filteredProducts.map((product) => (
						<ProductCard key={product.id} {...product} />
					))}
				</div>
			</div>
		</div>
	)
}

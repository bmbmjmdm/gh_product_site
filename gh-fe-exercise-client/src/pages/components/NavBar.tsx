import React, { useRef } from 'react'
import MenuItem from './MenuItem'
import SearchBar from './SearchBar'
import CartButton from './CartButton'
import HamburgerButton from './HamburgerButton'
import CartOverlay from './CartOverlay'
import { useSelector } from 'react-redux'
import { selectCategories } from '../redux/categoriesSlice'
import { selectPage } from '../redux/navigationSlice'

const ghLogo =
	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAC3klEQVRIie2VWUgVURjHv3O+M2fmVqJkegsKIizFKITSsiIIqR5CaINsoZ2oECIw6iWhhxaIopIILIMKlKKCQnrIyjCVVm3P1DCJKErzXnO5M3O+mR7mepGborQ8FP5fBr455/8751tmWFvzM/ib4n/VfQgwBPj3AYwxzjlj7M8DGGM+w+juDjU1f+jo6PQZBufhlVLTfIah6zIS4Zwbhu4zDE2IQQE4511d3YtXbzlcUPio5nlB4bnsnM1tgSAiEtGKDbmGP3lc6qy6+nfIuUCsqH7o86cY/uT8A0ellNFnjfoWeQkZPTG97vFtf+IoIkKOgWD7mOSMlqZaqWnt7d/HpmYWF51YsmhByDQBYPgw375Dx/cfOekG3wcCwQFuIIQ4X3LldMGhxFHxoZBp2ypkmjExI66XnDl+6qwmhGnZAKBsmxzytigimwgALMsaOEWI/OLV0vnz5li2HQnatj13dkZy0gTHdcLbEAUKREREgYi832aJLgtnrOrBk5FxsZ1d3QDAOQ+XjkHOsmwvCABPX7we409USgGAlNrbhneDBXhyPRjndfWNRRcu6bpExLLyytqK0l6LXNd1vWd/7n0AXBdmTEsLBtullI7jpExKOnYwHwB8w3xZ2asiTmlTUmfPnO6l0dBlWXllf4Do3CminOXZ5ffua5oAAMdxTMtSpBoam+5UVEeGziFSpIiIiBSR4ziDvYFSat3KZSPHpzW/rEpMiCciznjINIsvX1ubs9R1XSk1ABBCIEcbFAAIFF6RpZRdPUWKCPfs3BbNRNy6ac36bXmv3jR8+dpy4+bdG2Xl+bt3fPz0eerklI25u+obm2qevZqTme5PiEfOb92t2p63FwACgeDCrLlE1NstetDCieNM1/XW1raW1m8JCfFxsbGWZQkhlLJ1qXPkrutapkWO4x1ISgkMSJH50yj0DQi/Y4wx5vZ0y6+p7zb19JvWnv7vH84QYAgwOP0AGes6Vq3JeboAAAAASUVORK5CYII='

// This is our navigation bar. It contains the logo, navigation buttons, search bar, and cart button
// On small (mobile) screens, the logo disappears and the navigation buttons are hidden behind a hamburger menu
export default function NavBar() {
	const categories = useSelector(selectCategories)
	const curSelectedCategory = useSelector(selectPage)

	const categoryComponents = categories.map((category) => (
		<MenuItem
			key={category.name}
			name={category.name}
			href={`/products#${category.name}`}
			isSelected={category.name === curSelectedCategory}
		/>
	))

	// keep track of our menu states
	const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
	const [cartOpen, setCartOpen] = React.useState(false)

	return (
		<>
			<CartOverlay visible={cartOpen} onClose={() => setCartOpen(false)} />
			<nav className="bg-gray-800 sticky top-0 z-[5]">
				<div className="px-8 flex-1 flex h-16 items-center justify-between">
					{/* The hamburger menu only shows on small screens/mobile */}
					<div className="block lg:hidden">
						<HamburgerButton active={mobileMenuOpen} onClick={() => setMobileMenuOpen(!mobileMenuOpen)} />
					</div>
					{/* The logo & navigation buttons only show on medium or larger screens */}
					<div className="flex items-center hidden lg:block">
						<img className="h-8 w-8 rounded" src={ghLogo} alt="Company Logo" />
					</div>
					<div className="flex items-center">
						<div className="hidden lg:block">
							<div className="flex items-baseline space-x-4">{categoryComponents}</div>
						</div>
					</div>
					<div className="block">
						<div className="flex items-center">
							{/* The cart button opens the cart overlay */}
							<CartButton onClick={() => setCartOpen(true)} />
						</div>
					</div>
				</div>
				{/* Mobile menu, show/hide based on menu state. */}
				<div className={`lg:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
					<div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">{categoryComponents}</div>
				</div>
			</nav>
		</>
	)
}

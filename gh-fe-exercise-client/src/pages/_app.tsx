import '~/styles/globals.css'
import type { AppProps } from 'next/app'
import NavBar from './components/NavBar'
import { Inter } from 'next/font/google'
import { Provider, useSelector } from 'react-redux'
import { store } from './redux/store'
import { LoadingManager } from './components/LoadingManager'
import { useEffect, useState } from 'react'
import { selectPage, setPage } from './redux/navigationSlice'

const inter = Inter({ subsets: ['latin'] })

// trim the # from the hash to get the tab name
export const trimHash = (window?: Window) => {
	if (!window) return ''
	const hash = window.location.hash
	if (hash.length > 0) {
		return hash.slice(1, hash.length)
	}
	return ''
}

// This is our root comonent. It wraps our app in a redux provider, sets up the navigation bar and header, and renders the current page
export default function App({ Component, pageProps }: AppProps) {
	const [heading, setHeading] = useState('')

	// sync our page with the hash.
	// This is a bit clunky because it muddles the source of truth, but it allows us to have working forward/backward navigation
	useEffect(() => {
		const listener = () => {
			store.dispatch(setPage(trimHash(window)))
			// update the heading while we're at it since we cant rely on useSelector here
			setHeading(selectPage(store.getState()))
		}

		listener()

		window.addEventListener('hashchange', listener)
		return () => {
			window.removeEventListener('hashchange', listener)
		}
	}, [])

	return (
		<Provider store={store}>
			<LoadingManager />
			<main className="h-100 bg-gray-100 min-h-screen">
				<div className="min-h-full">
					<NavBar />
					<header className="bg-white shadow">
						<div className="flex flex-1 justify-center mx-auto px-4 py-6 sm:px-6 lg:px-8">
							<h1 className="text-3xl font-bold tracking-tight text-gray-900">
								{heading ? heading : 'Home'}
							</h1>
						</div>
					</header>
					<main>
						<div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
							<Component {...pageProps} />
						</div>
					</main>
				</div>
			</main>
		</Provider>
	)
}

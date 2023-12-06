import '../styles/globals.css'

import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'

import { Toaster } from 'react-hot-toast'
import store from '../app/store'
import NavBar from './components/navBar/navBar'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <NavBar />
      <Component {...pageProps} />
      <Toaster />
    </Provider>
  )
}

import '../styles/globals.css'
import type { AppProps } from 'next/app'

import {StateContext} from "../context/stateContext"
import { Layout } from '../components'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StateContext>
      <Layout> 
        <Component {...pageProps} />
      </Layout>
    </StateContext>
      )
}

export default MyApp

import Head from "next/head"
import { AppProps } from "next/app"

import "@/styles/globals.css"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

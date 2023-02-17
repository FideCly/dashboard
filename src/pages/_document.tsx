import Footer from '@/Components/html/Footer'
import Navbar from '@/Components/html/Navbar'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Navbar />
        <Main />
        <NextScript />
        <Footer />
      </body>
    </Html>
  )
}

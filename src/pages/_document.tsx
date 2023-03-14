import Navbar from '@/Components/html/Navbar'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className='flex'>
        <Navbar />
          <Main />
      </body>
      <NextScript />
    </Html>
  )
}

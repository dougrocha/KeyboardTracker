import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500&display=swap"
          rel="stylesheet"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="m-0 h-full w-full scroll-smooth antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

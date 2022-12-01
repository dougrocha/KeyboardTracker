import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="bg-primary-light text-black antialiased transition-colors dark:bg-primary-dark dark:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

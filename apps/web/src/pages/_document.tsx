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
      <body className="bg-[#f7f7f7] antialiased transition-colors dark:bg-[#212529]">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

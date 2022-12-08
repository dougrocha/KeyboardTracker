import classNames from "classnames"
import dynamic from "next/dynamic"
import { PropsWithChildren } from "react"

import Navbar from "../components/Navbar/Navbar"

const Footer = dynamic(() => import("../components/Footer"))

interface MainViewLayoutProps extends PropsWithChildren {
  hideFooter?: boolean
  className?: string
  footerContent?: React.ReactNode
}

const MainViewLayout = ({
  children,
  hideFooter = false,
  footerContent,
  className,
}: MainViewLayoutProps) => {
  return (
    <div className="mx-auto flex min-h-screen flex-col ">
      <Navbar />
      <main
        className={classNames(
          className,
          hideFooter ? "" : "mb-auto",
          `container mx-auto max-w-full px-2 sm:px-6`
        )}
      >
        {children}
      </main>
      {hideFooter ? null : <Footer />}
      {footerContent ? footerContent : null}
    </div>
  )
}

export default MainViewLayout

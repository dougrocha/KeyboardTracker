import classNames from "classnames"
import dynamic from "next/dynamic"

import Navbar from "../components/Navbar/Navbar"
import { LayoutProps } from "../types/layoutProps"

const Footer = dynamic(() => import("../components/Footer"))

interface MainViewLayoutProps extends LayoutProps {
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
    <div className="mx-auto flex min-h-screen flex-col">
      <Navbar />
      <main
        className={classNames(
          className,
          hideFooter ? "" : "mb-auto",
          `container mx-auto px-2 sm:px-6`
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

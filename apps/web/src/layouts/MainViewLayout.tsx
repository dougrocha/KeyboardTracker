import dynamic from "next/dynamic"

import Navbar from "../components/Navbar/Navbar"
import { LayoutProps } from "../types/layoutProps"

const Footer = dynamic(() => import("../components/Footer"))

interface MainViewLayoutProps extends LayoutProps {
  footer?: boolean
  className?: string
  footerContent?: React.ReactNode
}

// container mx-auto mb-auto px-1 sm:px-6

const MainViewLayout = ({
  children,
  footer = true,
  footerContent,
  className,
}: MainViewLayoutProps) => {
  return (
    <div className="mx-auto flex min-h-screen flex-col">
      <Navbar />
      <main
        className={`container mx-auto px-2 sm:px-6 ${
          footer ? "mb-auto" : ""
        } ${className}`}
      >
        {children}
      </main>
      {footer ? <Footer /> : null}
      {footerContent ? footerContent : null}
    </div>
  )
}

export default MainViewLayout

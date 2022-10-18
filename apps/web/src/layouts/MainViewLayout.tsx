import dynamic from "next/dynamic"
import Image from "next/future/image"

import Navbar from "../components/Navbar"
import { LayoutProps } from "../types/layoutProps"

const Footer = dynamic(() => import("../components/Footer"))

interface MainViewLayoutProps extends LayoutProps {}

// container mx-auto mb-auto px-1 sm:px-6

const MainViewLayout = ({ children }: MainViewLayoutProps) => {
  return (
    <div className="mx-auto flex h-screen flex-col justify-between">
      <Navbar />
      <main className="container mx-auto mb-auto px-2 sm:px-6">{children}</main>
      <Footer />
    </div>
  )
}

export default MainViewLayout

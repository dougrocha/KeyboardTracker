import classNames from "classnames"
import { atom, useSetAtom } from "jotai"
import dynamic from "next/dynamic"
import { PropsWithChildren, useEffect } from "react"
import { useMedia } from "react-use"

import Navbar from "../components/Navbar/Navbar"

const Footer = dynamic(() => import("../components/Footer"))

interface MainViewLayoutProps extends PropsWithChildren {
  hideFooter?: boolean
  className?: string
  footerContent?: React.ReactNode
}

// make jotai atom for storing hamburger menu state
export const hamMenuAtom = atom(false)

const MainViewLayout = ({
  children,
  hideFooter = false,
  footerContent,
  className,
}: MainViewLayoutProps) => {
  const setHamOpen = useSetAtom(hamMenuAtom)

  const isDesktop = useMedia("(min-width: 768px)", true)

  useEffect(() => {
    // Close hamburger menu on desktop
    if (isDesktop) {
      setHamOpen(false)
    }
  }, [isDesktop, setHamOpen])

  return (
    <div className="mx-auto flex min-h-screen flex-col ">
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

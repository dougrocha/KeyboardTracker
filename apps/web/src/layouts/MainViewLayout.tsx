import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { LayoutProps } from '../types/layoutProps'

interface MainViewLayoutProps extends LayoutProps {}

const MainViewLayout = ({ children }: MainViewLayoutProps) => {
  return (
    <div className=" container mx-auto flex h-screen flex-col justify-between px-1 sm:px-6">
      <Navbar />
      <main className="mb-auto">{children}</main>
      <Footer />
    </div>
  )
}

export default MainViewLayout

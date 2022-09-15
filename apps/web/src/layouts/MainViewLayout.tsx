import { LayoutProps } from '../types/layoutProps'

interface MainViewLayoutProps extends LayoutProps {}

const MainViewLayout = ({ children }: MainViewLayoutProps) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  )
}

export default MainViewLayout

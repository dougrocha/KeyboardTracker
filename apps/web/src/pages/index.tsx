import Image from 'next/image'
import useAuth from '../hooks/useAuth'
import MainViewLayout from '../layouts/MainViewLayout'

const Home = () => {
  const { data } = useAuth()

  return (
    <MainViewLayout>
      <Image
        src={'http://localhost:3001/api/users/avatar'}
        alt="user profile image"
        width={128}
        height={128}
        unoptimized={process.env.NODE_ENV === 'development'}
      />
    </MainViewLayout>
  )
}

export default Home

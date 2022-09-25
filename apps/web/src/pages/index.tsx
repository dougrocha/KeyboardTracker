import Image from 'next/future/image'
import useAuth from '../hooks/useAuth'
import MainViewLayout from '../layouts/MainViewLayout'

const Home = () => {
  const { data, isLoading } = useAuth()

  return (
    <MainViewLayout>
      <div className="flex space-x-10">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div>
              UNOPTIMIZED
              <Image
                src={`http://localhost:3001/users/avatars/${data?.user?.id}/${data?.user?.avatar}`}
                alt="user profile image"
                width={128}
                height={128}
                unoptimized={true}
              />
            </div>
            <div>
              OPTIMIZED
              <Image
                src={`http://localhost:3001/users/avatars/${data?.user?.id}/${data?.user?.avatar}`}
                alt="user profile imag"
                width={128}
                height={128}
              />
            </div>
          </>
        )}
      </div>
    </MainViewLayout>
  )
}

export default Home

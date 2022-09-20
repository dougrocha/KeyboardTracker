import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import MainViewLayout from '../layouts/MainViewLayout'

const Home = () => {
  const queryClient = useQueryClient()

  const router = useRouter()

  const discordLogIn = () =>
    router.push('http://localhost:3001/api/auth/discord/login')

  const logout = () => router.push('http://localhost:3001/api/auth/logout')

  const localLogin = useMutation(user => {
    return axios.post('http://localhost:3001/api/auth/login', user, {
      withCredentials: true,
    })
  })

  const localRegister = useMutation(user => {
    return axios.post('http://localhost:3001/api/auth/signup', user)
  })

  const { data } = useQuery(['testLogin'], () => {
    return axios.get('http://localhost:3001/api/auth/protected', {
      withCredentials: true,
    })
  })

  return (
    <MainViewLayout>
      HOMEaksldfjlkajflkajfslkajsflkasjflaksjflkasjf lkasjf lkasj flkas jflaks
      fjjlka sfjlka sjflakj sflaksj flk jlkj lkj lkhlkkj hglskjgali;f jhasop
      ifhas ;ofiha sfpoih awp o fih qwaoif qawopfi hj;oh
      HOMEaksldfjlkajflkajfslkajsflkasjflaksjflkasjf lkasjf lkasj flkas jflaks
      fjjlka sfjlka sjflakj sflaksj flk jlkj lkj lkhlkkj hglskjgali;f jhasop
      ifhas ;ofiha sfpoih awp o fih qwaoif qawopfi hj;oh
      HOMEaksldfjlkajflkajfslkajsflkasjflaksjflkasjf lkasjf lkasj flkas jflaks
      fjjlka sfjlka sjflakj sflaksj flk jlkj lkj lkhlkkj hglskjgali;f jhasop
      ifhas ;ofiha sfpoih awp o fih qwaoif qawopfi hj;oh
      HOMEaksldfjlkajflkajfslkajsflkasjflaksjflkasjf lkasjf lkasj flkas jflaks
      fjjlka sfjlka sjflakj sflaksj flk jlkj lkj lkhlkkj hglskjgali;f jhasop
      ifhas ;ofiha sfpoih awp o fih qwaoif qawopfi hj;oh
      HOMEaksldfjlkajflkajfslkajsflkasjflaksjflkasjf lkasjf lkasj flkas jflaks
      fjjlka sfjlka sjflakj sflaksj flk jlkj lkj lkhlkkj hglskjgali;f jhasop
      ifhas ;ofiha sfpoih awp o fih qwaoif qawopfi hj;oh
      HOMEaksldfjlkajflkajfslkajsflkasjflaksjflkasjf lkasjf lkasj flkas jflaks
      fjjlka sfjlka sjflakj sflaksj flk jlkj lkj lkhlkkj hglskjgali;f jhasop
      ifhas ;ofiha sfpoih awp o fih qwaoif qawopfi hj;oh
      HOMEaksldfjlkajflkajfslkajsflkasjflaksjflkasjf lkasjf lkasj flkas jflaks
      fjjlka sfjlka sjflakj sflaksj flk jlkj lkj lkhlkkj hglskjgali;f jhasop
      ifhas ;ofiha sfpoih awp o fih qwaoif qawopfi hj;oh
    </MainViewLayout>
  )
}

export default Home

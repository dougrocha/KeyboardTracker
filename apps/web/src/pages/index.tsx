import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'

const Home = () => {
  return (
    <div className="bg-[#565264] px-6">
      <nav className="flex h-16 items-center justify-between">
        <div className="font-rubik text-lg font-medium">CALENDAR</div>

        <div className="flex items-center">
          <ul className="mr-2 flex">
            <li className="ml-2">Home</li>
            <li className="ml-2">About</li>
            <li className="ml-2">Vendors</li>
          </ul>
          <div className="rounded bg-[#3DDC97] px-4 py-2">Login</div>
        </div>
      </nav>
      <div className="my-20 flex flex-col items-center justify-center">
        <h1 className="rounded px-4 py-2 text-center font-poppins text-6xl font-medium">
          Find the <span className="text-[#3DDC97]">click</span> <br /> without
          the <br /> <span className="text-[#3DDC97]">clack</span>
        </h1>
        <div className="relative mt-5 w-1/2">
          <MagnifyingGlassIcon className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2" />
          <input
            type="text"
            placeholder="ePbt, GMK, etc."
            className="w-full rounded border-2 border-gray-500 bg-[#706677] py-1 pl-10 text-white outline-none"
          />
        </div>
      </div>
      <footer className="mt-auto">
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Vendors</a>
          </li>
        </ul>
      </footer>
    </div>
  )
}

export default Home

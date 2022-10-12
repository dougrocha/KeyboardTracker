import Card from "../components/Card"
import ItemCarousel from "../components/CardCarousel"
import Hero from "../components/Hero"
import ThemeToggle from "../components/ThemeToggle"
import MainViewLayout from "../layouts/MainViewLayout"

const Home = () => {
  return (
    <MainViewLayout>
      <Hero />

      <ThemeToggle />

      <div className="mt-36 mb-10 flex flex-col space-y-10 overflow-x-scroll">
        <ItemCarousel title="Interest Checks">
          <Card title="TESTING" />
          <Card title="TESTING 2" />
          <Card title="TESTING 2" />
          <Card title="TESTING 2" />
        </ItemCarousel>
        <ItemCarousel title="Group Buys">
          <Card title="TESTING" />
          <Card title="TESTING 2" />
          <Card title="TESTING 2" />
          <Card title="TESTING 2" />
        </ItemCarousel>
        <div className="flex flex-col items-center">
          <p className="mb-8 mt-10 text-2xl font-semibold">Live Group Buys</p>
          <div className="grid-cols-auto grid w-full grid-rows-6 place-items-center gap-4 md:grid-rows-5 lg:grid-cols-4 lg:gap-0">
            <Card title="TESTING 2" />
            <Card title="TESTING 2" />
            <Card title="TESTING 2" />
            <Card title="TESTING 2" />
            <Card title="TESTING 2" />
            <Card title="TESTING 2" />
            <Card title="TESTING 2" />
            <Card title="TESTING 2" />
          </div>
          <button className="mt-10 rounded-md bg-gray-200 py-2 px-4 font-medium text-black">
            Find More
          </button>
        </div>
      </div>
    </MainViewLayout>
  )
}

export default Home

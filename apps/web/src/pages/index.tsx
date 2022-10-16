import Card from "../components/Card"
import ItemCarousel from "../components/CardCarousel"
import Hero from "../components/Hero"
import MainViewLayout from "../layouts/MainViewLayout"

const Home = () => {
  return (
    <MainViewLayout>
      <Hero />

      <div className="mt-20 mb-10 flex flex-col space-y-10 overflow-x-scroll">
        <ItemCarousel title="Interest Checks">
          {/* 
          <Card title="TESTING" className="w-64" image="/hero.jpg" />
          <Card title="TESTING 2" className="w-64" image="/hero.jpg" />
          <Card title="TESTING 2" className="w-64" image="/hero.jpg" />
          <Card title="TESTING 2" className="w-64" image="/hero.jpg" /> 
          */}
          {[1, 2, 3, 4].map((i) => (
            <Card
              title={i.toString()}
              className="w-80 rounded"
              image="/hero.jpg"
              alt="keyboard"
              key={i}
            />
          ))}
        </ItemCarousel>
        <ItemCarousel title="Group Buys">
          {[11, 22, 33, 44].map((i) => (
            <Card
              title={i.toString()}
              className="w-80 rounded"
              image="/hero.jpg"
              alt="keyboard"
              key={i}
            />
          ))}
        </ItemCarousel>

        <div className="flex flex-col items-center">
          <p className="mb-8 mt-10 text-2xl font-semibold">Live Group Buys</p>
          <div className="grid w-full grid-cols-1 place-items-center sm:grid-cols-2 lg:grid-cols-3">
            {[123, 14, 1222, 19].map((i) => (
              <Card
                title={i.toString()}
                className="w-full rounded sm:w-72 md:w-80 xl:w-96"
                image="/hero.jpg"
                alt="keyboard"
                key={i}
              />
            ))}
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

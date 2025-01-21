import Movies from "./LimitedMovies";
import Footer from "./Footer";

function Home() {
  return (
    <>
      <main>
        <div className={`relative bg-gradient-to-t from-yellow-500 h-[400px] `}>
          <div className="absolute top-[200px] text-center w-9/12">
            <p className="text-2xl text-slate-400 font-bold mb-7">
              Our first OTT app
            </p>
            <blockquote className="text-2xl font-semibold italic text-center text-slate-900 ">
              Step up your movie
              <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-pink-400 relative inline-block skew-y-3 mx-2">
                <span className="relative text-white">watching</span>
              </span>
              experience all the time.
            </blockquote>
          </div>
        </div>
        <div className="bg-[#3E5879] w-full">
          <Movies />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Home;

// ${showMenu} ? "hidden" : "visible"

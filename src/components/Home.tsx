import { lazy, Suspense } from "react";

const Footer = lazy(() => import("./Footer"));
const LimitedMovies = lazy(() => import("./LimitedMovies"));

function Home() {
  return (
    <>
      <main>
        <div className={`relative bg-gradient-to-t from-yellow-500 h-[400px] `}>
          <div className="absolute top-[200px] text-center w-9/12">
            <p className="text-2xl text-slate-400 font-bold mb-7">
              My first Movie app
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
          <Suspense fallback={<h2>loading...</h2>}>
            <LimitedMovies />
          </Suspense>
        </div>
      </main>
      <Suspense fallback={<p>Loading Footer...</p>}>
        <Footer />
      </Suspense>
    </>
  );
}

export default Home;

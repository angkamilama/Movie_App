import WatchingMovie from "../assets/WatchingMovie.jpg";

function About() {
  return (
    <div className="bg-slate-600 min-h-screen w-screen pt-[45px] flex justify-center items-center">
      <div className=" p-5 bg-slate-300 flex flex-col justify-evenly items-center gap-8 min-h-screen w-full md:w-8/12">
        <img src={WatchingMovie} />
        <div className=" w-full">
          <h3 className="text-xl mb-4">About Us – TMDB Movie App 🎬</h3>
          <p>
            Welcome to TMDB, your ultimate destination for exploring the world
            of movies! 🌟 Whether you're a casual viewer or a die-hard
            cinephile, our app is designed to bring you the latest and greatest
            from the movie industry. Who We Are At TMDB, we are passionate about
            films and committed to providing movie lovers with an easy,
            seamless, and engaging way to discover, review, and track their
            favorite films. Our platform is built to connect audiences with
            blockbuster hits, indie gems, and everything in between.
          </p>
        </div>
        <div className=" w-full ">
          <h3 className="text-xl mb-4">What We Offer</h3>
          <ul>
            <li>
              🎥 <span className="font-bold">Latest Movie Releases</span> - Stay
              updated with newly released movies and upcoming blockbusters.
            </li>
            <li>
              ⭐<span className="font-bold">Ratings & Reviews</span> - Read and
              share honest reviews to help others choose their next watch.
            </li>
            <li>
              🔍 <span className="font-bold">Personalized Recommendations</span>
              - Get movie suggestions tailored to your taste.
            </li>
            <li>
              🎞 <span className="font-bold">Detailed Movie Information</span> -
              Access cast, crew, trailers, and behind-the-scenes content.
            </li>
            <li>
              📜 <span className="font-bold">Watchlist & Favorites</span> - Keep
              track of movies you love or plan to watch.
            </li>
          </ul>
        </div>
        <div className=" w-full">
          <h3 className="text-xl mb-4">Our Mission </h3>
          <p>
            We aim to create a community where movie lovers can explore, share,
            and celebrate cinema together. Whether you're into action-packed
            thrillers, heartwarming dramas, or mind-bending sci-fi, TMDB has
            something for everyone. Join Us! Start your cinematic journey today
            and never miss out on the magic of movies.
          </p>
          <p className="text-xl mt-4">🌍🍿 Happy Watching! 🎬✨</p>
        </div>
      </div>
    </div>
  );
}

export default About;

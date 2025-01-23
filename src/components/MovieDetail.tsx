import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovies } from "../movieAPI";
import { Movie } from "../types/movieType";
import MyCarousel from "./MyCarousel";
import Footer from "./Footer";

function MovieDetail() {
  const { movieId } = useParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMoviesData = async () => {
      try {
        const moviesData = await fetchMovies();
        setMovies(moviesData);
        const movie = moviesData.find((movie: Movie) => {
          return movie.id === Number(movieId);
        });

        setSelectedMovie(movie);
      } catch (error) {
        console.error("error:", error);
      }
    };
    fetchMoviesData();
  }, [movieId]);

  if (!selectedMovie) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex flex-col justify-evenly gap-5 items-center bg-slate-800 md:flex-row md:h-[600px]">
        <img
          src={`https://image.tmdb.org/t/p/w500${selectedMovie?.poster_path}`}
          className="p-4 rounded-lg w-10/12 h-[500px] md:h-[500px]"
        />
        <div className="p-4 text-slate-300 h-[400px] md:h-[500px] flex flex-col justify-evenly items-start ">
          <h1 className="text-4xl">{selectedMovie?.title}</h1>
          <p className="text-[#E7D283]">
            Vote: {Math.floor(selectedMovie?.vote_average)} / 10
          </p>
          <p>{selectedMovie?.overview || "Overview not available"}</p>
          <p className="text-[#A9C46C]">
            Release date: {selectedMovie?.release_date}
          </p>

          <button className="bg-yellow-300 hover:bg-yellow-500 text-slate-800 text-sm font-bold w-[140px] h-12 rounded-lg p-2 ">
            Add to Favourite
          </button>
        </div>
      </div>
      <div className="bg-slate-700 text-center flex flex-col justify-evenly w-full h-[500px] border border-red-800 ">
        <h1 className="text-white font-extrabold text-2xl">RELATED MOVIES</h1>
        <div>
          {movies.length > 0 ? (
            <MyCarousel movies={movies} />
          ) : (
            <p>No related movies available.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MovieDetail;

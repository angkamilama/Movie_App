import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovies } from "../MovieAPI";
import { Movie } from "../types/Types";
import MyCarousel from "./MyCarousel";
import Footer from "./Footer";
import WatchListMovie from "./WatchListMovie";

function MovieDetail() {
  const { movieId } = useParams();
  const [movies, setMovies] = useState<Movie[] | []>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [errorMsg, setErrorMsg] = useState<null | string>();

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
        setErrorMsg("there is no movie to fetch");
      }
    };
    fetchMoviesData();
  }, [movieId]);

  if (!selectedMovie) {
    return <div>There is an error !</div>;
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
            Vote: {`${Math.floor(selectedMovie?.vote_average)}`} / 10
          </p>
          <p>{selectedMovie?.overview || "Overview not available"}</p>
          <p className="text-[#A9C46C]">
            Release date: {selectedMovie?.release_date}
          </p>
          {errorMsg ? (
            errorMsg
          ) : (
            <WatchListMovie selectedMovie={selectedMovie} />
          )}
        </div>
      </div>
      <div className="bg-slate-700 text-center flex flex-col justify-evenly w-full h-[500px]  ">
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

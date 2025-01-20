import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovies } from "../movieAPI";
import { Movie } from "../interface/MovieInterface";

function MovieDetail() {
  const { userId } = useParams();
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>();

  useEffect(() => {
    const fetchMoviesData = async () => {
      try {
        const moviesData = await fetchMovies();

        const movie = moviesData.find((movie: Movie) => {
          return movie.id === Number(userId);
        });
        setSelectedMovie(movie);
      } catch (error) {
        console.error("error:", error);
      }
    };
    fetchMoviesData();
  }, [userId]);

  if (!selectedMovie) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="flex flex-col justify-evenly gap-5 items-center bg-slate-700 md:flex-row md:h-[600px]">
        <img
          src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
          className="p-4 rounded-lg h-[500px] md:h-[500px]"
        />
        <div className="p-4 text-slate-300 h-[400px] md:h-[500px] flex flex-col justify-evenly items-start ">
          <h1 className="text-4xl">{selectedMovie.title}</h1>
          <p className="text-[#E7D283]">
            Vote:{selectedMovie.vote_average} / 10
          </p>
          <p>{selectedMovie.overview}</p>
          <p className="text-[#A9C46C]">{selectedMovie.release_date}</p>
          <button className="bg-yellow-500 text-slate-800 font-bold w-[90px] h-9 rounded-lg">
            Buy
          </button>
        </div>
      </div>
    </>
  );
}

export default MovieDetail;

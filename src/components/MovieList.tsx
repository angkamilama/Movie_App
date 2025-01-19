import { useEffect, useState } from "react";
import { fetchMovies } from "../TMDBAPI";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: string;
  release_date: string;
}
function MovieList() {
  const [movies, setMovies] = useState<Movie[]>();

  useEffect(() => {
    const fetchMoviesData = async () => {
      const moviesData = await fetchMovies();
      setMovies(moviesData);
    };
    fetchMoviesData();
  }, []);

  const moviesList = movies?.map((movie) => {
    const { id, title, poster_path, overview, release_date, vote_average } =
      movie;

    return (
      <div
        key={id}
        className="bg-slate-700 flex flex-col justify-evenly items-center w-[300px] md:w-[250px] h-[400px] "
      >
        <img
          src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${poster_path}`}
          className="w-[400px] h-[350px]"
          alt={`poster of ${title}`}
        />
        <p className="text-slate-400 hover:text-slate-200 p-2 text-center font-bold text-base cursor-pointer">
          {title}
        </p>
      </div>
    );
  });

  return (
    <>
      <div className=" bg-[#3E5879] flex flex-col justify-evenly items-center w-full p-5">
        <h3 className="text-2xl text-yellow-200 mb-5">Movies</h3>
        <div className="flex flex-wrap justify-center items-center gap-4">
          {moviesList}
        </div>
      </div>
    </>
  );
}

export default MovieList;

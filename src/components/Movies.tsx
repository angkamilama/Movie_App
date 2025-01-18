import { useEffect, useState } from "react";
import { fetchMovies } from "../TMDBAPI";

interface Movie {
  id: number;
  title: string;
  overview: string;
}

const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    const fetchMoviesData = async () => {
      const moviesData = await fetchMovies();
      setMovies(moviesData);
    };
    fetchMoviesData();
  }, []);

  const limitedMovieList = movies.slice(0, 8);

  const movieList = limitedMovieList.map((movie) => {
    const { poster_path, title, vote_average, release_date, id, overview } =
      movie;
    return (
      <div
        key={id}
        className="bg-slate-700 flex flex-col justify-evenly items-center"
      >
        <img
          src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${poster_path}`}
          className="w-[200px] h-[250px]"
        />
        <p className="text-slate-400 hover:text-slate-200 p-2 text-center font-bold text-lg cursor-pointer">
          {title}
        </p>
      </div>
    );
  });

  return (
    <>
      <div className="flex  flex-col h-justify-evenly items-center">
        <h1 className="text-slate-200 text-2xl font-bold mt-9">
          BROWSE MOVIES
        </h1>
        <div className="mt-4 flex gap-4 flex-wrap justify-evenly items-center ">
          {movieList}
        </div>
        <h3 className="bg-yellow-500 p-1 rounded-lg  text-center w-11/12">
          View All
        </h3>
      </div>
    </>
  );
};
export default Movies;

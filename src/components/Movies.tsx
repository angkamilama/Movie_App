import { useEffect, useState } from "react";
import { fetchMovies } from "../movieAPI";
import { NavLink } from "react-router-dom";
import { Movie } from "../types/movieType";

function MovieList() {
  const [movies, setMovies] = useState<Movie[] | null>();

  useEffect(() => {
    try {
      const fetchMoviesData = async () => {
        const moviesData = await fetchMovies();
        setMovies(moviesData);
      };
      fetchMoviesData();
    } catch (error) {
      console.log(error, "failed to fetch it ang!");
    }
  }, []);

  const moviesList = movies?.map((movie) => {
    const { id, title, poster_path } = movie;

    return (
      <NavLink
        key={id}
        to={`${id}`}
        className="bg-slate-700 flex flex-col justify-evenly items-center w-[300px] md:w-[250px] h-[425px] "
      >
        <img
          src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${poster_path}`}
          className="w-[400px] h-[350px] hover:scale-105"
          alt={`poster of ${title}`}
        />
        <p className="text-slate-400 hover:text-slate-200 text-center font-bold text-base cursor-pointer p-3">
          {title}
        </p>
      </NavLink>
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

import { useEffect, useState } from "react";
import { fetchMovies } from "../movieAPI";
import { NavLink } from "react-router-dom";
import { Movie } from "../types/Types";

function MovieList() {
  const [movies, setMovies] = useState<Movie[] | null>();
  const [errorMsg, setErrorMsg] = useState(false);

  useEffect(() => {
    const fetchMoviesData = async () => {
      try {
        const moviesData = await fetchMovies();
        console.log(moviesData);
        setMovies(moviesData);
      } catch (error) {
        setErrorMsg(true);
      }
    };

    fetchMoviesData();
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
        {errorMsg ? (
          <p className="mt-[200px] text-red-700">
            There is an error loading movie
          </p>
        ) : (
          <div className="flex flex-wrap justify-center items-center gap-4">
            {moviesList}
          </div>
        )}
      </div>
    </>
  );
}

export default MovieList;

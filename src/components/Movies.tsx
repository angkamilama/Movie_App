import { useEffect, useState } from "react";
import { fetchMovies } from "../movieAPI";
import { useNavigate, NavLink } from "react-router-dom";
import { Movie } from "../interface/MovieInterface";

const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMoviesData = async () => {
      const moviesData = await fetchMovies();
      const limitedMovieList = moviesData.slice(0, 8);
      setMovies(limitedMovieList);
    };
    fetchMoviesData();
  }, []);

  let navigate = useNavigate();

  const movieList = movies.map((movie) => {
    const { poster_path, title, id } = movie;
    return (
      <NavLink
        key={id}
        to={`movieList/${id}`}
        className="bg-slate-700 flex flex-col justify-evenly items-center hover:scale-105 md:hover:scale-110"
      >
        <img
          src={`https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${poster_path}`}
          className="w-[200px] h-[250px]"
          alt={`poster of ${title}`}
        />
        <p className="text-slate-400 hover:text-slate-200 p-2 text-center font-bold text-lg cursor-pointer">
          {title}
        </p>
      </NavLink>
    );
  });

  return (
    <>
      <div className="flex flex-col justify-evenly items-center">
        <div className="text-center">
          <h1 className="text-slate-200 text-2xl font-bold mt-9">
            BROWSE MOVIES
          </h1>
        </div>
        <div className="mt-4 flex gap-4 flex-wrap justify-evenly items-center ">
          {movieList}
        </div>
        <button
          className="bg-yellow-500 hover:bg-yellow-400  p-1 rounded-lg  text-center my-7 w-9/12"
          onClick={() => {
            navigate("MovieList");
          }}
        >
          View All
        </button>
      </div>
    </>
  );
};
export default Movies;

import { useEffect, useState } from "react";
import { fetchMovies } from "../TMDBAPI";

interface Movie {
  id: number;
  title: string;
  overview: string;
}

const MoviesAPI = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    const fetchMoviesData = async () => {
      const moviesData = await fetchMovies();
      setMovies(moviesData);
    };
    fetchMoviesData();
  }, []);

  return (
    <div>
      <h1>Popular Movies</h1>
      {movies.map((movie) => (
        <div key={movie?.id}>
          <h2>{movie?.title}</h2> <p>{movie?.overview}</p>
        </div>
      ))}
    </div>
  );
};
export default MoviesAPI;

import { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "@/firebase/firebase-config";
import { Movie } from "@/types/Types";

type MoviesAddedProps = {
  movieAutoId: string;
  movieInfo: Movie;
};

function ShoppingCart() {
  const [favouriteMovies, setFavouriteMovies] = useState<
    MoviesAddedProps[] | []
  >([]);

  const moviesCollectionRef = collection(db, "Movies");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesAddedRef = await getDocs(moviesCollectionRef);

        const movieAdded = moviesAddedRef.docs.map((movie) => ({
          movieAutoId: movie.id,
          movieInfo: movie.data() as Movie,
        }));
        console.log(movieAdded);
        setFavouriteMovies(movieAdded);
      } catch (error) {
        console.error("there is an error", error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className="mt-12">
      {favouriteMovies?.map((movie) => {
        const { movieInfo, movieAutoId } = movie;
        return (
          <div key={movieAutoId} className="movie-card">
            <h3>{movieInfo.title}</h3>
            <p>release_date: {movieInfo.release_date}</p>
            <img
              src={`https://image.tmdb.org/t/p/w500${movieInfo?.poster_path}`}
              className="p-4 rounded-lg w-10/12 h-[500px] md:h-[500px]"
            />
          </div>
        );
      })}
    </div>
  );
}

export default ShoppingCart;

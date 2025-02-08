import { useState, useEffect } from "react";
import {
  getDocs,
  doc,
  deleteDoc,
  query,
  where,
  collection,
} from "firebase/firestore";
import { db, auth } from "@/firebase/firebase-config";
import { Movie, MoviesAddedProps } from "@/types/Types";
import { onAuthStateChanged } from "firebase/auth";
import { RiDeleteBin5Line } from "react-icons/ri"; //

function ShoppingCart() {
  const [favouriteMovies, setFavouriteMovies] = useState<MoviesAddedProps[]>(
    []
  );
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setFavouriteMovies([]);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchMovies = async () => {
      try {
        const moviesAddedRef = collection(db, "Movies");
        const myMovies = query(
          moviesAddedRef,
          where("createdBy", "==", user.uid)
        );
        const moviesSnapshot = await getDocs(myMovies);
        const movieAdded = moviesSnapshot.docs.map((movie) => ({
          movieAutoId: movie.id,
          movieInfo: movie.data() as Movie,
        }));

        console.log("Fetched movies:", movieAdded);
        setFavouriteMovies(movieAdded);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [user]);

  const RemoveMovie = async (id: string) => {
    try {
      const removeMovieRef = doc(db, "Movies", id);
      await deleteDoc(removeMovieRef);
      setFavouriteMovies((prevMovies) =>
        prevMovies.filter((movie) => movie.movieAutoId !== id)
      );

      console.log(`Movie with ID ${id} removed successfully`);
    } catch (error) {
      console.error("Error removing movie");
    }
  };

  return (
    <div className="mt-12 w-full min-h-screen bg-[#5C7285]">
      <div className="w-full md:w-8/12 h-auto text-center mx-auto">
        {favouriteMovies.length > 0 ? (
          favouriteMovies.map((movie) => (
            <div
              key={movie.movieAutoId}
              className="flex justify-evenly items-center"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.movieInfo?.poster_path}`}
                alt={movie.movieInfo?.title || "Movie Poster"}
                className="p-3 rounded-lg w-6/12 h-[300px] md:h-[300px]"
              />
              <div className="flex flex-col justify-evenly items-center w-4/12 h-[200px] border border-dashed border-slate-400">
                <h3 className="text-xl">{movie.movieInfo.title}</h3>
                <button
                  className="w-[20px]"
                  onClick={() => RemoveMovie(movie.movieAutoId)}
                >
                  <RiDeleteBin5Line className="text-yellow-300 hover:text-red-500 w-[30px] h-7 rounded-lg" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-red-400 text-2xl mt-12">
            Sorry! There are no movies to display
          </p>
        )}
      </div>
    </div>
  );
}

export default ShoppingCart;

import { useState, useEffect } from "react";
import { getDocs, doc, deleteDoc, collection } from "firebase/firestore";
import { db } from "@/firebase/firebase-config";
import { Movie, MoviesAddedProps } from "@/types/Types";
import { RiDeleteBin5Line } from "react-icons/ri";

function ShoppingCart() {
  const [favouriteMovies, setFavouriteMovies] = useState<
    MoviesAddedProps[] | []
  >([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesAddedRef = await getDocs(collection(db, "Movies"));

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

  const RemoveMovie = async (id: string) => {
    try {
      const removeMovie = doc(db, "Movies", id);
      await deleteDoc(removeMovie);

      setFavouriteMovies((prevMovies) =>
        prevMovies.filter((movie) => movie.movieAutoId !== id)
      );
    } catch (error) {
      console.error("There was an error removing the movie:", error);
    }
  };

  return (
    <div className="mt-12 w-full h-lvh bg-[#5C7285]">
      <div className="w-full md:w-8/12 h-auto text-center mx-auto">
        {favouriteMovies.length > 0 ? (
          favouriteMovies.map((movie) => {
            const { movieInfo, movieAutoId } = movie;
            return (
              <div
                key={movieAutoId}
                className="flex justify-evenly items-center"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movieInfo?.poster_path}`}
                  alt={movieInfo?.title || "Movie Poster"}
                  className="p-3 rounded-lg w-6/12 h-[300px] md:h-[300px]"
                />
                <div className="flex flex-col justify-evenly items-center  w-4/12 h-[200px] border border-dashed border-slate-400">
                  <h3 className="text-xl">{movieInfo.title}</h3>
                  <div>
                    <button
                      className="w-[20px] "
                      onClick={() => RemoveMovie(movieAutoId)}
                    >
                      <RiDeleteBin5Line className=" text-yellow-300 hover:text-red-500 w-[30px]  h-7 rounded-lg" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>There are no movies to display</p>
        )}
      </div>
    </div>
  );
}

export default ShoppingCart;

import { db } from "@/firebase/firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { Movie, FavouriteProps } from "@/types/Types";
import { useState, useEffect } from "react";
import { TiTickOutline } from "react-icons/ti";

function Favourite({ selectedMovie }: FavouriteProps) {
  const [addedFavourtie, setAddedFavourite] = useState(false);
  const [addedMovies, setAddedMovie] = useState<Movie[] | []>([]);
  useEffect(() => {
    const checkIfMovieExists = async () => {
      try {
        const docRef = collection(db, "Movies");
        const Movies = await getDocs(docRef);
        const availableMovies = Movies.docs.map((doc) => {
          return { ...(doc.data() as Movie) };
        });
        setAddedMovie(availableMovies);
        const movieAlreadyAdded = availableMovies.some(
          (movie) => movie.id === selectedMovie.id
        );
        setAddedFavourite(movieAlreadyAdded);
      } catch (error) {
        console.error(error);
      }
    };

    checkIfMovieExists();
  }, [selectedMovie]);

  const handleFavourite = async () => {
    try {
      let movieThere = addedMovies.some(
        (movie) => movie.id === selectedMovie.id
      );
      if (movieThere) {
        console.log("there is movie");
        return;
      }
      const docRef = collection(db, "Movies");
      await addDoc(docRef, selectedMovie);
      setAddedFavourite(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button onClick={handleFavourite}>
        {addedFavourtie ? (
          <span className="flex justify-evenly items-center w-[120px]">
            <p>Added</p>
            <TiTickOutline className="bg-green-600 text-slate-200 w-[40px] h-8 p-2" />
          </span>
        ) : (
          <p className="bg-yellow-300 hover:bg-yellow-500 text-slate-800 text-sm font-bold w-[140px] h-10 rounded-lg p-2 ">
            Add to Favourite
          </p>
        )}
      </button>
    </>
  );
}

export default Favourite;

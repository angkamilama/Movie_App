import { db } from "@/firebase/firebase-config";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { Movie } from "@/types/movieType";
import { useState, useEffect } from "react";
import { TiTickOutline } from "react-icons/ti";

type FavouriteProps = {
  selectedMovie: Movie;
};
function Favourite({ selectedMovie }: FavouriteProps) {
  const [addedFavourtie, setAddedFavourite] = useState(false);
  useEffect(() => {
    const checkIfMovieExists = async () => {
      try {
        const docRef = collection(db, "Movies");
        const Movies = await getDocs(docRef);
        const availableMovies = Movies.docs.map((doc) => {
          return { ...doc.data() };
        });

        // Check if the movie is already in the favorites
        const movieAlreadyAdded = availableMovies.some(
          (movie) => movie.id === selectedMovie.id
        );

        setAddedFavourite(movieAlreadyAdded); // Set state based on whether movie is found
      } catch (error) {
        console.error(error);
      }
    };

    checkIfMovieExists(); // Call the function to check if the movie is already added
  }, [selectedMovie]);

  const handleFavourite = async () => {
    try {
      const docRef = collection(db, "Movies");
      const Movies = await getDocs(docRef);
      const availableMovies = Movies.docs.map((doc) => {
        return { ...doc.data() };
      });

      console.log(availableMovies);
      let movieThere = availableMovies.some(
        (movie) => movie.id === selectedMovie.id
      );
      if (movieThere) {
        console.log("there is movie");
        return;
      }
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
            <TiTickOutline className="bg-green-600 text-slate-200 w-[40px] h-10 p-2" />
          </span>
        ) : (
          <p className="bg-yellow-300 hover:bg-yellow-500 text-slate-800 text-sm font-bold w-[140px] h-12 rounded-lg p-2 ">
            Add to Favourite
          </p>
        )}
      </button>
    </>
  );
}

export default Favourite;

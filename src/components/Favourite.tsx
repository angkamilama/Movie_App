import { db } from "@/firebase/firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  query,
  doc,
  where,
  deleteDoc,
} from "firebase/firestore";
import { FavouriteProps } from "@/types/Types";
import { useState, useEffect } from "react";

function Favourite({ selectedMovie }: FavouriteProps) {
  const [addedFavourite, setAddedFavourite] = useState(false);
  let moviesCollectionRef = collection(db, "Movies");

  useEffect(() => {
    const checkIfMovieExists = async () => {
      try {
        const q = query(
          moviesCollectionRef,
          where("id", "==", selectedMovie.id)
        );
        const querySnapshot = await getDocs(q);
        setAddedFavourite(!querySnapshot.empty);
      } catch (error) {
        console.error(error);
      }
    };
    checkIfMovieExists();
  }, [selectedMovie, moviesCollectionRef]);

  const addMovie = async () => {
    try {
      if (addedFavourite) {
        console.log("there is movie");
        return;
      }
      await addDoc(moviesCollectionRef, selectedMovie);
      setAddedFavourite(true);
    } catch (error) {
      console.error(error);
    }
  };

  const RemoveMovie = async () => {
    try {
      const moviesAddedRef = await getDocs(moviesCollectionRef);

      const movieAdded = moviesAddedRef.docs.map((movie) => ({
        movieAutoId: movie.id,
        movieInfo: movie.data(),
      }));

      console.log(movieAdded);
      const movieToRemove = movieAdded.find(
        (movie) => movie.movieInfo.id == selectedMovie.id
      );

      if (movieToRemove) {
        const removeMovieId = movieToRemove.movieAutoId;
        console.log("Removing movie with ID:", removeMovieId);

        const removeMovie = doc(db, "Movies", removeMovieId);

        await deleteDoc(removeMovie);
        setAddedFavourite(false);
      }
    } catch (error) {
      console.error("There was an error removing the movie:", error);
    }
  };

  return (
    <>
      <div>
        {addedFavourite ? (
          <div className="flex justify-evenly items-center w-[180px]">
            <p className="bg-green-600 text-slate-200 w-[70px] h-10 p-2 rounded-lg">
              Added
            </p>
            <button
              onClick={RemoveMovie}
              className="bg-red-500 hover:bg-red-600 text-slate-200 w-[70px] h-10 p-2 rounded-lg"
            >
              Remove
            </button>
          </div>
        ) : (
          <button
            onClick={addMovie}
            className="bg-yellow-300 hover:bg-yellow-500 text-slate-800 text-sm font-bold w-[140px] h-10 rounded-lg p-2 "
          >
            Add to WatchList
          </button>
        )}
      </div>
    </>
  );
}

export default Favourite;

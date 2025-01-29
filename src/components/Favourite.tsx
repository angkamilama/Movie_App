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

  return (
    <>
      <div>
        {addedFavourite ? (
          <div className="flex justify-evenly items-center w-[180px]">
            <p className="bg-green-600 text-slate-200 text-center w-[70px] h-10 p-2 rounded-lg">
              Added
            </p>
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

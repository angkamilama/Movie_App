import { db, auth } from "@/firebase/firebase-config";
import {
  collection,
  onSnapshot,
  addDoc,
  query,
  where,
} from "firebase/firestore";
import { FavouriteProps } from "@/types/Types";
import { useState, useEffect } from "react";

function WatchListMovie({ selectedMovie }: FavouriteProps) {
  const [addedFavourite, setAddedFavourite] = useState(false);
  let moviesCollectionRef = collection(db, "Movies");

  useEffect(() => {
    if (!selectedMovie?.id || !auth.currentUser) return;

    const user = auth.currentUser;
    const myQuery = query(
      moviesCollectionRef,
      where("id", "==", selectedMovie.id),
      where("createdBy", "==", user.uid)
    );

    const unsubscribeMovies = onSnapshot(myQuery, (movies) => {
      setAddedFavourite(!movies.empty);
    });

    return () => unsubscribeMovies();
  }, [selectedMovie]);

  const addMovie = async () => {
    try {
      if (addedFavourite) {
        return;
      }
      const user = auth.currentUser;
      await addDoc(moviesCollectionRef, {
        ...selectedMovie,
        createdBy: user?.uid,
      });
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
            <button className="bg-green-600 text-slate-200 text-center w-[70px] h-10 p-2 rounded-lg">
              Added
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

export default WatchListMovie;

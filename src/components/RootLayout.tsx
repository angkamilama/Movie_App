import { NavLink, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";
import { TiShoppingCart } from "react-icons/ti";
import { VscAccount } from "react-icons/vsc";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db, auth } from "@/firebase/firebase-config";
import { Movie, MoviesAddedProps } from "@/types/Types";
import { Suspense } from "react";

function RootLayout() {
  const [showMenu, setShowMenu] = useState(false);
  const [allMovies, setAllMovies] = useState<MoviesAddedProps[]>([]);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        const moviesCollectionRef = collection(db, "Movies");
        const myQuery = query(
          moviesCollectionRef,
          where("createdBy", "==", user.uid)
        );
        console.log(myQuery);

        const unsubscribeMovies = onSnapshot(myQuery, (movies) => {
          const movieAdded = movies.docs.map((doc) => ({
            movieAutoId: doc.id,
            movieInfo: doc.data() as Movie,
          }));
          console.log(movieAdded);
          setAllMovies(movieAdded);
        });

        return () => unsubscribeMovies();
      } else {
        setAllMovies([]);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  return (
    <div className="box-border">
      <header>
        <div className="p-2 fixed top-0 right-0 left-0 z-10 w-full h-[50px] bg-[#213555] flex justify-between items-center mx-auto mt-o">
          <NavLink to="/" className="text-2xl text-slate-100 tracking-widest">
            TMDB
          </NavLink>
          <div className="md:hidden ">
            {showMenu ? (
              <RxCross1
                className="w-8 h-9 text-slate-100 cursor-pointer"
                onClick={() => setShowMenu(false)}
              />
            ) : (
              <RxHamburgerMenu
                className="w-8 h-9 text-slate-100 cursor-pointer"
                onClick={() => setShowMenu(true)}
              />
            )}
          </div>
          <nav className=" hidden md:block w-7/12">
            <ul className="flex justify-evenly items-center text-slate-300">
              <NavLink
                to="movies"
                className=" text-base hover:text-[#D8C4B6] hover:scale-105 tracking-wider cursor-pointer"
              >
                Movies
              </NavLink>
              <NavLink
                to="About"
                className=" hover:text-[#D8C4B6] hover:scale-105 tracking-wider cursor-pointer"
              >
                About
              </NavLink>
              <NavLink
                to="/Contact"
                className=" hover:text-[#D8C4B6] hover:scale-105 tracking-wider cursor-pointer"
              >
                Contact
              </NavLink>
              <NavLink
                to="Register"
                className=" hover:text-[#D8C4B6] hover:scale-105 tracking-wider cursor-pointer"
              >
                Register
              </NavLink>
              <NavLink to="shoppingCart" className="relative cursor-pointer">
                <TiShoppingCart className="w-6 h-6" />
                {allMovies.length > 0 && (
                  <span className="absolute text-blue-700 bg-yellow-400 text-center bottom-2 left-6 border rounded-full h-6 w-6 text-sm font-bold">
                    {allMovies.length}
                  </span>
                )}
              </NavLink>
              <NavLink to="Login" className="cursor-pointer">
                <VscAccount className="w-6 h-6" />
              </NavLink>
            </ul>
          </nav>
        </div>
        <div className="flex border flex-col">
          {showMenu && (
            <>
              <ul className=" bg-[#3E5879] w-full h-screen flex flex-col justify-evenly items-center  text-slate-100 md:hidden">
                <NavLink
                  to="/"
                  onClick={() => setShowMenu(false)}
                  className=" hover:text-[#D8C4B6] hover:scale-105 tracking-widest cursor-pointer"
                >
                  Home
                </NavLink>
                <NavLink
                  to="Movies"
                  onClick={() => setShowMenu(false)}
                  className=" hover:text-[#D8C4B6] hover:scale-105 tracking-widest cursor-pointer"
                >
                  Movies
                </NavLink>
                <NavLink
                  to="About"
                  onClick={() => setShowMenu(false)}
                  className=" hover:text-[#D8C4B6] hover:scale-105 tracking-widest cursor-pointer"
                >
                  About
                </NavLink>
                <NavLink
                  to="Contact"
                  onClick={() => setShowMenu(false)}
                  className=" hover:text-[#D8C4B6] hover:scale-105 tracking-widest cursor-pointer"
                >
                  Contact
                </NavLink>
                <NavLink
                  to="Login"
                  onClick={() => setShowMenu(false)}
                  className=" hover:text-[#D8C4B6] hover:scale-105 tracking-widest cursor-pointer"
                >
                  Login
                </NavLink>
                <NavLink
                  to="ShoppingCart"
                  onClick={() => setShowMenu(false)}
                  className=" hover:text-[#D8C4B6] hover:scale-105 tracking-widest cursor-pointer"
                >
                  ShoppingCart
                </NavLink>
              </ul>
            </>
          )}
        </div>
      </header>
      <div>
        {!showMenu && (
          <Suspense fallback={<p>Loading...</p>}>
            <Outlet />
          </Suspense>
        )}
      </div>
    </div>
  );
}

export default RootLayout;

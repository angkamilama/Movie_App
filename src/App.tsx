import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";
import MoviesAPI from "./components/MoviesAPI";
import { GoBell } from "react-icons/go";
import { VscAccount } from "react-icons/vsc";

function App() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="box-border">
      <header>
        <div className="p-2  h-[50px] bg-[#213555] flex justify-between items-center mx-auto">
          <h1 className="text-2xl text-slate-100 tracking-widest">TMDB</h1>
          <div className="md:hidden">
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
          <div className=" hidden md:block w-7/12">
            <ul className="flex justify-evenly items-center text-slate-300">
              <li className=" text-base hover:text-[#D8C4B6] hover:scale-105 tracking-wider cursor-pointer">
                Movies
              </li>
              <li className=" hover:text-[#D8C4B6] hover:scale-105 tracking-wider cursor-pointer">
                New
              </li>
              <li className=" hover:text-[#D8C4B6] hover:scale-105 tracking-wider cursor-pointer">
                Contact
              </li>
              <li className=" hover:text-[#D8C4B6] hover:scale-105 tracking-wider cursor-pointer">
                More
              </li>
              <li className="cursor-pointer">
                <GoBell className="w-5 h-5" />
              </li>
              <li className="cursor-pointer">
                <VscAccount className="w-6 h-6" />
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col">
          {showMenu && (
            <>
              <ul className=" bg-[#3E5879] w-full h-screen flex flex-col justify-evenly items-center  text-slate-100 ">
                <li className=" hover:text-[#D8C4B6] hover:scale-105 tracking-widest cursor-pointer">
                  Movies
                </li>
                <li className=" hover:text-[#D8C4B6] hover:scale-105 tracking-widest cursor-pointer">
                  New
                </li>
                <li className=" hover:text-[#D8C4B6] hover:scale-105 tracking-widest cursor-pointer">
                  Contact
                </li>
                <li className=" hover:text-[#D8C4B6] hover:scale-105 tracking-widest cursor-pointer">
                  More
                </li>
              </ul>
            </>
          )}
        </div>
        <main className={showMenu ? "hidden" : "visible"}>
          <MoviesAPI />
        </main>
      </header>
    </div>
  );
}

export default App;

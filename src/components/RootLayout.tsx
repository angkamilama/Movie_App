import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";
import { GoBell } from "react-icons/go";
import { VscAccount } from "react-icons/vsc";

const RootLayout = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="box-border">
      <header>
        <div className="p-2  h-[50px] bg-[#213555] flex justify-between items-center mx-auto">
          <NavLink to="/" className="text-2xl text-slate-100 tracking-widest">
            TMDB
          </NavLink>
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
          <nav className=" hidden md:block w-7/12">
            <ul className="flex justify-evenly items-center text-slate-300">
              <NavLink
                to="MovieList"
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
                to="Contact"
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
              <NavLink to="" className="cursor-pointer">
                <GoBell className="w-5 h-5" />
              </NavLink>
              <NavLink to="Login" className="cursor-pointer">
                <VscAccount className="w-6 h-6" />
              </NavLink>
            </ul>
          </nav>
        </div>
        <div className="flex flex-col">
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
                  to="MovieList"
                  onClick={() => setShowMenu(false)}
                  className=" hover:text-[#D8C4B6] hover:scale-105 tracking-widest cursor-pointer"
                >
                  Movies
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
                  to="Register"
                  onClick={() => setShowMenu(false)}
                  className=" hover:text-[#D8C4B6] hover:scale-105 tracking-widest cursor-pointer"
                >
                  Register
                </NavLink>
              </ul>
            </>
          )}
        </div>
      </header>
      <div>{!showMenu && <Outlet />}</div>
    </div>
  );
};

export default RootLayout;

import { FaLocationDot } from "react-icons/fa6";
import { IoCallSharp } from "react-icons/io5";
import { LuMail } from "react-icons/lu";
import { MdOutlineCopyright } from "react-icons/md";

function Footer() {
  return (
    <footer>
      <div className=" border border-red-700 flex flex-col justify-evenly items-center bg-gradient-to-l from-yellow-500 contrast-75 h-[250px] p-2">
        <ul className="flex justify-evenly items-center w-11/12 md:w-6/12 p-2">
          <li className="tracking-wide  hover:scale-110 cursor-pointer">
            Home
          </li>
          <li className="tracking-wide hover:scale-110 cursor-pointer">
            About Us
          </li>
          <li className="tracking-wide hover:scale-110 cursor-pointer">
            Our Team
          </li>
          <li className="tracking-wide hover:scale-110 cursor-pointer">
            Process
          </li>
        </ul>
        <div className="flex justify-evenly items-center w-11/12 md:w-5/12 ">
          <div className="flex justify-evenly items-center w-4/12">
            <FaLocationDot />
            <p className="text-xs md:text-sm">Essen, Germany</p>
          </div>
          <div className="flex justify-evenly items-center w-4/12">
            <IoCallSharp />
            <p className="text-xs md:text-sm">+4912345678</p>
          </div>
          <div className="flex justify-evenly items-center w-4/12">
            <LuMail />
            <p className="text-xs md:text-sm">info@xyz.de</p>
          </div>
        </div>
        <div className="flex flex-col justify-evenly items-center w-10/12 md:w-6/12">
          <div className=" w-full">
            <ul className="flex justify-evenly items-center text-xs mb-4">
              <li className="hover:underline cursor-pointer">Privacy Policy</li>
              <li className="hover:underline cursor-pointer">
                Return, Refund & Cancellation Policy
              </li>
              <li className="hover:underline  cursor-pointer">
                Terms & Conditions
              </li>
            </ul>
          </div>
          <p className="flex text-sm">
            Copyright
            <span>
              <MdOutlineCopyright />
            </span>
            2025. All rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

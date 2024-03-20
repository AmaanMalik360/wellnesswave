import React from "react";
import img0 from "../../../assets/images/Green-removebg-preview.png";
import img3 from "../../../assets/images/me.jpeg";
// import { useState, useEffect } from "react";

const Navbar = ({ userImage, logoImage }) => {
  // const [userData, setUserData] = useState("");
  // useEffect(() => {
  //   const userData = localStorage.getItem("userData");

  //   console.log("Token from localStorage:", userData);
  //   setUserData(JSON.parse(userData));
  // }, []);
  return (
    <nav className="bg-indigo-900 p-3 h-24 flex justify-between items-center">
      <div>
        <img
          src={img0}
          width={50}
          height={50}
          alt="Logo"
          className="ml-5"
        />
      </div>
      <div className="flex items-center">
        <p className="text-white mr-5 font-style: italic">M. Hashim Fakhar</p>
        <img
          src={img3}
          alt="User"
          className="h-8 w-8 mr-5 rounded-full object-cover"
        />
      </div>
    </nav>
  );
};

export default Navbar;

import React, { useState } from "react";
import { useEffect } from "react";
import Navbar from "../../../components/common/navbar/Navbar";
import { Link } from "react-router-dom";
import Chat from "../../chat/Chat";

const Home = () => {
  const [userData, setUserData] = useState("");
  
  useEffect(() => {
    const userInfo = localStorage.getItem("user");
    console.log(userInfo);
    setUserData(JSON.parse(userInfo));
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex my-5">
        <nav>
          <div className="w-36 mx-5 my-8 h-96 bg-indigo-900 border-r rounded-lg border-indigo-300 p-4">
            <button className="my-1.5 px-6 py-1 text-black bg-indigo-200 font-semibold rounded-lg duration-150 hover:bg-indigo-500 active:bg-indigo-700">
              <Link to="/home">Home</Link>
            </button>
            <button className="my-1.5 px-1.5 py-1 text-black bg-indigo-200 font-semibold rounded-lg duration-150 hover:bg-indigo-500 active:bg-indigo-700">
              <Link to="/appointment-booking">Appointment</Link>
            </button>
            <button className="my-1.5 px-4 py-1 text-black bg-indigo-200 font-semibold rounded-lg duration-150 hover:bg-indigo-500 active:bg-indigo-700">
              <Link to="/indicators">Indicators</Link>
            </button>
            <button className="my-10 mt-10 px-4 py-1 text-white bg-red-600 font-semibold rounded-lg duration-150 hover:bg-indigo-500 active:bg-indigo-700">
              <Link to="/">Log Out</Link>
            </button>
          </div>
        </nav>
        {/* <Chat /> */}
        <section className="flex flex-col cards">
          <div className="card">
            <section className="mb-6 mx-10 border border-black border-2 rounded-lg pb-4 w-[800px] shadow-2xl">
              <div className="container mx-auto">
                <h2 className="text-3xl text-center text-white bg-indigo-900 font-bold mb-8 py-3">
                  University Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div>
                    <p className="text-lg font-semibold">{userData.rollNo}</p>
                    <p className="text-md font-semibold">Batch: CS19</p>
                  </div>
                  <div>
                    <p className="text-md font-semibold">
                      Degree: Computer Science
                    </p>
                    <p className="text-md font-semibold">Status: Current</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="card">
            <section className="mb-6 mx-10 border border-black border-2 rounded-lg pb-4 w-[800px] shadow-2xl">
              <div className="container mx-auto">
                <h2 className="text-3xl text-center text-white bg-indigo-900 font-bold mb-8 py-3">
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div>
                    <p className="text-lg font-semibold">
                      Name: {userData.name}
                    </p>
                    <p className="text-md font-semibold">
                      Phone Number: 03344024099
                    </p>
                  </div>
                  <div>
                    <p className="text-md font-semibold">
                      Father's Name: Fakhar-ud-Din Malik
                    </p>
                    <p className="text-md font-semibold">Blood Group: B+</p>
                  </div>
                </div>
              </div>
              <div className="card"></div>
            </section>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import Navbar from "../../../components/common/navbar/Navbar";
import { fetchAllPosts } from "../../../redux/actions/postActions/postActions";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {

  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem("user")) 
  const token = localStorage.getItem("token") 

  console.log("Token:",token)
  console.log("User:" ,user)

  // redux states
  const posts = useSelector(state => state?.post?.posts)
  console.log("These are posts",posts)
  // const posts = [
  //   {
  //       "_id": "65febe3dc12331ae13d90140",
  //       "heading": "Exercise to reduce stress",
  //       "body": "You need to to the following exercises.",
  //       "creator": "65fce4726b3bb37aaafcbc40",
  //       "createdAt": "2024-03-23T11:34:21.660Z",
  //       "updatedAt": "2024-03-23T11:34:21.660Z",
  //       "__v": 0
  //   },
  //   {
  //       "_id": "65ff074b0c3ca0873c964f76",
  //       "heading": "Exercise to make sure that anxiety is less",
  //       "body": "You need must follow the same exercise.",
  //       "creator": "65fce4726b3bb37aaafcbc40",
  //       "createdAt": "2024-03-23T16:46:03.398Z",
  //       "updatedAt": "2024-03-23T16:46:03.398Z",
  //       "__v": 0
  //   },
  //   {
  //       "_id": "65ff07d70c3ca0873c964f78",
  //       "heading": "Exercise to get your dopamine level under control.",
  //       "body": "You should read long articles for good amount of time.",
  //       "creator": "65fce4726b3bb37aaafcbc40",
  //       "createdAt": "2024-03-23T16:48:23.617Z",
  //       "updatedAt": "2024-03-23T16:48:23.617Z",
  //       "__v": 0
  //   },
  //   {
  //       "_id": "65ff08960c3ca0873c964f7d",
  //       "heading": "Exercise No. 4",
  //       "body": "This is going to be 4th exerice. You must follow this.",
  //       "creator": "65fce4726b3bb37aaafcbc40",
  //       "createdAt": "2024-03-23T16:51:34.946Z",
  //       "updatedAt": "2024-03-23T16:51:34.946Z",
  //       "__v": 0
  //   }
  // ]

  const getPosts = async () => {
    dispatch(fetchAllPosts(token));
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (user && token) {
          await getPosts();
        }
      } catch (error) {
        console.error("Error Fetching Tickets:", error);
      }
    };
    fetchPosts()
  }, [])
  


  return (
    <>
      <div className="ml-52 mb-20">
        <div className="h-full fixed inline-block border border-black">
     
        </div>
        
        {/* posts */}
        <div className="w-4/5 flex-col inline-block bg-indigo-50 pl-10 pt-10 pb-10">
            {posts?.map((post, i) => (
              <div className="w-3/5 ml-32 rounded-md border bg-white mb-5 border-black shadow-lg pt-5 pb-5 pr-5" key={i}>
                <h3 className="ml-5 text-indigo-800 mb-5 font-bold text-2xl underline"> {post?.heading}</h3>
                <p className="ml-5 amb-10 text-md italic">{post?.body}</p>
              </div>
            ))}
        </div>
        <div className="h-full fixed inline-block border border-black">
  
        </div>
        {/* <section className="flex flex-col cards">
          <div className="card">
            <section className="mb-6 mx-10 border border-black border-2 rounded-lg pb-4 w-[800px] shadow-2xl">
              <div className="container mx-auto">
                <h2 className="text-3xl text-center text-white bg-indigo-900 font-bold mb-8 py-3">
                  University Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div>
                    <p className="text-lg font-semibold">{user.rollNo}</p>
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
                      Name: {user.name}
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
        </section> */}
      </div>
    </>
  );
};

export default Home;

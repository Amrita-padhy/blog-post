import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Card from "../components/card";
import Adds from "../components/adds";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../util/firebase";

const Home = () => {
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    const postCollectionRef = collection(db, "postList");
    onSnapshot(postCollectionRef, (snapshot) => {
      if (!snapshot.empty) {
        const list = snapshot.docs.map((post) => post.data());
        console.log(list);
        setPostList(list);
      }
    });
  }, []);
  return (
    <div>
      {" "}
      {/* nav bar */} <Navbar />
      <div className="layOut">
        {/* side bar */} <Sidebar />
        {postList.map((item) => (
          <Card />
        ))}
        {/* adds */} <Adds />
      </div>
    </div>
  );
};

export default Home;

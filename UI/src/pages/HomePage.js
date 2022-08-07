import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Card from "../components/card";
import Adds from "../components/adds";
import { collection, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../util/firebase";
import Skeleton from "@mui/material/Skeleton";

const Home = () => {
  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // const [openBackdrop, setOpenBackdrop] = useState(false);

  useEffect(() => {
    const postCollectionRef = collection(db, "postList");
    onSnapshot(postCollectionRef, (snapshot) => {
      if (!snapshot.empty) {
        const list = snapshot.docs.map((post) => ({
          ...post.data(),
          postId: post.id,
        }));
        console.log(list);
        setPostList(list);
      }
    });
  }, []);

  return (
    <div>
      {/* nav bar */} <Navbar />
      <div className="layOut">
        {/* side bar */} <Sidebar />
        {loading ? (
          <div className="cards">
            {postList.map((item) => (
              <Card
                key={item.id}
                title={item.title}
                tag={item.tags}
                image={item.coverImage}
                postId={item.postId}
              />
            ))}
          </div>
        ) : (
          <Skeleton variant="rectangular" width={210} height={118} />
        )}
        {/* adds */} <Adds />
      </div>
    </div>
  );
};

export default Home;

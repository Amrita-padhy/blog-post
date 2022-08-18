import React, { useState, useEffect } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Card from "../components/card";
import Adds from "../components/adds";

import Skeleton from "@mui/material/Skeleton";
import { getRequest } from "../axios";

const Home = () => {
  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPostList = async () => {
    try {
      setLoading(true);
      const { data } = await getRequest(`/getPostList`);
      setPostList(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPostList();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="layOut">
        <Sidebar />
        {!loading ? (
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
          <Skeleton variant="rectangular" width={625} height={118} />
        )}
        <Adds />
      </div>
    </div>
  );
};

export default Home;

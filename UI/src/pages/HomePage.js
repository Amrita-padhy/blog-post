import React, { useState, useEffect } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Cards from "../components/Cards";
import Adds from "../components/adds";

import Skeleton from "@mui/material/Skeleton";
import { getRequest, postRequest } from "../axios";

const Home = () => {
  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(postList);
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

  const handleSavePost = async (postId, isReadingList) => {
    try {
      const payload = {
        postId,
        isReadingList: !isReadingList,
      };
      const res = await postRequest("saveForReading", payload);
      console.log(res.data);
      if (res) {
        await getPostList();
      }
    } catch (error) {}
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
              <Cards
                key={item.postId}
                title={item.title}
                tag={item.tags}
                image={item.coverImage}
                postId={item.postId}
                isReadingList={item.isReadingList}
                handleSavePost={handleSavePost}
              />
            ))}
          </div>
        ) : (
          <Skeleton
            variant="rectangular"
            sx={{ mt: 10 }}
            width={625}
            height={455}
          />
        )}
        <Adds />
      </div>
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Cards from "../components/Cards";
import Adds from "../components/adds";
import { collection, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../util/firebase";
import Skeleton from "@mui/material/Skeleton";

const Home = () => {
  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // const [openBackdrop, setOpenBackdrop] = useState(false);

  const getPostList = () => {
    const token = `eyJhbGciOiJSUzI1NiIsImtpZCI6IjA2M2E3Y2E0M2MzYzc2MDM2NzRlZGE0YmU5NzcyNWI3M2QwZGMwMWYiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiYW1yaXRhLnBhZGh5IDk4IiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FBVFhBSndKNHYzQXN2Y3oxR0Z0RnVSNHB1N3NNeW84Vk1NTTBvSFJwOXZtPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL3JlYWN0LWRlbW8tZTFkODgiLCJhdWQiOiJyZWFjdC1kZW1vLWUxZDg4IiwiYXV0aF90aW1lIjoxNjU0NzgxODE5LCJ1c2VyX2lkIjoiZkMyZ1JYa0NyS2VCU1BTY0ltN1B5ejN3aW5yMSIsInN1YiI6ImZDMmdSWGtDcktlQlNQU2NJbTdQeXozd2lucjEiLCJpYXQiOjE2NTk5NDAxNjAsImV4cCI6MTY1OTk0Mzc2MCwiZW1haWwiOiJwcml5YWFtcml0YTVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMTQ3NTQ5MDQ5NjcwMTE5NzQ1NjUiXSwiZW1haWwiOlsicHJpeWFhbXJpdGE1QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6Imdvb2dsZS5jb20ifX0.VKV9GHdLt6MlWFImBwhTTYXrw-MfPXJ4UW5o_amkNQ8lA1Kk9Z1Eu3QNlWzD5usvyDEDOhdtlPs19zJ7QuteHqqgz2kMAk-ghOxCoLpYzzKgM03ArDjTgPjVC-_9oxNK-zV5EIzzF4iQVNYjng7RY7ivlqx1cQ4YuWM8pPzeEdCFI3WAzcQLJ77L4thQusSVtT4LDm7Bk77B_sD-tIIPutdLnV0xSG6tTbYs-ertBz0OsWeRvUH1qYjD_RMho9vYqYP0ygLaCTd_jepXgMj0UE5Xu7s2-jcDSWN8Se_5a4NQe41UYLLoW7wvZSY9s2grzchSIopsvjou2NPUwmvYGg`;
    axios
      .get("http://localhost:5001/react-demo-e1d88/us-central1/getPostList", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
      });
  };

  useEffect(() => {
    // getPostList();
    const postCollectionRef = collection(db, "postList");
    onSnapshot(postCollectionRef, (snapshot) => {
      if (!snapshot.empty) {
        const list = snapshot.docs.map((post) => ({
          ...post.data(),
          postId: post.id,
          // key={post.id}
        }));
        console.log(list);
        setPostList(list);
      }
    });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="layOut">
        <Sidebar />
        {loading ? (
          <div className="cards">
            {postList.map((item) => (
              <Cards
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
        <Adds />
      </div>
    </div>
  );
};

export default Home;

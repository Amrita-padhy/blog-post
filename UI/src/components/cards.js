import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Typography from '@mui/material/Typography';

import Button from '@mui/material/Button';
const Cards = () => {
  return (
    <main className="blog_posts">
      <div className="posts_icon">
        <HomeIcon fontSize="large"/>
      </div>

      <div className="posts_details">
        <h3>jhon doe</h3>
        <h5>may 23 (3 hours)</h5>
        <h2>Lorem, ipsum dolor sit amet consectetur adipisicing.</h2>
       <div className="tags">
       <span className="tag-1">#Dev</span>
        <span className="tag-2">#Career</span>
        <span className="tag-3">#Help</span>
       </div>
       {/*  */}
       <div className="futter">
       <div className="likes-coments">
       <FavoriteBorderIcon />
       106likes
       <ChatBubbleOutlineIcon />
        77comments
       </div>
       <div className="btn">
           <h6>1 min read</h6>
      <Button variant="outlined" size="small">save</Button>

       </div>

       </div>
       
      </div>
    </main>
  );
};

export default Cards;

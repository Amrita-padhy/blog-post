import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';



import Button from "@mui/material/Button";
const Cards = () => {
  return (
    <>
    <div className="cards">
    <main className="blog_posts">
      <div className="posts_icon">
        <PeopleAltIcon fontSize="large" />
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
          <div className="like-comments">
          {/* <Button variant="outlined" startIcon={<FavoriteBorderIcon />}>
          likes
      </Button> */}
      <Stack direction="row" spacing={2}>
      <Button 
      size="small"
      color="inherit"
        startIcon={<FavoriteBorderIcon fontSize="inherit" />}>
       571 likes
      </Button>
      <Button 
       size="small"
      //  variant="outlined" 
      color="inherit"
       startIcon={ <ChatBubbleOutlineIcon fontSize="inherit" />}>
         568 comments
        
      </Button>
    </Stack>
          </div>
          <div className="btn">
            <span>1 min read</span>
            <Button color="inherit" size="small">
              save
            </Button>
          </div>
        </div>
      </div>
    </main>
    {/*  */}
    <main className="blog_posts">
      <div className="posts_icon">
        <HomeIcon fontSize="large" />
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
          <div className="like-comments">
          <IconButton
            size="large"
            edge="end"
            aria-haspopup="true"
            color="inherit"
          >
            <FavoriteBorderIcon />
          </IconButton>
            <span className="like_btn">106likes</span>
            {/*  */}
            <IconButton
            size="large"
            edge="end"
            aria-haspopup="true"
            color="inherit"
          >
            <ChatBubbleOutlineIcon />
          </IconButton>
            <span>77comments</span>
          </div>
          <div className="btn">
            <span>1 min read</span>
            <Button variant="outlined" size="small">
              save
            </Button>
          </div>
        </div>
      </div>
    </main>
{/*  */}
<main className="blog_posts">
      <div className="posts_icon">
        <HomeIcon fontSize="large" />
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
          <div className="like-comments">
          <IconButton
            size="large"
            edge="end"
            aria-haspopup="true"
            color="inherit"
          >
            <FavoriteBorderIcon />
          </IconButton>
            <span className="like_btn">106likes</span>
            {/*  */}
            <IconButton
            size="large"
            edge="end"
            aria-haspopup="true"
            color="inherit"
          >
            <ChatBubbleOutlineIcon />
          </IconButton>
            <span>77comments</span>
          </div>
          <div className="btn">
            <span>1 min read</span>
            <Button variant="outlined" size="small">
              save
            </Button>
          </div>
        </div>
      </div>
    </main>

    </div>
   
    </>
    
  );
};

export default Cards;

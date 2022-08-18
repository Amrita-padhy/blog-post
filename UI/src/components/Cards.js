import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// mui
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { grey } from "@mui/material/colors";
import Skeleton from "@mui/material/Skeleton";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
const Cards = ({ title, tag, image, postId }) => {
  let [saveBtn, setSaveBtn] = useState(false);

  const navigate = useNavigate();
  const openDetailPage = (item) => {
    console.log(postId);
    navigate(`/details-page/${postId}`);
  };
  // handleBtnTextChange
  function handleBtnTextChange(e) {
    e.stopPropagation();
    // !TODO  save page api call
    setSaveBtn((saveBtn = !saveBtn));
  }
  const pointer = { cursor: "pointer" };

  return (
    <>
      <div className="card_container">
        <Card style={pointer} onClick={openDetailPage}>
          <div className="cardWithImage">
            {image ? (
              <CardMedia
                component="img"
                height="250"
                img
                src={image}
                alt="coverImage"
              />
            ) : null}

            <CardHeader
              avatar={<Avatar aria-label="recipe">R</Avatar>}
              title="Shrimp and Chorizo Paella"
              subheader="September 14, 2016"
            />
            <div className="card_body">
              <CardContent>
                <Typography
                  color="text.primary"
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  {title}
                </Typography>
                {/* <div>
                  {tag.map((eachTag) => (
                    <button
                      variant="outlined"
                      key={eachTag.id}
                      className="tag-1"
                    >
                      #{eachTag}
                    </button>
                  ))}
                </div> */}
              </CardContent>
              <div className="card_fotter">
                <div className="like_comment">
                  <Button
                    size="small"
                    color="inherit"
                    startIcon={<FavoriteBorderIcon fontSize="inherit" />}
                  >
                    571 reactions
                  </Button>
                  <Button
                    size="small"
                    color="inherit"
                    startIcon={<ChatBubbleOutlineIcon fontSize="inherit" />}
                  >
                    5 comments
                  </Button>
                </div>

                <div className="btn">
                  <IconButton
                    aria-label="edit"
                    size="medium"
                    sx={{ bgcolor: grey[200] }}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`create-post/${postId}`);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <Button
                    sx={{ bgcolor: grey[400] }}
                    color="inherit"
                    size="medium"
                    onClick={handleBtnTextChange}
                  >
                    {saveBtn ? "Saved" : "Save"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Cards;

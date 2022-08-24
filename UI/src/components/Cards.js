import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getRequest, postRequest } from "../axios";
import { useAuth } from "../contextPage/Context";

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
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #272626",
  boxShadow: 24,
};
const Cards = ({
  title,
  tag,
  image,
  postId,
  isReadingList,
  handleSavePost,
}) => {
  const { currentUser } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const navigate = useNavigate();
  const openDetailPage = (item) => {
    navigate(`/details-page/${postId}`);
  };

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
                <div>
                  {tag.map((eachTag) => (
                    <button variant="outlined" key={eachTag} className="tag-1">
                      # {eachTag}
                    </button>
                  ))}
                </div>
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
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!currentUser) {
                        handleOpen();

                        return;
                      }

                      handleSavePost(postId, isReadingList);
                    }}
                  >
                    {isReadingList ? "Saved" : "Save"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
        <div className="modalContainer">
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openModal}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={openModal}>
              <Box sx={style}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: 1,
                    borderBottomColor: "grey",
                    p: 2,
                    pl: 5,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      letterSpacing: 1,
                      fontSize: 22,
                      fontWeight: "bold",
                    }}
                    color="#272626"
                  >
                    Log in to continue
                  </Typography>
                  <IconButton
                    onClick={() => setOpenModal(false)}
                    sx={{ "&:hover": { color: "blue" } }}
                  >
                    <CloseIcon fontSize="medium" color="inherit" />
                  </IconButton>
                </Box>

                <Box className="icon" sx={{ p: 5 }}>
                  <Box>
                    <img
                      src="https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png"
                      alt="blog_post"
                      width="20%"
                      sx={{ p: 2 }}
                    />
                  </Box>

                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: 17,
                      mb: 2,
                      color: grey[700],
                    }}
                  >
                    We're a place where coders share, stay up-to-date and grow
                    their careers.
                  </Typography>
                  <Button
                    onClick={() => navigate("/login")}
                    color="primary"
                    sx={{ mt: 2, width: 400, ml: "18%" }}
                    variant="contained"
                  >
                    login
                  </Button>
                  <Button
                    onClick={() => navigate("/registration")}
                    color="primary"
                    sx={{
                      mt: 2,
                      width: 400,
                      ml: "18%",
                      "&:hover": {
                        color: "blue",
                        backgroundColor: "#0000000d",
                      },
                    }}
                    variant="text"
                  >
                    create account
                  </Button>
                </Box>
              </Box>
            </Fade>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Cards;

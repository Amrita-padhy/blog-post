import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import { postRequest } from "../axios";

function DetailsPage() {
  const { postId } = useParams();
  const [anchorEl, setAnchorEl] = useState(null);
  const [post, setPost] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // to show the card details in details page we call a postRequest Api ,after getting data set the data in veriables
  const getPostDetails = async () => {
    try {
      const { data } = await postRequest("/getPost", { postId });
      console.log(data);

      setPost(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      await getPostDetails();
    })();
  }, []);

  const content = (
    <Box p={2}>
      <div>
        {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id dignissim justo.
   Nulla ut facilisis ligula. Interdum et malesuada fames ac ante ipsum primis in faucibus.
   Sed malesuada lobortis pretium.`}
      </div>
    </Box>
  );
  const Root = styled("div")(({ theme }) => ({
    width: "100%",
    ...theme.typography.body2,
    "& > :not(style) + :not(style)": {
      marginTop: theme.spacing(2),
    },
  }));
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="detailPage_main">
        <div className="aside">
          <div className="iconBtns">
            <IconButton
              color="inherit"
              size="large"
              sx={{ "&:hover": { color: "red" } }}
            >
              <FavoriteBorderIcon />
            </IconButton>
            23
          </div>

          <div className="iconBtns">
            <IconButton color="inherit">
              <BookmarkBorderIcon />
            </IconButton>
            5
          </div>

          <IconButton
            color="inherit"
            onClick={handleClick}
            size="small"
            // sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <MoreHorizIcon sx={{ width: 32, height: 32 }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem>Copy the link</MenuItem>
            <MenuItem>Share to twitter</MenuItem>
            <MenuItem>Share to linkedin</MenuItem>
            <MenuItem>Share to reddit</MenuItem>
            <MenuItem>Share to hacker news</MenuItem>
            <MenuItem>Share to facebook</MenuItem>
            <MenuItem>Report Abuse</MenuItem>
          </Menu>
        </div>
        <div className="main_section">
          <Card sx={{ maxWidth: 800, width: 625 }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="336"
              image={post?.coverImage}
              // image="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
            />
            <Box p={5}>
              <CardContent>
                <CardHeader
                  avatar={<Avatar aria-label="recipe">R</Avatar>}
                  title="Shrimp and Chorizo Paella"
                  subheader="September 14, 2016"
                />
                <Typography
                  color="text.primary"
                  gutterBottom
                  variant="h5"
                  component="div"
                  fontSize={40}
                  fontWeight={1000}
                  mt={2}
                >
                  {post?.title}
                </Typography>
                {post?.tags.map((eachTag) => (
                  <button
                    color="inherit"
                    key={eachTag.postId}
                    className="tag-1"
                  >
                    #{eachTag}
                  </button>
                ))}

                <div className="context">
                  <Typography
                    color="text.primary"
                    variant="body1"
                    mt={2}
                    fontSize={20}
                  >
                    {post?.content}
                  </Typography>
                </div>
              </CardContent>
            </Box>
          </Card>
        </div>
        <div className="persnal_info">
          <div className="info_card">
            <Card>
              <Box p={2} mb={3}>
                <CardHeader
                  avatar={<Avatar aria-label="recipe">R</Avatar>}
                  title="Shrimp and Chorizo Paella"
                />
                <CardActions>
                  <Button fullWidth variant="contained" size="small">
                    Follow
                  </Button>
                </CardActions>
                <Typography color="text.primary" ml={2}>
                  The open source Shopify alternative ⚡️
                </Typography>
              </Box>
            </Card>
          </div>
          <Box mt={2}>
            <div className="details_card">
              <Card>
                <Root>
                  {content}
                  <Divider textAlign="left"></Divider>
                  {content}
                  <Divider textAlign="left"></Divider>
                  {content}
                  <Divider textAlign="left"></Divider>
                </Root>
              </Card>
            </div>
          </Box>
        </div>
      </div>
    </>
  );
}

export default DetailsPage;

import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
// mui
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
function ReadingListPage() {
  const style = {
    width: "100%",
    maxWidth: 360,
    // bgcolor: "#faf6f6",

    height: "auto",
    margin: 1,
  };
  const pointer = { cursor: "pointer" };
  return (
    <div className="readingList_main" style={pointer}>
      <Container>
        {/* navbar */}
        <Navbar />
      </Container>
      <Container maxWidth="lg">
        <Typography
          variant="h5"
          color="black"
          sx={{ ml: 3, fontSize: 30, fontWeight: "bold", letterSpacing: 1 }}
        >
          Reading list (1)
        </Typography>
        <div className=" readingList_body">
          <div className="redingList_card">
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  R
                </Avatar>
              }
              title="Shrimp and Chorizo Paella Shrimp and Chorizo Paella"
              subheader="September 14, 2016"
            />
          </div>
        </div>
      </Container>
      <div className="adds"></div>
    </div>
  );
}

export default ReadingListPage;

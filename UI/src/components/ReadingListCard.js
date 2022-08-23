import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cards from "../components/Cards";

import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function ReadingListCard({ title, tag, postId }) {
  const navigate = useNavigate();

  return (
    <>
      <div className="ReadingListCard">
        <Container
          maxWidth="lg"
          sx={{
            backgroundColor: "#fff",
            width: 824,
            p: 2,
            display: "flex",
            alignItems: "center",
            // justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  R
                </Avatar>
              }
            />
            <Box sx={{ flexDirection: "column" }}>
              <Typography
                sx={{ "&:hover": { color: "blue" } }}
                color="#1a1818"
                gutterBottom
                variant="h5"
                component="div"
                onClick={() => {
                  navigate(`/details-page/${postId}`);
                }}
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
            </Box>
          </Box>
          {/* </Card> */}
        </Container>
      </div>
    </>
  );
}

export default ReadingListCard;

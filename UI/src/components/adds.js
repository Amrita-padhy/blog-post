import React from "react";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  "& > :not(style) + :not(style)": {
    marginTop: theme.spacing(2),
  },
}));
const Adds = () => {
  const content = (
    <div>
      {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id dignissim justo.
   Nulla ut facilisis ligula. Interdum et malesuada fames ac ante ipsum primis in faucibus.
   Sed malesuada lobortis pretium.`}
    </div>
  );
  const pointer = {
    cursor: "pointer",
  };

  return (
    <>
      <main className="adds_container" style={pointer}>
        <div className="add_header">
          <Card
            sx={{
              maxWidth: 345,
            }}
          >
            <CardMedia
              className="img_container"
              width="240"
              component="img"
              height="140"
              image="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
              // alt="green iguana"
            />
            <CardContent>
              <Typography variant="h6" className="adds_heading" component="div">
                Forem for Android is here
              </Typography>
            </CardContent>
          </Card>
        </div>
        <div className="add_contents">
          <div className="add_contents_btns">
            <Typography
              sx={{
                padding: 0.1,
              }}
              variant="h6"
              component="div"
            >
              Listings
            </Typography>
            <button className="see_all"> see all </button>
          </div>
          <Box p={2} className="add_contents_headings">
            <Root>
              {content} <Divider textAlign="left"> LEFT </Divider> {content}
              <Divider textAlign="left"> LEFT </Divider> {content}
              <Divider textAlign="left"> LEFT </Divider>
            </Root>
          </Box>
        </div>
      </main>
    </>
  );
};

export default Adds;

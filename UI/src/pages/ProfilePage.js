import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../contextPage/Context";
// import Cards from "../components/Cards";
import Cards from "../components/Cards";
// mui
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CakeIcon from "@mui/icons-material/Cake";
import GitHubIcon from "@mui/icons-material/GitHub";
// import image from "../util/image";
import {
  maxHeight,
  textAlign,
  width,
  fontWeight,
  letterSpacing,
} from "@mui/system";
// import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";

function ProfilePage() {
  const { currentUser } = useAuth();
  const pointer = { cursor: "pointer" };
  return (
    <>
      <div className="profilePage_main" style={pointer}>
        <Navbar />

        <Container maxWidth="md">
          <Card
            sx={{
              mt: 8,
              border: "GrayText",
            }}
          >
            <div className="image_container"></div>
          </Card>
        </Container>
        <Container maxWidth="md">
          <Card
            sx={{
              textAlign: "center",
              borderTop: 1,
              borderLeft: 1,
              borderRight: 1,
              borderColor: "#b6b0b0",
            }}
          >
            <CardContent sx={{ justifyContent: "flex-end" }}>
              <div className="editBtn">
                <Button color="primary" variant="contained">
                  edit
                </Button>
              </div>
            </CardContent>
          </Card>
        </Container>
        <Container maxWidth="md">
          <Card
            sx={{
              textAlign: "center",
              borderBottom: 1,
              borderLeft: 1,
              borderRight: 1,
              borderColor: "#b6b0b0",
            }}
          >
            <CardContent>
              <Typography
                sx={{ fontSize: 30, letterSpacing: 1 }}
                color="black"
                gutterBottom
                variant="subtitle2"
              >
                Amrita-padhy
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ fontSize: 17, letterSpacing: 0.2 }}
              >
                404 bio not found
              </Typography>
              <div className="profile_fotter">
                <CakeIcon fontSize="medium" color="disabled" sx={{ mr: 1 }} />
                <Typography
                  variant="subtitle2"
                  color="GrayText"
                  sx={{ fontSize: 13, letterSpacing: 0.2 }}
                >
                  Joined on May 25, 2022
                </Typography>
                <GitHubIcon sx={{ ml: 1 }} fontSize="medium" color="disabled" />
              </div>
            </CardContent>
          </Card>
        </Container>
        <Container maxWidth="md">
          <Cards />
        </Container>
      </div>

      {/* <div>
        {currentUser && <pre> {JSON.stringify(currentUser, null, 2)}</pre>}
      </div> */}
    </>
  );
}

export default ProfilePage;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getRequest, postRequest } from "../axios";
import Navbar from "../components/Navbar";
import { useAuth } from "../contextPage/Context";
import Cards from "../components/Cards";
import ProfileModal from "../components/ProfileModal";
// mui
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CakeIcon from "@mui/icons-material/Cake";
import GitHubIcon from "@mui/icons-material/GitHub";

function ProfilePage() {
  const [inputData, setInputData] = useState([]);
  const [editUserName, setEditUserName] = useState("");
  const [editBio, setEditBio] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  const navigate = useNavigate();
  // const pointer = { cursor: "pointer" };
  const { currentUser } = useAuth();
  // function
  const getUser = async () => {
    let payload = {
      uid: currentUser.uid,
    };
    const { data } = await postRequest("/getUserInfo", payload);
    setInputData(data);
  };

  // handleEditProfileInfo
  const EditProfileInfo = async () => {
    try {
      let payload = {
        uid: currentUser.uid,
        userName: editUserName,
        bio: editBio,
        displayPicture: null,
      };
      const { data } = await postRequest("/updateUserInfo", payload);

      if (data) {
        await getUser();
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className="profilePage_main">
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
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleOpen}
                >
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
                {inputData.userName}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ fontSize: 17, letterSpacing: 0.2 }}
              >
                {inputData.bio ? inputData.bio : "404"}
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
          <Cards tag={[]} />
        </Container>
      </div>
      <ProfileModal
        handleOpen={handleOpen}
        handleClose={handleClose}
        openModal={openModal}
        setOpenModal={setOpenModal}
        inputData={inputData}
        EditProfileInfo={EditProfileInfo}
        editUserName={editUserName}
        editBio={editBio}
        setEditUserName={setEditUserName}
        setEditBio={setEditBio}
      />
    </>
  );
}

export default ProfilePage;

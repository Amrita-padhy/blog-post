import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import { useAuth } from "../contextPage/Context";
import Cards from "../components/Cards";
// mui
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CakeIcon from "@mui/icons-material/Cake";
import GitHubIcon from "@mui/icons-material/GitHub";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function ProfilePage() {
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  const navigate = useNavigate();
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
      <div className="editProfile_modal">
        <div>
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
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <IconButton
                    onClick={() => setOpenModal(false)}
                    sx={{ "&:hover": { color: "blue" } }}
                  >
                    <CloseIcon fontSize="medium" color="inherit" />
                  </IconButton>
                </Box>

                <Box className="previewImageBtn" sx={{ border: "none" }}>
                  <Typography variant="h6" mb={1} color={"GrayText"}>
                    Profile Picture
                  </Typography>
                  <Card sx={{ p: 1 }}>
                    <input type="file" />
                  </Card>
                </Box>
                <Box
                  sx={{
                    width: 400,
                    maxWidth: "100%",
                    mt: 1,
                  }}
                >
                  <TextField
                    fullWidth
                    margin="dense"
                    sx={{ width: 320, mt: 1 }}
                    variant="standard"
                    placeholder="Username..."
                    inputProps={{ style: { fontSize: 19 } }} // font size of input text
                  />
                </Box>
                <Box mt={2}>
                  <TextareaAutosize
                    maxRows={4}
                    placeholder="Write your bio here..."
                    style={{
                      width: 330,
                      height: 100,
                      padding: 5,
                      backgroundColor: "#fff",
                    }}
                  />
                </Box>
                <Button
                  fullWidth
                  color="primary"
                  sx={{ mt: 2 }}
                  variant="contained"
                >
                  Save profile information
                </Button>
              </Box>
            </Fade>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;

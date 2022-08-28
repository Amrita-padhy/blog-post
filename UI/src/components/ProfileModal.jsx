import React, { useEffect, useState } from "react";
// mui
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

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
function ProfileModal({
  handleClose,
  openModal,
  setOpenModal,
  inputData,
  EditProfileInfo,
  editUserName,
  editBio,
  setEditUserName,
  setEditBio,
}) {
  return (
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
                  placeholder={inputData.userName}
                  inputProps={{ style: { fontSize: 19 } }} // font size of input text
                  name="userName"
                  label="userName"
                  value={editUserName}
                  onChange={(e) => setEditUserName(e.target.value)}
                />
              </Box>
              <Box mt={2} label="editBio">
                <TextareaAutosize
                  maxRows={4}
                  placeholder={inputData.bio}
                  style={{
                    width: 330,
                    height: 100,
                    padding: 5,
                    backgroundColor: "#fff",
                  }}
                  name="editBio"
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                />
              </Box>
              <Button
                fullWidth
                color="primary"
                sx={{ mt: 2 }}
                variant="contained"
                onClick={EditProfileInfo}
              >
                Save profile information
              </Button>
            </Box>
          </Fade>
        </Modal>
      </div>
    </div>
  );
}

export default ProfileModal;

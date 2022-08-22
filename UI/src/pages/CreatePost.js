import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fireBaseAuth, storage } from "../util/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../util/firebase";
import { collection, addDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "../contextPage/Context";
import CardContent from "@mui/material/CardContent";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Backdrop from "@mui/material/Backdrop";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import { postRequest } from "../axios";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const tagNames = [" javascript", "webdev", "beginners", "programming"];

function getStyles(name, tags, theme) {
  return {
    fontWeight:
      tags.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const CreatePost = (props) => {
  const { postId } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [uploadImage, setUploadimage] = useState(null);
  const [file, setPreviewImage] = useState();
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarErrorMsg, setSnackbarErrorMsg] = useState(false);
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  // console.log(coverImage);
  function handlePreviewImage(e) {
    console.log(e.target.files);
    setUploadimage(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  }

  useEffect(() => {
    console.log(postId ? "Please Edit" : "New Post");
    if (postId) {
      (async () => {
        const docRef = doc(db, "postList", postId);
        const docSpan = getDoc(docRef);
        if ((await docSpan).exists()) {
          // if we get data
          const postData = (await docSpan).data(); // save data in the variable
          // console.log(postData);
          setTitle(postData.title); // set post title
          setContent(postData.content); //set post content
          setTags(postData.tags);
          setPreviewImage(postData.coverImage);
          setUploadimage(postData.coverImage);
        }
      })();
    }
  }, []);
  // handleUpdate
  // const postData = (await docSpan).data();
  const handleUpdate = async () => {
    try {
      setOpenBackdrop(true);
      let item = { title, content, tags, uploadImage };
      const docRef = doc(db, "postList", postId);
      await setDoc(docRef, { ...item, updatedAt: new Date() }, { merge: true });
      setOpenBackdrop(false);
      navigate("/");
    } catch (error) {
      setOpenBackdrop(false);
    }
  };

  const handleBackdropClose = () => {
    setOpenBackdrop(false);
  };
  // handleTagChange
  const handleTagChange = (event) => {
    const {
      target: { value },
    } = event;
    setTags(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  // handleInputChange
  const handleInputChange = (e) => {
    if (e.target.id === "title_input") {
      setTitle(e.target.value);
    }
    if (e.target.id === "content_input") {
      setContent(e.target.value);
    }
    if (e.target.id === "tag_id") {
      setTags(e.target.value);
    }
  };
  // handlepublish
  const handlePublish = async (e) => {
    try {
      e.preventDefault();
      if (!title || !content) {
        setSnackbarOpen(true);
        return;
      }
      // open loading
      setOpenBackdrop(true);
      const payload = {
        content,
        title,
        tags,
        uid: currentUser?.uid,
        coverImage: await uplodeImage(),
      };
      await postRequest("/savePost", payload);
      setOpenBackdrop(false);
      navigate("/");
    } catch (error) {
      // close loading
      setOpenBackdrop(false);
    }
  };

  // uplodeImage
  const uplodeImage = async () => {
    try {
      if (uploadImage == null) return null;
      const imageRef = ref(
        storage,
        `images/${fireBaseAuth.currentUser.uid}/${uploadImage.name}`
      );
      const uploadRef = await uploadBytes(imageRef, uploadImage);
      const url = await getDownloadURL(uploadRef.ref);
      return url;
    } catch (error) {
      setOpenBackdrop(false);
    }
  };

  // removeoverImage
  const removePreviedImage = (e) => {
    setPreviewImage("");
    if (postId && uploadImage) {
      setUploadimage(null);
    }
  };

  // snakbar
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="error" size="small" onClick={handleClose}>
        Please fill all the inputs.
      </Button>
      <IconButton size="small" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  const pointer = { cursor: "pointer" };

  return (
    <>
      {/* loader */}
      <div className="backDrop">
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={openBackdrop}
          onClick={handleBackdropClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
      {/* snackbar */}
      <div>
        <Snackbar
          // sx={{ background: "#fff" }}
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleClose}
          message={snackbarErrorMsg}
          action={action}
          anchorOrigin={{ vertical, horizontal }}
          key={vertical + horizontal}
        />
      </div>
      <div className="create_post_main">
        <Container maxWidth="lg" sx={{ display: "flex", mt: 1, p: 1 }}>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src="https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png"
              alt="blog_post"
              width={50}
              onClick={() => navigate("/")}
            />
            <Typography variant="h6" ml={2}>
              Create Post
            </Typography>
          </Box>
          <Box>
            <IconButton>
              <CloseIcon
                color="action"
                onClick={() => navigate("/")}
                sx={{ "&:hover": { color: "blue" } }}
              />
            </IconButton>
          </Box>
        </Container>

        <div className="main_card" style={pointer}>
          <CardContent
            sx={{
              p: "4",
            }}
          >
            <div className="previed_main">
              {file && !postId ? (
                <div className="previewedImage_container">
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <img src={file} width={150} height={100} />
                    <Box sx={{ ml: 3 }}>
                      <label className="uplodeImageLevel">
                        <input
                          type="file"
                          onChange={handlePreviewImage}
                          hidden
                        />
                        change
                      </label>
                    </Box>

                    <Button
                      variant="contained"
                      sx={{ ml: 3 }}
                      onClick={removePreviedImage}
                    >
                      remove
                    </Button>
                  </Box>
                </div>
              ) : (
                <div className="previewImageBtn">
                  <label className="uplodeImageLevel" onClick={uplodeImage}>
                    Add a cover image
                    <input type="file" onChange={handlePreviewImage} hidden />
                  </label>
                </div>
              )}
            </div>
            <Box
              sx={{
                width: 400,
                maxWidth: "100%",
              }}
            >
              <TextField
                fullWidth
                margin="dense"
                sx={{ width: 630, mt: 1 }}
                variant="standard"
                placeholder="New post title here..."
                inputProps={{ style: { fontSize: 40 } }} // font size of input text
                id="title_input"
                value={title}
                onChange={handleInputChange}
              />
            </Box>
            <div>
              <FormControl variant="outlined" sx={{ width: 400, mt: 1 }}>
                <Select
                  multiple
                  displayEmpty
                  margin="dense"
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  value={tags}
                  onChange={handleTagChange}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <em>Add upto 4 tags</em>;
                    }

                    return selected.join(", ");
                  }}
                  MenuProps={MenuProps}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem disabled value="">
                    <em>Add upto 4 tags</em>
                  </MenuItem>
                  {tagNames.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, tags, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <Box mt={5}>
              <TextareaAutosize
                maxRows={6}
                placeholder="Write your post content here..."
                style={{
                  width: 630,
                  height: 100,
                  padding: 5,
                  // marginTop: 20,
                  backgroundColor: "#e4e1e1",
                }}
                id="content_input"
                value={content}
                onChange={handleInputChange}
              />
            </Box>
            <Box mt={5}>
              {postId ? (
                <Button variant="contained" onClick={handleUpdate}>
                  update
                </Button>
              ) : (
                <Button variant="contained" sx={{}} onClick={handlePublish}>
                  Publish
                </Button>
              )}
            </Box>
          </CardContent>
        </div>
        <div className="fotter_btns"></div>
      </div>
    </>
  );
};
export default CreatePost;

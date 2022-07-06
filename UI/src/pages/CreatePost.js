import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { db } from "../util/firebase";
import {
  collection,
  onSnapshot,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { useAuth } from "../contextPage/Context";
import AppBar from "@mui/material/AppBar";

// import  StandardInput from "@mui/material/OutlinedInput";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Input from "@mui/material/Input";
import { useTheme } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextareaAutosize from "@mui/material/TextareaAutosize";

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
const CreatePost = () => {
  const theme = useTheme();
  const { currentUser } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  // handleChange
  const handleChange = (event) => {
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

  const handlePublish = async (e) => {
    e.preventDefault();
    const payload = {
      content,
      title,
      createdAt: new Date(),
      isPublished: true,
      tags,
      uid: currentUser?.uid,
      coverImage: "some link",
    };
    console.log(payload);
    const res = await addDoc(collection(db, "postList"), payload);
    console.log(res);
    setTitle("");
    setContent("");
    setTags([]);
  };

  return (
    <>
      {/* navbar section */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="transparent">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Blog Post
            </Typography>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <Link to="/home">
                <CloseIcon />
              </Link>
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>

      <div className="create_Post_Body">
        <div className="header">
          <Button variant="outlined" color="primary">
            add a cover image
          </Button>
          <Input
            className="title_input"
            fullWidth
            placeholder="New post title here"
            type="text"
            id="title_input"
            value={title}
            onChange={handleInputChange}
          />
          {/*  */}
          <div>
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel
                variant="standard"
                id="tag_id"
                value={tags}
                onChange={handleInputChange}
              >
                add tags
              </InputLabel>

              <Select
                multiple
                value={tags}
                onChange={handleChange}
                MenuProps={MenuProps}
              >
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
        </div>

        <div className="fotter">
          <TextareaAutosize
            fullWidth
            aria-label=""
            minRows={3}
            placeholder="Write your post content here..."
            style={{ width: 612, height: 200, border: null }}
            type="text"
            id="content_input"
            value={content}
            onChange={handleInputChange}
          />
        </div>
      </div>
      {/* fotter button sec */}
      <div className="fotter_btns">
        <Button variant="outlined" color="primary" onClick={handlePublish}>
          publish
          {/* <Link to="/">publish</Link> */}
        </Button>
        <Button variant="outlined" color="primary">
          save draft
        </Button>
      </div>
    </>
  );
};
export default CreatePost;

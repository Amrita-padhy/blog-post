import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Input from "@mui/material/Input";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
// import  StandardInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { height } from "@mui/system";

const ariaLabel = { "aria-label": "description" };

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

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];
function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
const CreatePost = () => {
  const theme = useTheme();
  const [personName, setPersonName] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <>
      {/* create post */}

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
            inputProps={ariaLabel}
          />
          {/*  */}
          <div>
          <FormControl sx={{ m: 1, width: 300 }}>
          
        {/* <InputLabel variant="standard" id="demo-multiple-name-label">add upto 4 tags</InputLabel> */}


        
        <Select
        
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={personName}
          onChange={handleChange}
          
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
          </div>
        </div>
        <div className="createPost_btns">

        </div>
        <div className="fotter">
        
        <TextareaAutosize
        fullWidth
      aria-label=""
      minRows={3}
      placeholder="Write your post content here..."
      style={{ width: 612 ,height:200,border:null }}
    />
        </div>
      </div>
      {/* fotter button sec */}
      <div className="fotter_btns">
      <Button variant="outlined" color="primary">
            publish
          </Button>
          <Button variant="outlined" color="primary">
            save draft
          </Button>
           </div>
    </>
  );
};
export default CreatePost;

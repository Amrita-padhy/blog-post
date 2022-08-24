import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contextPage/Context";

//
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import PodcastsIcon from "@mui/icons-material/Podcasts";
import TagIcon from "@mui/icons-material/Tag";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import InfoIcon from "@mui/icons-material/Info";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import Badge from "@mui/material/Badge";
import Divider from "@mui/material/Divider";
import { Hidden } from "@mui/material";

const Sidebar = () => {
  const { currentUser } = useAuth();
  // function

  const checkAuth = () => {
    if (currentUser) {
      navigate("/reading-list");
    } else {
    }
  };

  const style = {
    width: "100%",
    maxWidth: 360,
    bgcolor: "#faf6f6",
    height: "auto",
  };
  const pointer = { cursor: "pointer" };
  const navigate = useNavigate();

  const handleNavigation = () => {
    if (currentUser) {
      navigate("/reading-list");
      return;
    }
  };

  return (
    <>
      <div className="side_bar" style={pointer}>
        <List sx={style} component="div" aria-label="mailbox folders">
          <ListItem button>
            <a href="/" className="sidebar_link">
              <span>
                <HomeIcon />
              </span>
              Home
            </a>
          </ListItem>

          {currentUser && (
            <ListItem button>
              <a onClick={handleNavigation} className="sidebar_link">
                <span>
                  <AutoStoriesIcon />
                </span>
                Reading List
              </a>
            </ListItem>
          )}

          <ListItem button>
            <a href="goggle.com" className="sidebar_link">
              <span>
                <NoteAddIcon />
              </span>
              Listings
            </a>
          </ListItem>
          <ListItem button>
            <a href="goggle.com" className="sidebar_link">
              <span>
                <PodcastsIcon />
              </span>
              Podcasts
            </a>
          </ListItem>
          <ListItem button>
            <a href="goggle.com" className="sidebar_link">
              <span>
                <VideoCameraFrontIcon />
              </span>
              Videos
            </a>
          </ListItem>
          <ListItem button>
            <a href="goggle.com" className="sidebar_link">
              <span>
                <TagIcon />
              </span>
              Tags
            </a>
          </ListItem>
          <ListItem button>
            <a href="goggle.com" className="sidebar_link">
              <span>
                <InfoIcon />
              </span>
              About
            </a>
          </ListItem>
          <ListItem button>
            <a href="goggle.com" className="sidebar_link">
              <span>
                <ContactSupportIcon />
              </span>
              Contact
            </a>
          </ListItem>
        </List>
      </div>
    </>
  );
};
export default Sidebar;

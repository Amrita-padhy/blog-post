import React from "react";
//
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from '@mui/icons-material/Home';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import Badge from '@mui/material/Badge';
import { Box } from "@mui/material";

const Sidebar = () => {
  return (
    <Box className="sidebar_container" sx={{ width: '100%',
     maxWidth: 
    220, 
    height:20,
     bgcolor: 'background.paper'
    }}>
        
    <List >
      <ListItem  className="sideBar_content">
        <ListItemButton>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home"color="" />
        </ListItemButton>
      </ListItem>
      {/*  */}
      <ListItem className="sideBar_content">
        <ListItemButton>
          <ListItemIcon>
            <AutoStoriesIcon />
            <Badge badgeContent={8} color="error">
              
            </Badge>
          </ListItemIcon>
          <ListItemText primary="Reading List" />
        </ListItemButton>
      </ListItem>
    </List>
    </Box>
  );
};
export default Sidebar;

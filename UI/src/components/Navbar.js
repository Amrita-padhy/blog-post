import React, { useState } from "react";
import { useAuth } from "../contextPage/Context";
import { Link, useNavigate } from "react-router-dom";

// mui icons
import { styled, alpha } from "@mui/material/styles";
import Container from "@mui/material/Container";
import PropTypes from "prop-types";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { createTheme, ThemeProvider } from "@mui/material";
import Avatar from "@mui/material/Avatar";

const Navbar = (props) => {
  const customTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
        contrastText: "#000 ",
      },
    },
  });
  const navigate = useNavigate();
  const { logout, currentUser } = useAuth();
  // sign out
  const signOut = async (e) => {
    e.preventDefault();
    await logout();
    if (logout) {
      navigate("/login");
    }
  };
  // navigateToProfile
  const navigateToProfile = () => {
    navigate("/profile-page");
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    // width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "theme.palette.secondary.light",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",

    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));
  function ElevationScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
      target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
  }
  ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
  };
  const commonStyles = {
    bgcolor: "background.paper",
    m: 1,
    border: 1,
  };
  const pointer = { cursor: "pointer" };
  return (
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={customTheme}>
        <ElevationScroll {...props}>
          <AppBar color={"primary"}>
            <Container maxWidth="lg" fixed>
              <Toolbar>
                <img
                  src="https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png"
                  alt="blog_post"
                  width={50}
                  onClick={() => navigate("/")}
                  style={pointer}
                />

                <Search
                  sx={{ ...commonStyles, borderColor: "grey.500", width: 500 }}
                >
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                  />
                </Search>
                <Box sx={{ flexGrow: 1 }} />

                <Box sx={{ display: { xs: "none", md: "flex" } }}>
                  <Button
                    color="inherit"
                    variant="contained"
                    onClick={() => navigate("/create-post")}
                  >
                    Create Post
                  </Button>
                  {currentUser && (
                    <IconButton
                      size="large"
                      aria-label="show 17 new notifications"
                      color="inherit"
                    >
                      <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                      </Badge>
                    </IconButton>
                  )}
                  {currentUser && (
                    <IconButton
                      onClick={handleClick}
                      size="small"
                      sx={{ ml: 2 }}
                      aria-controls={open ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                    >
                      <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                    </IconButton>
                  )}
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem onClick={navigateToProfile}>Profile</MenuItem>
                    <MenuItem>My account</MenuItem>
                    <MenuItem onClick={signOut}>Logout</MenuItem>
                  </Menu>
                </Box>
              </Toolbar>
            </Container>
          </AppBar>
        </ElevationScroll>
      </ThemeProvider>

      <Toolbar />
    </React.Fragment>
  );
};
export default Navbar;

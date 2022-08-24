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
import { createTheme, OutlinedInput, ThemeProvider } from "@mui/material";
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
    console.log("test");
    await logout();
    navigate("/login");
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
                  {currentUser ? (
                    <Box>
                      <Button
                        color="inherit"
                        variant="contained"
                        onClick={() => navigate("/create-post")}
                      >
                        Create Post
                      </Button>
                      <IconButton
                        size="large"
                        aria-label="show 17 new notifications"
                        color="inherit"
                        onClick={signOut}
                      >
                        <Badge badgeContent={17} color="error">
                          <NotificationsIcon />
                        </Badge>
                      </IconButton>
                      <IconButton
                        size="small"
                        sx={{ ml: 2 }}
                        onClick={() => navigate("/profile-page")}
                      >
                        <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                      </IconButton>
                    </Box>
                  ) : (
                    <Box>
                      <Button
                        color="inherit"
                        variant="text"
                        onClick={() => navigate("/login")}
                        sx={{
                          mr: 1,
                          letterSpacing: 0.8,
                          "&:hover": {
                            color: "blue",
                            textDecoration: "underline",
                          },
                        }}
                      >
                        login
                      </Button>
                      <Button
                        color="inherit"
                        variant="outlined"
                        onClick={() => navigate("/registration")}
                        sx={{
                          color: "blue",
                          letterSpacing: 0.8,
                          fontSize: 13,
                          p: 1,
                        }}
                      >
                        Create Account
                      </Button>
                    </Box>
                  )}
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

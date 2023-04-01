import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import {styled} from "@mui/material";
import CustomButton from "./CustomButton";

const Header = () => {
  const NavLink = styled(Typography)(({ theme }) => ({
    fontSize: "18px",
    color: "#4F5361",
    fontWeight: "semiBold",
    cursor: "pointer",
    "&:hover": {
      color: "#000",
    },
  }));

  const NavbarLinksBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  const NavbarContainer = styled(Container)(({ theme }) => ({
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 999,
    background: "hsla(0,0%,100%,.95)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(2),
    },
    width: "100%",
    paddingLeft: 0,
    paddingRight: 0,
  }));

  const NavbarLogo = styled("img")(({ theme }) => ({
    cursor: "pointer",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  return (
    <NavbarContainer>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "2.5rem",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* <NavbarLogo src={} alt="logo" /> */}
          Good People
        </Box>

        <NavbarLinksBox>
          <NavLink variant="body2">Home</NavLink>
          <NavLink variant="body2">Features</NavLink>
          <NavLink variant="body2">Services</NavLink>
          <NavLink variant="body2">Listed</NavLink>
          <NavLink variant="body2">Contact</NavLink>
        </NavbarLinksBox>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <NavLink variant="body2">Sign Up</NavLink>
        <CustomButton
          backgroundColor="#0F1B4C"
          color="#fff"
          buttonText="Register"
        />
      </Box>
    </NavbarContainer>
  );
};

export default Header;

import { Box, styled, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import NotFoundImg from "../images/hero_illustration.svg";
import CustomButton from "../components/CustomButton";

const NotFound = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "",
    gap: theme.spacing(5),
    marginTop: theme.spacing(15),
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
  }));

  const Title = styled(Typography)(({ theme }) => ({
    fontSize: "42px",
    color: "#000336",
    fontWeight: "bold",
    margin: theme.spacing(4, 0, 4, 0),
    [theme.breakpoints.down("sm")]: {
      fontSize: "40px",
    },
  }));

  return (
    <Box sx={{ backgroundColor: "", minHeight: "80vh" }}>
      <Container>
        <CustomBox>
        <Box sx={{ flex: "1.25" }}>
            <img
              src={NotFoundImg}
              alt="heroImg"
              style={{ maxWidth: "100%", marginBottom: "2rem" }}
            />
          </Box>
          <Box sx={{ flex: "1" }}>
            <Title variant="h1">
            404 - Page Not Found
            </Title>
            <Typography
              variant="body2"
              sx={{ fontSize: "18px", color: "#5A6473", my: 4 }}
            >
              Sorry, the page you are looking for could not be found.
            </Typography>
            <CustomButton
              backgroundColor="#0F1B4C"
              color="#fff"
              buttonText="Go Back To Home"
              heroBtn={true}
              size="small"
            />
          </Box>
        </CustomBox>
      </Container>
    </Box>
  );
};

export default NotFound;

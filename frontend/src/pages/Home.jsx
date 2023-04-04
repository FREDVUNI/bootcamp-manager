import React, { useContext } from "react";
import { Box, Container } from "@mui/system";
import { CircularProgress, Grid } from "@mui/material";
import BootcampCard from "../components/BootcampCard";
import { bootcampContext } from "../context";
import Hero from "../components/Hero";
import FilterComponent from "../components/FilterComponent";

const Home = () => {
  const { bootcamps, loading } = useContext(bootcampContext);

  console.log(bootcamps);
  return (
    <>
      <Hero />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "2.5rem",
        }}
      >
        <Container sx={{ marginTop: "20px" }}>
          <FilterComponent />
          <Grid container spacing={2}>
            {loading ? (
              <div>
                <CircularProgress
                  size="3rem"
                  thickness={5}
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                />
              </div>
            ) : bootcamps.length > 0 ? (
              bootcamps.map((bootcamp) => (
                <Grid item key={bootcamp._id} xs={12} sm={6} md={4} lg={3}>
                  <BootcampCard bootcamp={bootcamp} />
                </Grid>
              ))
            ) : (
              <p
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "18px",
                }}
              >
                There are bootcamps
              </p>
            )}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Home;

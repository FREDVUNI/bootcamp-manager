import React, { useState, useEffect } from "react";
import { Box,Container } from "@mui/system";
import axios from "axios";
import { CircularProgress, Grid } from "@mui/material";
import BootcampCard from "../components/BootcampCard";

const Home = () => {
  const [bootcamps, setBootcamps] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getBootcamps = async () => {
      setLoading(true);
      let cancel;
      try {
        let res = await axios({
          mode: "cors",
          method: "GET",
          url: `http://localhost:4001/bootcamps/api/v1`,
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        });
        setBootcamps(res.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    getBootcamps();
  }, []);
  console.log(bootcamps);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "2.5rem",
      }}
    >
      <Container sx={{ marginTop:'20px' }}>
        <Grid container spacing={2}>
          { 
            loading ? (
            <div sx={{
                width:'100%',
                display:'flex',
                justifyContent:'center',
                alignItems:'center'
            }}>
              <CircularProgress size="3rem"  thickness={5}/>
            </div>
            ):(
              bootcamps.length > 0 ? (
              bootcamps.map((bootcamp) =>(
               <Grid item key={bootcamp._id} xs={12} sm={6} md={4} lg={3}>
                <BootcampCard bootcamp={bootcamp}/>
               </Grid>
              ))
              ):(
                <p sx={{
                  width:'100%',
                  display:'flex',
                  justifyContent:'center',
                  alignItems:'center',
                  fontSize:'18px'
                }}>
                  There are bootcamps
                </p>
              )
            )
          }
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;

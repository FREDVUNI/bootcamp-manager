import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import axios from "axios";

const Home = () => {
  const [bootcamps, setBootcamps] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getBootcamps = async () => {
      setLoading(true);
      let cancel;
      try {
        let { res } = await axios({
          mode: "cors",
          method: "GET",
          url: `http://localhost:4001/bootcamps/api/v1`,
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        });
        setBootcamps(res.data);
        console.log(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    getBootcamps();
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "2.5rem",
      }}
    >
      {/* { loading &&
        bootcamps.length > 0 ?
        bootcamps.map((item) =>(
          <h1>{item.name}</h1>
        ))
        :"bye"
      } */}
      Home
    </Box>
  );
};

export default Home;

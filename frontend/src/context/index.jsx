import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const bootcampContext = createContext();
export const BootcampContext = ({ children }) => {
  const [bootcamps, setBootcamps] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBootcamps = async () => {
      setLoading(true);
      try {
        let cancel;
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

    fetchBootcamps();
  }, []);

  return (
    <bootcampContext.Provider value={{ bootcamps, setBootcamps }}>
      {children}
    </bootcampContext.Provider>
  );
};

export default BootcampContext;

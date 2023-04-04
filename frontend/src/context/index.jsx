import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const bootcampContext = createContext();
export const BootcampProvider = ({ children }) => {
  const [bootcamps, setBootcamps] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const formatter = new Intl.NumberFormat("en-us",{
    style:"currency",
    currency:"USD",
    maximumFractionDigits:2
  })

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
    <bootcampContext.Provider value={{ bootcamps, setBootcamps, loading,formatter }}>
      {children}
    </bootcampContext.Provider>
  );
};

export default BootcampProvider;

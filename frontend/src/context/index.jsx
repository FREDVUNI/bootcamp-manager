import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const bootcampContext = createContext();
export const BootcampProvider = ({ children }) => {
  const [bootcamps, setBootcamps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sliderMax, setSliderMax] = useState(1000);
  const [priceRange, setPriceRange] = useState([25,75]);

  const formatter = new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchBootcamps = async () => {
      setLoading(true);
      try {
        let cancel;
        let res = await axios({
          mode: "cors",
          method: "GET",
          url: `${BASE_URL}`,
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
    <bootcampContext.Provider
      value={{
        bootcamps,
        setBootcamps,
        loading,
        formatter,
        sliderMax,
        setSliderMax,
        priceRange,
        setPriceRange
      }}
    >
      {children}
    </bootcampContext.Provider>
  );
};

export default BootcampProvider;

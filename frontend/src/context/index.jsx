import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export const bootcampContext = createContext();
export const BootcampProvider = ({ children }) => {
  const [bootcamps, setBootcamps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sliderMax, setSliderMax] = useState(1000);
  const [priceRange, setPriceRange] = useState([25,75]);
  const [filter, setFilter] = useState('');

  const location = useLocation()
  let params = location.search ? location.search : ''

  const formatter = new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchBootcamps = async () => {
      setLoading(true);

      let query;

      if(!filter && params){
        query = params
      }else{
        query = filter
      }

      try {
        let cancel;
        let res = await axios({
          mode: "cors",
          method: "GET",
          url: `${BASE_URL}/${query}`,
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        });

        setBootcamps(res.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }

      return () => cancel()
    };

    fetchBootcamps();
  }, [filter,params]);

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
        setPriceRange,
        filter,
        setFilter,
        params
      }}
    >
      {children}
    </bootcampContext.Provider>
  );
};

export default BootcampProvider;

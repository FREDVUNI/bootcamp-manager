import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

export const bootcampContext = createContext();
export const BootcampProvider = ({ children }) => {
  const [bootcamps, setBootcamps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sliderMax, setSliderMax] = useState(2000);
  const [priceRange, setPriceRange] = useState([25, 75]);
  const [filter, setFilter] = useState("");
  const [priceOrder, setPriceOrder] = useState("descending");
  const [sorting, setSorting] = useState("");

  const location = useLocation();
  let params = location.search ? location.search : "";

  const formatter = new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  });

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const updateValues = (ui_values) => {
    setSliderMax(ui_values.max_price);

    if (ui_values.filtering.price) {
      let filterPrice = ui_values.filtering.price;

      setPriceRange([Number(filterPrice.gte), Number(filterPrice.lte)]);
    }

    if (ui_values.sorting.price) {
      let sortPrice = ui_values.sorting.price;
      setPriceOrder(sortPrice);
    }
  };

  useEffect(() => {
    const fetchBootcamps = async () => {
      setLoading(true);

      let query;

      if (!filter && params) {
        query = params;
      } else {
        query = filter;
      }

      if (sorting) {
        if (query.length === 0) {
          query = `?sort=${sorting}`;
        } else {
          query = query + "&sort=" + sorting;
        }
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
        updateValues(res.data.ui_values);
      } catch (error) {
        if (axios.isCancel(error)) return;
        console.log(error.message);
      }

      return () => cancel();
    };

    fetchBootcamps();
  }, [filter, params, sorting]);

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
        params,
        priceOrder,
        setPriceOrder,
        sorting,
        setSorting,
      }}
    >
      {children}
    </bootcampContext.Provider>
  );
};

export default BootcampProvider;

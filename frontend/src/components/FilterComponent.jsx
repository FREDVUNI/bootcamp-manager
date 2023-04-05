import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { bootcampContext } from "../context";
import { useNavigate } from "react-router-dom";

const FilterComponent = () => {
  const {
    loading,
    sliderMax,
    setSliderMax,
    priceRange,
    setPriceRange,
    filter,
    setFilter,
    priceOrder,
    setPriceOrder,
    setSorting,
    sorting,
  } = useContext(bootcampContext);

  const navigate = useNavigate();

  const handleChange = (e, type) => {
    let newRange;

    if (type === "lower") {
      newRange = [...priceRange];
      newRange[0] = Number(e.target.value);

      setPriceRange(newRange);
    }

    if (type === "upper") {
      newRange = [...priceRange];
      newRange[1] = Number(e.target.value);

      setPriceRange(newRange);
    }
  };

  const handleBlur = () => {
    changeFilter(priceRange);
  };

  const commitChangeHandler = (e, newValue) => {
    changeFilter(newValue);
  };

  const changeFilter = (newValue) => {
    const urlFilter = `?price[gte]=${newValue[0]}&price[lte]=${newValue[1]}`;
    setFilter(urlFilter);
    navigate(urlFilter, { replace: true });
  };

  const handleSortChange = (e) => {
    setPriceOrder(e.target.value);

    if (e.target.value === "ascending") {
      setSorting("price");
    } else if (e.target.value === "descending") {
      setSorting("-price");
    }
  };

  const clearFilterSort = (e) =>{
    e.preventDefault()
    setFilter("")
    setSorting("")
    setPriceRange([0,sliderMax])
    navigate('/',{replace:true})
  }

  return (
    <Paper
      sx={{
        marginTop: "20px",
        marginBottom: "70px",
        padding: "30px",
        borderRadius: "0px",
      }}
    >
      <Grid container spacing={15}>
        <Grid item xs={12} sm={6} sx={{ marginBottom: "1rem" }}>
          <Typography gutterBottom>Filters</Typography>
          <div sx={{ padding: "0 1.5rem" }}>
            <Slider
              min={0}
              max={sliderMax}
              value={priceRange}
              valueLabelDisplay="auto"
              disabled={loading}
              onChange={(e, newValue) => setPriceRange(newValue)}
              onChangeCommitted={commitChangeHandler}
            />
            <div sx={{ display: "flex", justifyContent: "space-between" }}>
              <TextField
                size="small"
                id="lower"
                label="min price"
                variant="outlined"
                type="number"
                disabled={loading}
                value={priceRange[0]}
                onChange={(e) => handleChange(e, "lower")}
                onBlur={handleBlur}
              />
              <TextField
                size="small"
                id="upper"
                label="max price"
                variant="outlined"
                type="number"
                disabled={loading}
                value={priceRange[1]}
                onChange={(e) => handleChange(e, "upper")}
                onBlur={handleBlur}
              />
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography gutterBottom>Sort By</Typography>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="price-order"
              name="price-order"
              value={priceOrder}
              onChange={handleSortChange}
            >
              <FormControlLabel
                disabled={loading}
                control={<Radio />}
                label="Price: Highest to Lowest"
                value="descending"
              />
              <FormControlLabel
                disabled={loading}
                control={<Radio />}
                label="Price: Lowest to Highest"
                value="ascending"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
      <Button size="small" onClick={clearFilterSort}>clear all</Button>
    </Paper>
  );
};

export default FilterComponent;

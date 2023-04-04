import {
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

const FilterComponent = () => {
  const { loading, sliderMax, setSliderMax, priceRange, setPriceRange } =
    useContext(bootcampContext);

  return (
    <Paper
      sx={{
        marginTop: "20px",
        marginBottom: "70px",
        padding: "30px",
        borderRadius: "0px",
      }}
    >
      <Grid container>
        <Grid item xs={12} sm={6} sx={{ marginBottom: "1rem" }}>
          <Typography gutterBottom>Filters</Typography>
          <div sx={{ padding: "0 1.5rem 2rem 5rem" }}>
            <Slider
              min={0}
              max={sliderMax}
              value={priceRange}
              valueLabelDisplay="auto"
              onChange={(e, newValue) => setPriceRange(newValue)}
            />
            <div sx={{ display: "flex", justifyContent: "space-between" }}>
              <TextField
                size="small"
                id="lower"
                label="min price"
                variant="outlined"
                type="number"
                disabled={loading}
                value={0}
              />
              <TextField
                size="small"
                id="upper"
                label="max price"
                variant="outlined"
                type="number"
                disabled={loading}
                value={75}
              />
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography gutterBottom>Sort By</Typography>
          <FormControl component="fieldset">
            <RadioGroup aria-label="price-order" name="price-order">
              <FormControlLabel
                disabled={loading}
                control={<Radio />}
                label="Price: Highest to Lowest"
              />
              <FormControlLabel
                disabled={loading}
                control={<Radio />}
                label="Price: Lowest to Highest"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FilterComponent;

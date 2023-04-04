import {
  Avatar,
  Card,
  CardHeader,
  Typography,
  CardContent,
  Rating,
  CardActions,
  Button,
} from "@mui/material";
import React,{ useContext } from "react";
import { bootcampContext } from "../context";

const BootcampCard = ({ bootcamp }) => {
  const { formatter } = useContext(bootcampContext)
  return (
    <Card>
      <CardHeader avatar={<Avatar />} title={<Typography></Typography>} />
      <CardContent>
        <Typography variant="caption">{bootcamp.description}</Typography>
        <Typography variant="h6" gutterBottom>
          {formatter.format(bootcamp.price)}
        </Typography>
        <Rating
          value={bootcamp.rating}
          readOnly
          name={bootcamp.name}
          size="small"
          position={0.5}
        />
        <CardActions>
          <Button
            variant="contained"
            size="small"
            sx={{ background: "#0F1B4C", color: "#fff", borderRadius: "0px" }}
          >
            Book Now
          </Button>
          <Button size="small" color="primary">
            Learn more
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default BootcampCard;

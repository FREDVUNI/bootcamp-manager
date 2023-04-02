import React from "react";
import NotFoundSvg  from "../images/hero_illustration.svg";

const NotFound = () => {
  return (
    <div
      sx={{
        flexDirection: "flex flex-col",
        JustifyContent: "justify-center",
        alignItems: "items-center",
        height: "h-screen",
      }}
    >
      <img
        src={NotFoundSvg}
        alt="not-found"
        sx={{
          height: "48px",
          width: "48px",
          color: "gray",
          marginBotom: "8px",
        }}
      />
      <h1
        sx={{
          size: "10px",
          fontWeight: "bold",
          color: "gray",
          marginBottom: "4px",
        }}
      >
        404 - Page Not Found
      </h1>

      <p
        sx={{
          size: "10px",
          color: "gray",
          marginBottom: "8px",
        }}
      >
        Sorry, the page you are looking for could not be found.
      </p>
    </div>
  );
};

export default NotFound;

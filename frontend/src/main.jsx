import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BootcampProvider } from "./context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BootcampProvider value={{ bootcamps,setBootcamps,loading }}>
      <App />
    </BootcampProvider>
  </React.StrictMode>
);

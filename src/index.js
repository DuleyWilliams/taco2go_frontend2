import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Taco2Go } from "./components/Taco2Go";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Taco2Go />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
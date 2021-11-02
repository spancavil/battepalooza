import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { initAmplitude } from "./Utils/amplitude";

initAmplitude();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

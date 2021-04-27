import React from "react";
import ReactDOM from "react-dom";
import Application from "./components/Application";
import ApplicationApi from "./ApplicationApi";

ReactDOM.render(<Application api={ApplicationApi} />, document.getElementById("root"));

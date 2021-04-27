import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h2>NOT FOUND: 404</h2>
      <h3>THE PAGE YOU REQUESTED IS NOT AVAILABLE</h3>
      <Link to="/">GO TO HOME PAGE</Link>
    </div>
  );
};

export default NotFound;

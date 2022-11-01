import React from "react";
import Nav from "../nav/Nav";

const PageNotFound = () => {
  return (
    <div>
      <Nav />
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="text-center">
          <h1 className="display-1 fw-bold">404</h1>
          <p className="fs-3">
            {" "}
            <span className="text-danger">Opps!</span> Page not found.
          </p>
          <p className="lead">
            The page you’re looking for doesn’t exist or you need to be logged
            in to see it.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;

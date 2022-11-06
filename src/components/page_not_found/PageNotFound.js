import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div>
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="text-center">
          <h1 className="display-1 fw-bold" data-testid="error-code">
            404
          </h1>
          <p className="fs-3">
            {" "}
            <span className="text-danger">Ooops!</span> Page not found.
          </p>
          <p className="lead">
            The page you’re looking for doesn’t exist or you need to be logged
            in to see it.
          </p>
          <div class="table-responsive">
            <table class="table">
              <tbody>
                <tr>
                  <td>
                    <Link to={`/`}>Click here to go to the homepage</Link>{" "}
                  </td>
                  <td>
                    <Link to={`/auth`}>Click here to go to the login page</Link>{" "}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;

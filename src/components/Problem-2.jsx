import React from "react";
import { Link } from "react-router-dom";

const Problem2 = () => {
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <Link
            to="/modalA"
            className="btn btn-lg"
            type="button"
            style={{
              backgroundColor: "#46139f",
              borderColor: "#46139f",
              fontSize: "20px",

              color: "#fff",
            }}
          >
            All Contacts
          </Link>
          <Link
            to="/modalB"
            className="btn btn-lg"
            type="button"
            style={{
              backgroundColor: "#ff7150",
              borderColor: "#ff7150",
              color: "#fff",
              fontSize: "20px",
            }}
          >
            US Contacts
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Problem2;

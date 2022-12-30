import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navContainer">
      <nav className="navbar navbar-expand-lg bg-light" >
        <div className="container-fluid mt-2">
          <Link className="navbar-brand mx-3" to={"/"}>
            Codeforces Visualizer
          </Link>
          
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item ">
                <Link className="nav-link active mx-3" aria-current="page" to={"/"}>
                  HOME
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active mx-3" aria-current="page" to={"/compare"}>
                  COMPARE
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active mx-3" aria-current="page" to={"/ratingChange"}>
                  VIRTUAL RATING CHANGE
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active mx-3" aria-current="page" to={"/something"}>
                  SAY SOMETHING?
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <hr />
      </nav>
      
    </div>
  );
}

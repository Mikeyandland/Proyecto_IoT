import React from "react";
import logo from "../assets/logo.png";
import "../styles/Header.css";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
  return (
    <header>
      <div className="w-100 bg-dark py-3">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-3 col-md-4 col-sm-6 mb-3 mb-sm-0 d-flex align-items-center">
              <a href="/" className="d-flex align-items-center">
                <img
                  src={logo}
                  alt="Logo Smart House"
                  className="img-fluid header-logo"
                  style={{ height: 80, width: "auto" }}
                />
              </a>
            </div>

            <div className="col-lg-9 col-md-8 col-sm-6 d-flex justify-content-end">
              <nav className="d-flex gap-4 align-items-center header-nav">
                <Link to="/home" className="header-link">
                  Home
                </Link>
                <Link to="/user" className="header-link">
                  Settings
                </Link>
                <Link to="/user" className="header-link">
                  Stats
                </Link>
                <Link to="/user" className="header-link">
                  Profile
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

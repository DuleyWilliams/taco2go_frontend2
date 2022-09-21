import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./NavBar.css";

export const NavBar = ({ clearUser, isAuthenticated }) => {
  const history = useHistory();

  const handleLogout = () => {
    clearUser();
    history("/");
  };

  return (
    <ul className="navbar">
      <li className="navbar__image">
        <Link className="navbar__link" to="/"></Link>
      </li>
      <li className="navbar__item active">
        <Link
          className="navbar__link"
          to="/"
          style={{ textDecoration: "none" }}
        >
          Home
        </Link>
      </li>
      {isAuthenticated ? (
        <li className="navbar__item">
          <Link
            className="navbar__link"
            to="/myCollection "
            style={{ textDecoration: "none" }}
          >
            My Collection
          </Link>
        </li>
      ) : null}
      {isAuthenticated ? (
        <li className="navbar__item">
          <Link
            className="navbar__link"
            to="/myCollection/added"
            style={{ textDecoration: "none" }}
          >
            Wish List
          </Link>
        </li>
      ) : null}
      {/* {isAuthenticated ? (
        <li className="navbar__item">
          <Link className="navbar__link" to="">
            Kop Or Drop
          </Link>
        </li>
      ) : null} */}
      {isAuthenticated ? (
        <li className="navbar__item">
          <span className="navbar__link" onClick={handleLogout}>
            {" "}
            Logout{" "}
          </span>
        </li>
      ) : (
        <li className="navbar__item">
          <Link className="navbar__link" to="/login">
            Login
          </Link>
        </li>
      )}
    </ul>
  );
};
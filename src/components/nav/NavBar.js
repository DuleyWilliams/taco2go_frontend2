import React from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"


export const NavBar = () => {
  const history = useHistory()
  return (
      <ul className="navbar">
          <li className="navbar__image" a href="/">
                <Link to="/"></Link>
          </li>
          <li className="navbar__item">
              <Link to="/mybuilttacos"><button>Build A Taco</button></Link>
          </li>
          {/* <li className="navbar__item">
          <Link to="/events">Events</Link>
          </li>
          <li className="navbar__item">
              Navigation link
          </li> */}
          {
              (localStorage.getItem("lu_token") !== null) ?
                  <li className="nav-item">
                      <button className=""
                          onClick={() => {
                              localStorage.removeItem("lu_token")
                              history.push({ pathname: "/" })
                          }}
                      >Logout</button>
                  </li> :
                  <>
                      <li className="nav-item">
                          <Link className="nav-link" to="/login">Login</Link>
                      </li>
                      <li className="nav-item">
                          <Link className="nav-link" to="/register">Register</Link>
                      </li>
                  </>
          }        </ul>
  )
}
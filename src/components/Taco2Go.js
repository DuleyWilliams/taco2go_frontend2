import React, {useState} from "react"
import { NavBar } from "./nav/NavBar"
import { ApplicationViews } from "../ApplicationViews"
import "./Taco2Go.css"

export const Taco2Go = () => {
   
    const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem("taco2go_customer") !== null)

    const setAuthUser = (user) => {
        sessionStorage.setItem("taco2go_customer", JSON.stringify(user))
        setIsAuthenticated(sessionStorage.getItem("taco2go_customer") !== null)
    }

    const clearUser = () => {
        sessionStorage.clear();
        setIsAuthenticated(sessionStorage.getItem("taco2go_customer") !== null)
      }
   
return (
    <>
        <NavBar clearUser={clearUser} isAuthenticated={isAuthenticated}/>
        <ApplicationViews setAuthUser={setAuthUser} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
    </>
)
}
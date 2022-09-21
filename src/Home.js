import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const Home = () => {


  return (
    <>
      <main className="full-site">
        <section className="left_home">
          <h2>New Releases</h2>
          <small>Check here for new Kickz</small>

          <div className="home--btn--group">
            <Link to="/register">
              <button className="home--button" type="submit">
                Sign-up
              </button>
            </Link>

            <Link to="/login">
              <button className="home--button" type="submit">
                Login
              </button>
            </Link>
          </div>
          <div className="brand--logos">
            <img src="/images/smileyTac.svg" />
          </div>
        </section>
        <section className="right_home">
          <div className="brand--box">
            <img src="/images/smileyTac.svg" />
          </div>
        </section>
      </main>
    </>
  );
};
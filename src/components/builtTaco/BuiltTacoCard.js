import React, { useState, useEffect } from "react";
import "./BuiltTaco.css";
import { Link } from "react-router-dom";
import { getAllMyBuiltTacos, createMyBuiltTaco } from "./BuiltTacoManager";
import { useHistory } from "react-router-dom";

export const MyBuiltTacoCard = ({ taco, handleDeleteTaco}) => {
  const [myTacos, setMyTaco] = useState({
    tacoLoverId: taco.tacoLoverId_id,
    protein: taco.tacoProteinId_id,
    shell: taco.tacoShellId_id,
    name: taco.name,
  });

  const handleClickSaveTaco = (event) => {
    event.preventDefault(); //Prevents the browser from submitting the form
    createMyBuiltTaco(myTacos).then(() => history("/mybuilttacos/added"));
  };

  const history = useHistory();

  return (
    //This formatting will build my actual card once API info is imported.

    <div className="card">
      <div className="card-content">
        <section className="card-header"></section>
        {/* <section className="card-image">
          <img src={taco.media.imageUrl} alt="MyKickz" />
        </section> */}
        <h2>
          Brand: <span className="card-kickname">{taco.tacoLoverId_id}</span>
        </h2>
        <p>Style: {taco.title}</p>
        <p>Colorway: {taco.colorway}</p> <p>year:{taco.year} </p>
        <Link to={`/myCollection/${taco.id}`}>
          <button type="button" onClick={handleClickSaveTaco}>
            Add
          </button>
        </Link>
      </div>
    </div>
  );
};
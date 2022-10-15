import React, { useState, useEffect } from "react";
import {
  getMyBuiltTacoById,
  getAllMyBuiltTacos,
  deleteMyBuiltTaco
} from "./BuiltTacoManager";
import { MyBuiltTacoCard } from "./BuiltTacoCard";
import { useHistory } from "react-router-dom";

export const MyBuiltTacoList = () => {
  const [tacos, setTacos] = useState([]);

  const history = useHistory();

  const getTacos = () => {
    return getAllMyBuiltTacos().then((tacosFromAPI) => {
      setTacos(tacosFromAPI);
      // We'll do something more interesting with this data soon.
    });
  };
 

  useEffect(() => {
    getTacos();
  }, []);

  const handleDeleteTaco= (id) => {
    deleteMyBuiltTaco(id).then(() => getAllMyBuiltTacos().then(setTacos));
  };


  return (
    <>
      {" "}
      <section className="section-header">
        <h1>Build A Taco</h1>
      </section>
      <section className="section-btn">
        <button
          type="button"
          className="btn"
          onClick={() => {
            history.push("/mybuilttacos/new");
          }}
        >
          Build-A-Taco
        </button>
      </section>
      <div className="container-cards">
        {tacos.map((taco) => (
          <MyBuiltTacoCard 
            key={taco.id}
            taco={taco}
            handleDeleteTaco={handleDeleteTaco}
          />
        ))}
      </div>
    </>
  );
};
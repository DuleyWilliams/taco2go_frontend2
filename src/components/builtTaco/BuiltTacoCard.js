import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { getAllMyBuiltTacos, getMyBuiltTacoById, createMyBuiltTaco } from "./BuiltTacoManager"
import "./BuiltTaco.css"

export const MyBuiltTacoCard = ({ taco, handleDeleteTaco}) => {

  const history = useHistory();


  useEffect(() => {
    getMyBuiltTacoById(taco.id);
  }, []);

  // To add to edit page//__________________________________
  //_____________________________________
  // const handleFieldChange = (evt) => {
  //   const stateToChange = { ...builtTacos };
  //   stateToChange[evt.target.id] = evt.target.value;
  //   setBuiltTacos(stateToChange);
  // };

  return (
        //This formatting will build my actual card once API info is imported.
    
        <div className="card">
          <div className="card-content">
            <section className="card-header"></section>
            <h2>
              Name: <span className="card-taconame">{taco.name}</span>
            </h2>
                {/* <form>
                  <fieldset className="built-taco-form">
                    <div className="formgrid">
                      <input
                        type="radio"
                        required
                        className="form-control"
                        onChange={handleFieldChange}
                    </div>

                  </fieldset>
                </form> */}
            {/* <Link to={`/myBuiltTacos/${builtTacos.id}`}>
              <button type="button" onClick={handleClickSaveTaco}>
                Add
              </button>
            </Link> */}
             <Link to={`/`}>
              <button type="button" onClick={ e => {
                  e.preventDefault()
                  handleDeleteTaco(taco.id)
                }
              }>
                Delete
              </button>
            </Link>
          </div>
        </div>
      );
    };

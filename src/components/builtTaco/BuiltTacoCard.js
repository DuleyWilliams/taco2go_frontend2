import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { getAllMyBuiltTacos, getMyBuiltTacoById, createMyBuiltTaco, updateMyBuiltTaco } from "./BuiltTacoManager"
import "./BuiltTaco.css"

export const MyBuiltTacoCard = ({ taco, handleDeleteTaco, updateExistingTaco}) => {

  const history = useHistory();
  const [tacos, setBuiltTacos] = useState([]);

  useEffect(() => {
    getMyBuiltTacoById(taco.id);
  }, []);

  useEffect(() => {
    updateMyBuiltTaco(taco.id);
  }, []);

  // To add to edit page//__________________________________
  //_____________________________________
  const handleFieldChange = (evt) => {
    const stateToChange = { ...tacos };
    stateToChange[evt.target.id] = evt.target.value;
    setBuiltTacos(stateToChange);
  };

  

  return (
        //This formatting will build my actual card once API info is imported.
    
        <div className="card">
          <div className="card-content">
            <section className="card-header"></section>
           <img src="http://localhost:3000/images/smileyTac.svg" width="150px" alt="Smiling Taco"></img>
           <p>Taco Name:</p>
            <h2>
              <span className="card-taconame">{taco.name}</span>
            </h2>
                <h3>Shell: {taco.tacoShellId.type}</h3>
                <h3>Protein: {taco.tacoProteinId.type}</h3>
                    <h3>{taco.protein}</h3>
                    {taco.sauces.map((sauce) => {
                      return <p>{sauce.type}</p>
                    }
                  )}
                    {taco.toppings.map((topping) => {
                      return <p>{topping.type}</p>
                    }
                  )}
                <Link to={`/mybuilttacos/edit/${taco.id}`}><button>Edit</button>
                </Link>
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

                  {/* <Link to={`/myBuiltTacos/${builtTacos.id}`}>
                    <button type="button" onClick={handleClickSaveTaco}>
                      Add
                    </button>
                  </Link> */}
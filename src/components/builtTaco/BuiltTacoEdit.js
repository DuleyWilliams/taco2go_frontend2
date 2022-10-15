<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { getMyBuiltTacoById, updateMyBuiltTaco } from "./BuiltTacoManager";
=======
import React, { useState, useEffect} from "react";
import {
  getMyBuiltTacoById,
  updateMyBuiltTaco
} from "./BuiltTacoManager";
import { getAllProteins } from "../protein/ProteinManager";
import { getAllShells } from "../shell/ShellManager";
>>>>>>> d363f706f05382955a0f902e425a842d606e66d1
import { useHistory, useParams } from "react-router-dom";
//
import "./BuiltTacoEdit.css";
import { getAllProteins } from "../protein/ProteinManager";

export const MyBuiltTacoEdit = () => {
  const [taco, setTaco] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [proteins, setProteins] = useState([]);
  const [shells, setShells] = useState([]);
  const { tacoId } = useParams();
  const history = useHistory();

  const handleControlledInputChange = (event) => {
    const newTaco = { ...taco };
    let selectedVal = event.target.value;
    if (event.target.id.includes("Id")) {
      selectedVal = parseInt(selectedVal);
    }
    newTaco[event.target.id] = selectedVal;
    // update state
    setTaco(newTaco);
  };

  const handleFieldChange = (evt) => {
    const stateToChange = { ...taco };
    stateToChange[evt.target.id] = evt.target.value;
    setTaco(stateToChange);
  };

  const updateExistingTaco = (evt) => {
    evt.preventDefault();
    setIsLoading(true);

    // This is an edit, so we need the id
    const editedTaco = {
      id: parseInt(taco.id),
      name: taco.name,
    };

    updateMyBuiltTaco(editedTaco).then(() => history("mybuilttacos/edit"));
  };

  useEffect(() => {
    getMyBuiltTacoById(tacoId).then((taco) => {
      setTaco({...taco, shellId:taco.tacoShellId.id, proteinId:taco.tacoProteinId.id}); 
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    getAllProteins().then((proteins) => {
      setProteins(proteins);
    });
  }, []);

  useEffect(() => {
    getAllShells().then((shells) => {
      setShells(shells);
    });
  }, []);

  useEffect(() => {
    console.log(taco)
    },[taco]);


  return (
    <>
      <h1>Edit Taco</h1>
      <form>
        <fieldset className="extraform">
          <div className="">
            <input
              type="text"
              required
              className="form-control"
              onChange={handleFieldChange}
              id="name"
              value={taco.name}
            />
             <h2>Protein</h2>
          {proteins?.map((protein) => (
            <label htmlFor="protein">
              <input
                id="proteinId"
                checked={taco.proteinId === protein.id}
                onChange={handleControlledInputChange}
                type="radio"
                value={protein.id}
              />
              {protein.type}
            </label>
          ))}
                       <h2>Shell</h2>
          {shells?.map((shell) => (
            <label htmlFor="shell">
              <input
                id="shellId"
                checked={taco.shellId === shell.id}
                onChange={handleControlledInputChange}
                type="radio"
                value={shell.id}
              />
              {shell.type}
            </label>
          ))}
            </div> 
            {/* <label htmlFor="whyDidYouBuy">Why did you purchase?</label>

            <input
              type="radio"
              required
              className="form-control"
              onChange={handleFieldChange}
              id="whenPurchased"
              value={taco.whenPurchased}
            />
            <label htmlFor="whenPurchased">When did you purchase?</label>

            <input
              type="text-area"
              required
              className="form-control"
              onChange={handleFieldChange}
              id="wherePurchased"
              value={kick.wherePurchased}
            />
            <label htmlFor="wherePurchased">Where did you purchase?</label>
          </div> */}
          <div className="alignRight">
            <button
              type="button"
              disabled={isLoading}
              onClick={updateExistingTaco}
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
        </fieldset>
      </form>
    </> 
  );
};

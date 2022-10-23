import React, { useState, useEffect } from "react";
import { getAllShells } from "../shell/ShellManager";
import { getAllProteins } from "../protein/ProteinManager";
import { getAllSauces } from "../sauce/SauceManager";
import { getAllToppings } from "../topping/ToppingManager";
import { createMyBuiltTaco } from "./BuiltTacoManager";
import { useHistory } from "react-router-dom";
import "./BuiltTacoEdit.css";

export const BuiltTacoForm = () => {
  const [taco, setTaco] = useState({
    name: "",
    shellId: 1,
    proteinId: 1,
  });
  const [shells, setShells] = useState([]);
  const [proteins, setProteins] = useState([]);
  const [toppings, setToppings] = useState([]);
  const [sauces, setSauces] = useState([]);
  const history=useHistory();
  const [toppingIds, setToppingIds] = useState([]);
  const [sauceIds, setSauceIds] = useState([]);

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

  const [checkedToppingStates, setcheckedToppingStates] = useState([]);
  const [checkedSauceStates, setCheckedSauceStates] = useState([]);

  const handleToppingCheckboxChange = (toppingIndexPosition) => {
    const newCheckedStates = checkedToppingStates.map(
      (isChecked, checkedStateIndex) => {
        return checkedStateIndex === toppingIndexPosition
          ? !isChecked
          : isChecked;
      }
    );
    setcheckedToppingStates(newCheckedStates);
  };

  const handleSauceCheckboxChange = (toppingIndexPosition) => {
    const newCheckedStates = checkedSauceStates.map(
      (isChecked, checkedStateIndex) => {
        return checkedStateIndex === toppingIndexPosition
          ? !isChecked
          : isChecked;
      }
    );
    setCheckedSauceStates(newCheckedStates);
  };

  const handleSubmitData = (e) => {
    e.preventDefault();

    const newTaco = {
      /* Need to add for newtaco in Django - backend */
      name: taco.name,
      shell_id: taco.shellId,
      protein_id: taco.proteinId,
      topping_ids: toppingIds,
      sauce_ids: sauceIds,
    };
    createMyBuiltTaco(newTaco)
        .then(()=> history.push("/mybuilttacos") )
    
  };

  useEffect(() => {
    getAllShells().then((shells) => {
      setShells(shells);
    });
  }, []);

  useEffect(() => {
    getAllProteins().then((proteins) => {
      setProteins(proteins);
    });
  }, []);

  useEffect(() => {
    getAllToppings().then((toppings) => {
      setToppings(toppings);
      setcheckedToppingStates(new Array(toppings.length).fill(false));
    });
  }, []);

  useEffect(() => {
    getAllSauces().then((sauces) => {
      setSauces(sauces);
      setCheckedSauceStates(new Array(sauces.length).fill(false));
    });
  }, []);

  useEffect(() => {
    const selectedToppings = toppings.filter((_, index) => {
      return checkedToppingStates[index];
    });

    const selectedToppingIds = selectedToppings.map((topping) => topping.id);

    setToppingIds(selectedToppingIds);
  }, [checkedToppingStates]);

  useEffect(() => {
    const selectedSauces = sauces.filter((_, index) => {
      return checkedSauceStates[index];
    });

    const selectedSauceIds = selectedSauces.map((sauce) => sauce.id);

    setSauceIds(selectedSauceIds);
  }, [checkedSauceStates]);

  return (
    <>
    
    <form className="tacoForm">
    <h1>Build A Taco</h1>
      <fieldset className="extraform-edit">
        <div className="container-cards-name">
          <label class="edit_label" htmlFor="name">
            <h2>Taco Name</h2>
          </label>
          <input
            type="text"
            id="name"
            autoFocus
            onChange={handleControlledInputChange}
            className="form-control"
            placeholder="Name Your Taco"
          />
        </div>
      </fieldset>
      <fieldset className="new">
          <h2>Shell</h2>
        <div className="container-cards-edit">
          {shells?.map((shell) => (
            <label htmlFor="shell">
              <ul>
              <input
                id="shellId"
                checked={taco.shellId === shell.id}
                onChange={handleControlledInputChange}
                type="radio"
                value={shell.id}
              />
              {shell.type}
            </ul>
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset className="new">
          <h2>Protein</h2>
        <div className="container-cards-edit">
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
        </div>
      </fieldset>
      <fieldset className="new">
          <h2>Toppings</h2>
        <div className="container-cards-edit">
          {toppings.map((topping, index) => {
            return (
              <>
              <label class="edit_label">
                <input
                  type="checkbox"
                  id={topping.type}
                  value={topping.id}
                  name={topping.type}
                  checked={checkedToppingStates[index]}
                  onChange={() => handleToppingCheckboxChange(index)}
                />
                <ul htmlFor={topping.type}>{topping.type}</ul>
                </label>
              </>
            );
          })}
        </div>
      </fieldset>
      <fieldset className="new">
          <h2>Sauces</h2>
        <div className="container-cards-edit">
          {sauces.map((sauce, index) => {
            return (
              <>
              <label class="edit_label">
                <input
                  type="checkbox"
                  id={sauce.type}
                  value={sauce.id}
                  name={sauce.type}
                  checked={checkedSauceStates[index]}
                  onChange={() => handleSauceCheckboxChange(index)}
                />
                <ul htmlFor={sauce.type}>{sauce.type}</ul>
                </label>
              </>
            );
          })}
        </div>
      </fieldset>
    </form>
      <button onClick={handleSubmitData}>Save</button>
    </>
  );
};

import React, { useState, useEffect } from "react";
import { getMyBuiltTacoById, updateMyBuiltTaco } from "./BuiltTacoManager";
import { getAllProteins } from "../protein/ProteinManager";
import { getAllShells } from "../shell/ShellManager";
import { useHistory, useParams } from "react-router-dom";
//
import { getAllToppings } from "../topping/ToppingManager";
import { getAllSauces } from "../sauce/SauceManager";
import "./BuiltTacoEdit.css";

export const MyBuiltTacoEdit = () => {
  const [taco, setTaco] = useState({
    name: "",
    shellId: 1,
    proteinId: 1,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [proteins, setProteins] = useState([]);
  const [shells, setShells] = useState([]);
  const [toppings, setToppings] = useState([]);
  const [sauces, setSauces] = useState([]);
  const [toppingIds, setToppingIds] = useState([]);
  const [sauceIds, setSauceIds] = useState([]);
  const [checkedToppingStates, setcheckedToppingStates] = useState([]);
  const [checkedSauceStates, setCheckedSauceStates] = useState([]);

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
      name: taco.name,
      shell_id: taco.shellId,
      protein_id: taco.proteinId,
      topping_ids: toppingIds,
      sauce_ids: sauceIds,
    };
    // console.log(editedTaco);

    updateMyBuiltTaco(parseInt(taco.id), editedTaco).then(() =>
      history.push("/")
    );
  };

  useEffect(() => {
    getMyBuiltTacoById(tacoId)
      .then((taco) => {
        setTaco({
          ...taco,
          shellId: taco.tacoShellId.id,
          proteinId: taco.tacoProteinId.id,
        });
      })
      .then(() => {
        getAllSauces().then((sauces) => {
          setSauces(sauces);
        });
      })
      .then(() => {
        getAllToppings().then((toppings) => {
          setToppings(toppings);
          const intialCheckedToppingStates = toppings.map((topping) =>
            taco?.topping_ids?.includes(topping.id)
          );
          setcheckedToppingStates(intialCheckedToppingStates);
        });
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

  // whenever our toppings checkboxes change, make sure the Ids we're capturing stay up to date
  useEffect(() => {
    const selectedToppings = toppings.filter((_, index) => {
      return checkedToppingStates[index];
    });

    const selectedToppingIds = selectedToppings.map((topping) => topping.id);

    setToppingIds(selectedToppingIds);
  }, [checkedToppingStates]);

  // whenever our sauces checkboxes change, make sure the Ids we're capturing stay up to date
  useEffect(() => {
    const selectedSauces = sauces.filter((_, index) => {
      return checkedSauceStates[index];
    });

    const selectedSauceIds = selectedSauces.map((sauce) => sauce.id);

    setSauceIds(selectedSauceIds);
  }, [checkedSauceStates]);

  // when "sauces" from the server arrive, run this code to set their initial checkbox states
  useEffect(() => {
    const intialCheckedSauceStates = sauces.map((sauce) =>
      taco?.sauce_ids?.includes(sauce.id)
    );
    setCheckedSauceStates(intialCheckedSauceStates);
  }, [sauces]);

  // when "toppings" from the server arrive, run this code to set their initial checkbox states
  useEffect(() => {
    const intialCheckedToppingStates = toppings.map((topping) =>
      taco?.topping_ids?.includes(topping.id)
    );
    setcheckedToppingStates(intialCheckedToppingStates);
  }, [toppings]);

  return (
    <>
      <h1>Edit Taco</h1>
  
        <fieldset className="extraform-edit">
          <h2>Taco Name</h2>
          <div className="container-cards-name">
            <input
              type="text"
              required
              className="form-control-edit"
              onChange={handleControlledInputChange}
              id="name"
              value={taco.name}
            />
            </div>
           <fieldset className="edit">
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
            <fieldset className="edit">
            <h2>Protein</h2>
            <div className="container-cards-edit">
            {proteins?.map((protein) => (
              <label htmlFor="protein">
               <ul>
                <input
                  id="proteinId"
                  checked={taco.proteinId === protein.id}
                  onChange={handleControlledInputChange}
                  type="radio"
                  value={protein.id}
                />
                {protein.type}
              </ul>
              </label>
            ))}
          </div>
            </fieldset>
          <fieldset className="edit">
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
                    
                      <ul htmlFor={topping.type}>{topping.type}
                      </ul>
                      </label>
                  </>
                );
              })}
            </div>
          </fieldset>
          <fieldset className="edit">
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
            
                    <ul htmlFor={sauce.type}>
                      {sauce.type}
                    </ul>
                    </label>
                  </>
                );
              })}
            </div>
          </fieldset>
          
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
              
    </>
  );
};
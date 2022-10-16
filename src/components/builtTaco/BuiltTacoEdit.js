import React, { useState, useEffect } from "react";
import { getMyBuiltTacoById, updateMyBuiltTaco } from "./BuiltTacoManager";
import { getAllProteins } from "../protein/ProteinManager";
import { getAllShells } from "../shell/ShellManager";
import { useHistory, useParams } from "react-router-dom";
//
import "./BuiltTacoEdit.css";
import { getAllToppings } from "../topping/ToppingManager";
import { getAllSauces } from "../sauce/SauceManager";

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
      id: parseInt(taco.id),
      name: taco.name,
      shell_id: taco.shellId,
      protein_id: taco.proteinId,
      topping_ids: toppingIds,
      sauce_ids: sauceIds,
    };
    console.log(editedTaco);

    // updateMyBuiltTaco(editedTaco).then(() => history("mybuilttacos/edit"));
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
      <form>
        <fieldset className="extraform">
          <div className="">
            <input
              type="text"
              required
              className="form-control"
              onChange={handleControlledInputChange}
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
          <fieldset>
            <div className="container-cards">
              <h2>Toppings</h2>
              {toppings.map((topping, index) => {
                return (
                  <>
                    <input
                      type="checkbox"
                      id={topping.type}
                      value={topping.id}
                      name={topping.type}
                      checked={checkedToppingStates[index]}
                      onChange={() => handleToppingCheckboxChange(index)}
                    />
                    <label htmlFor={topping.type}>{topping.type}</label>
                  </>
                );
              })}
            </div>
          </fieldset>
          <fieldset>
            <div className="container-cards">
              <h2>Sauces</h2>
              {sauces.map((sauce, index) => {
                return (
                  <>
                    <input
                      type="checkbox"
                      id={sauce.type}
                      value={sauce.id}
                      name={sauce.type}
                      checked={checkedSauceStates[index]}
                      onChange={() => handleSauceCheckboxChange(index)}
                    />
                    <label htmlFor={sauce.type}>{sauce.type}</label>
                  </>
                );
              })}
            </div>
          </fieldset>
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

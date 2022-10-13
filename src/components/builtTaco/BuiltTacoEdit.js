import React, { useState, useEffect} from "react";
import {
  getMyBuiltTacoById,
  updateMyBuiltTaco
} from "./BuiltTacoManager";
import { useHistory, useParams } from "react-router-dom";
// import "./BuiltTacoEdit.css";

export const MyBuiltTacoEdit = () => {
  const [taco, setTaco] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { tacoId } = useParams();
  const history = useHistory();

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
      setTaco(taco);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <h1>Extras</h1>
      <form>
        <fieldset className="extraform">
          <div className="formgrid">
            <input
              type="text"
              required
              className="form-control"
              onChange={handleFieldChange}
              id="name"
              value={tacoId}
            />
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

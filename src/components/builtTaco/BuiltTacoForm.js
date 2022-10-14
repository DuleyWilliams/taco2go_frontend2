import React, { useState, useEffect } from 'react';
import { getAllShells } from '../shell/ShellManager';
import { getAllProteins} from '../protein/ProteinManager';
import { getAllSauces} from '../sauce/SauceManager';
import { getAllToppings} from '../topping/ToppingManager';

export const BuiltTacoForm = () => {
const [ taco, setTaco ] = useState ({
    name:"",
    shellId:1,
    proteinId:1,
    toppingIds:[],
})
const [ shells, setShells] = useState ([])
const [ proteins, setProteins] = useState ([])
const [ toppings, setToppings] = useState ([])

const handleControlledInputChange = (event) => {

    const newTaco = { ...taco }
    let selectedVal = event.target.value
    if (event.target.id.includes("Id")) {
        selectedVal = parseInt(selectedVal)
    }
    // console.log(event.target.id)
    newTaco[event.target.id] = selectedVal
    // update state
    setTaco(newTaco)
}

const [checkedStates, setCheckedStates] = useState(
    new Array(toppings.length).fill(false)
  );


const handleCheckboxChange = (toppingIndexPosition) => {
const newCheckedStates = checkedStates.map(
    (isChecked, checkedStateIndex) => {
    return checkedStateIndex === toppingIndexPosition
        ? !isChecked
        : isChecked;
    }
);

setCheckedStates(newCheckedStates);

    const selectedToppings = toppings.filter((_, index) => {
    return checkedStates[index];
});

    const selectedToppingIds = selectedToppings.map((topping) => topping.id);

    setTaco({
        ...taco, 
        toppingIds: selectedToppings
    })

};




const handleSubmitData = () => {
    const newTaco = {
        /* Need to add for newtaco in Django - backend */
        selected_Topping_Ids: taco.toppingIds,
        name: taco.name,
        shell_id: taco.shellId,
        protein_id: taco.proteinId,

      };
}

useEffect(() => {
    getAllShells()
        .then(shells => {
            setShells(shells)
        })
}, []);

useEffect(() => {
    getAllProteins()
        .then(proteins => {
            setProteins(proteins)
        })
}, []);

useEffect(() => {
    getAllToppings()
        .then(toppings => {
            setToppings(toppings)
        })
}, []);

useEffect(() => {
//    console.log(shells)
}, [shells]);

useEffect(() => {
//    console.log(proteins)
}, [proteins]);



return (
<form className="tacoForm">
			<fieldset>
				<div className="form-group">
					<label htmlFor="name"><h2>Name Your Taco</h2></label>
                        <input type="text" id="name" autoFocus
                        onChange={handleControlledInputChange} className="form-control" placeholder="Name Your Taco" />
				</div>
			</fieldset>
            <fieldset>
                <div className="form-group">
            </div>
			</fieldset>
            <fieldset>
                <div className="container-cards">
                    <h2>Shell</h2>
                    {shells.map((shell) => (
                    <label htmlFor="shell">
                        <input id="shellId" checked = {taco.shellId===shell.id}
                        onChange={handleControlledInputChange}
                        type="radio"
                        value={shell.id}
                        />
                        {shell.type}</label>
                        ))}
                </div>
            </fieldset>
            <fieldset>
                <div className="container-cards">
                    <h2>Protein</h2>
                    {proteins.map((protein) => (
                    <label htmlFor="protein">
                        <input id="proteinId" checked = {taco.proteinId===protein.id}
                        onChange={handleControlledInputChange}
                        type="radio"
                        value={protein.id}
                        />
                        {protein.type}</label>
                        ))}
                </div>
            </fieldset>
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
                    checked={checkedStates[index]}
                    onChange={() => handleCheckboxChange(index)}
                />
                <label htmlFor={topping.type}>{topping.type}</label>
                </>
            );
            })}
                </div>
            </fieldset>
</form>

)
}
import React, { useState, useEffect } from 'react';
import { getAllShells } from '../shell/ShellManager';
import { getAllProteins} from '../protein/ProteinManager'


export const BuiltTacoForm = () => {
const [ taco, setTaco ] = useState ({
    name:"",
    shellId:1,
    proteinId:1,
})
const [ shells, setShells] = useState ([])
const [ proteins, setProteins] = useState ([])

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
</form>

)
}
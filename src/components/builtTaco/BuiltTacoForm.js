import React, { useState, useEffect } from 'react';
import { getAllShells } from '../shell/ShellManager';


export const BuiltTacoForm = () => {
const [ taco, setTaco ] = useState ({
    name:"",
    shellId:2
})
const [ shells, setShells] = useState ([
])

const handleControlledInputChange = (event) => {

    const newTaco = { ...taco }
    let selectedVal = event.target.value
    if (event.target.id.includes("Id")) {
        selectedVal = parseInt(selectedVal)
    }
    console.log(event.target.id)
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
   console.log(shells)
}, [shells]);





return (
<form className="tacoForm">
			<fieldset>
				<div className="form-group">
					<label htmlFor="name">Name Your Taco</label>
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
</form>

)
}
const remoteURL = "http://localhost:8000"

export const getTacoToppingById = (tacoToppingId) => {
  return fetch(`${remoteURL}/[tacotoppings]/${toppingId}`, {
    headers:{
        "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
    .then(res => res.json())
}

export const getAllTacoToppings = () => {
  return fetch(`${remoteURL}/tacotoppings`, {
    headers:{
        "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
    .then(res => res.json())
}

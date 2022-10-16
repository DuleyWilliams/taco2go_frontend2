const remoteURL = "http://localhost:8000"

export const getToppingById = (toppingId) => {
  return fetch(`${remoteURL}/[toppings]/${toppingId}`, {
    headers:{
        "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
    .then(res => res.json())
}

export const getAllToppings = () => {
  return fetch(`${remoteURL}/toppings`, {
    headers:{
        "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
    .then(res => res.json())
}

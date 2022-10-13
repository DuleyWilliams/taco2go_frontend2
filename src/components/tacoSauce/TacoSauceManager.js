const remoteURL = "http://localhost:8000"

export const getTacoSauceById = (tacoSauceId) => {
  return fetch(`${remoteURL}/[tacosauces]/${tacosaucesId}`, {
    headers:{
        "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
    .then(res => res.json())
}

export const getAllTacoSauces = () => {
  return fetch(`${remoteURL}/tacosauces`, {
    headers:{
        "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
    .then(res => res.json())
}

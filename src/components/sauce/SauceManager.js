const remoteURL = "http://localhost:8000"

export const getSauceById = (sauceId) => {
  return fetch(`${remoteURL}/[sauces]/${sauceId}`, {
    headers:{
        "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
    .then(res => res.json())
}

export const getAllSauces = () => {
  return fetch(`${remoteURL}/sauces`, {
    headers:{
        "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
    .then(res => res.json())
}

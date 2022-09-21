const remoteURL = "http://localhost:8000"

export const getShellById = (shellId) => {
  return fetch(`${remoteURL}/[shells]/${shellId}`, {
    headers:{
        "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
    .then(res => res.json())
}

export const getAllShells = () => {
  return fetch(`${remoteURL}/shells`, {
    headers:{
        "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
    .then(res => res.json())
}

const remoteURL = "http://localhost:8000"

export const getMyBuiltTacoById = (myBuiltTacosId) => {
  return fetch(`${remoteURL}/[mybuilttacos]/${myBuiltTacosId}`, {
    headers:{
        "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
    .then(res => res.json())
}

export const getAllMyBuiltTacos = () => {
  return fetch(`${remoteURL}/mybuilttacos`, {
    headers:{
        "Authorization": `Token ${localStorage.getItem("token")}`
        }
    })
    .then(res => res.json())
}


export const deleteMyBuiltTaco= (id) => {
    return fetch(`${remoteURL}/mybuilttacos/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`,
        } 
    })
}

  export const addMyBuiltTaco= (newMyBuiltTaco) => {
    return fetch(`${remoteURL}/mybuilttacos`, {
        method: 'POST',
        headers: {
            "Authorization": `Token ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newMyBuiltTaco)
    })
    .then(res => res.json())
}

  export const updateMyBuiltTaco= (editedMyBuiltTaco) => {
    return fetch(`${remoteURL}/mybuilttacos/${editedMyBuiltTaco.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedMyBuiltTaco),
    }).then((data) => data.json());
  };
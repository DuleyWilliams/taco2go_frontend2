const remoteURL = "http://localhost:8000"

export const getAllMyBuiltTacos = () => {
    return fetch("http://localhost:8000/mybuilttacos", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const createMyBuiltTaco= (createMyBuiltTaco) => {
    return fetch(`${remoteURL}/mybuilttacos`, { 
        method: "POST",
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(createMyBuiltTaco)
    }).then(response => response.json())
}

export const updateMyBuiltTaco = (updateMyBuiltTaco, id) => {
    // console.log('updatedMyBuiltTaco', editMyBuiltTaco)
    return fetch(`${remoteURL}/mybuilttacos/edit/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updateMyBuiltTaco, id)
    })
}

export const deleteMyBuiltTaco = (id) => {
    return fetch(`${remoteURL}/mybuilttacos/${id}`, { 
        method: "DELETE",
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
        body: JSON.stringify(id)
    })
}

export const getMyBuiltTacoById = (id) => {
    return fetch(`${remoteURL}/mybuilttacos/${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
        } 
    })
        .then(response => response.json())
}
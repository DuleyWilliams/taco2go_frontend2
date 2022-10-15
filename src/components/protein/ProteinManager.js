const remoteURL = "http://localhost:8000";

export const getProteinById = (proteinId) => {
  return fetch(`${remoteURL}/[proteins]/${proteinId}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("lu_token")}`,
    },
  }).then((res) => res.json());
};

export const getAllProteins = () => {
  return fetch(`${remoteURL}/proteins`, {
    headers: {
      Authorization: `Token ${localStorage.getItem("lu_token")}`,
    },
  }).then((res) => res.json());
};

import baseUrl from "../config";

const create = (bug) => {
  return fetch(`${baseUrl}/api/bugs/create`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bug),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

const list = () => {
  return fetch(`${baseUrl}/api/bugs`, { method: "GET" })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

const read = (params) => {
  return fetch(`${baseUrl}/api/bugs/${params.bugId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

const update = (params, bug) => {
  return fetch(`${baseUrl}/api/bugs/${params.bugId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bug),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

const remove = (params) => {
  return fetch(`${baseUrl}/api/bugs/${params.bugId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export { create, list, read, update, remove };

import baseUrl from "../config";

const getCache = () => {
  return fetch(`${baseUrl}/api/cache/user`, { method: "GET" })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

export { getCache };

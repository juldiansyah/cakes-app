const BACKEND_URL = `https://611a268fcbf1b30017eb5527.mockapi.io`;

export const getCakeLists = async (page) => {
  const response = await fetch(`${BACKEND_URL}/cakes?page=${page}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();

  return result;
};

export const getCakeDetail = async (cakeId) => {
  const response = await fetch(`${BACKEND_URL}/cakes/${cakeId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();

  return result;
};

export const addCake = async (data) => {
  const response = await fetch(`${BACKEND_URL}/cakes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  return result;
};

export const updateCake = async (data, cakeId) => {
  const response = await fetch(`${BACKEND_URL}/cakes/${cakeId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  return result;
};

export const deleteCake = async (cakeId) => {
  const response = await fetch(`${BACKEND_URL}/cakes/${cakeId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();

  return result;
};

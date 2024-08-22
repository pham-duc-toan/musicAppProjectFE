const SERVER = process.env.BACK_END_URL;

export const get = async (path: string) => {
  const response = await fetch(SERVER + path);
  const data = await response.json();
  return data;
};

export const post = async (path: string, options: object) => {
  const response = await fetch(SERVER + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options),
  });
  const data = await response.json();
  return data;
};

export const del = async (path: string) => {
  const response = await fetch(SERVER + path, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
};

export const patch = async (path: string, options: object) => {
  const response = await fetch(SERVER + path, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options),
  });
  const data = await response.json();
  return data;
};

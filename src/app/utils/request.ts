import {
  getAccessTokenFromLocalStorage,
  setAccessTokenToLocalStorage,
} from "../helper/localStorageClient";
// chỉ dùng cho client call api, còn nếu server muốn call api thì call trực tiếp tới server backend luôn

export const apiBasicClient = async (
  method: string,
  path: string,
  query?: any,
  option?: object
) => {
  const accessToken = getAccessTokenFromLocalStorage();
  const body = {
    path,
    query,
    method: method,

    ...(option ?? option),
  };
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASIC_API}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());

  return response;
};
export const apiBackEndCreateWithFile = async (
  path: string,
  formData: any,
  accessToken: string | null
) => {
  const response = await fetch(process.env.NEXT_PUBLIC_BACK_END_URL + path, {
    method: "POST",
    body: formData,
    headers: {
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    credentials: "include",
  });
  const result = await response.json();
  return result;
};
//api call trực tiếp tới server backend
export const apiBasicServer = async (
  method: string,
  path: string,
  query?: any,
  option?: object
) => {
  let queryParams = "";
  if (query) {
    queryParams = new URLSearchParams(query).toString();
  }
  const response = await fetch(
    process.env.NEXT_PUBLIC_BACK_END_URL + path + `?${queryParams}`,
    {
      method: method,

      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${accessToken}`,
      },
      ...(option ?? { body: JSON.stringify(option) }),
      credentials: "include",
    }
  );
  const result = await response.json();
  return result;
};
export const login = async (body: { username: string; password: string }) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_API}/login`, {
    method: "POST",
    credentials: "include",

    body: JSON.stringify(body),
  });
  const data = await response.json();

  return data;
};
export const logout = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_API}/logout`, {
    method: "POST",
    credentials: "include",
  });
  const data = await response.json();

  return data;
};
export const refreshtoken = async () => {
  const accessLocal = getAccessTokenFromLocalStorage();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH_API}/refreshToken`,
    {
      method: "POST",
      headers: {
        ...(accessLocal ? { Authorization: `Bearer ${accessLocal}` } : {}),
      },
      credentials: "include",
    }
  );
  const data = await response.json();
  if (data.data) {
    setAccessTokenToLocalStorage(data.data.access_token);
  }
  return data;
};

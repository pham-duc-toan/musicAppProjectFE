import { getAccessTokenFromLocalStorage } from "../helper/localStorageClient";
// chỉ dùng cho client call api, còn nếu server muốn call api thì call trực tiếp tới server backend luôn

const accessToken = getAccessTokenFromLocalStorage();
export const apiBasic = async (
  method: string,
  path: string,
  query?: any,
  option?: object
) => {
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
//api call trực tiếp tới server backend
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
export const login = async (body: { username: string; password: string }) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_API}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
  return response;
};

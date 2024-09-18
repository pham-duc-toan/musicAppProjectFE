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
    bearToken: accessToken,
    ...(option ?? option),
  };
  const response = await fetch(`${process.env.NEXT_PUBLIC_CALL_API}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const result = await response.json();
  return result;
};

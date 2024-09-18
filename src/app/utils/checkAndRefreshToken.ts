import { decodeToken } from "../helper/jwt";
import {
  getAccessTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage,
  removeTokensFromLocalStorage,
  setAccessTokenToLocalStorage,
  setRefreshTokenToLocalStorage,
} from "../helper/localStorageClient";

export const checkAndRefreshToken = async (param?: {
  onError?: () => void;
  onSuccess?: () => void;
}) => {
  const accessToken = getAccessTokenFromLocalStorage();
  const refreshToken = getRefreshTokenFromLocalStorage();

  if (!accessToken || !refreshToken) return;
  const decodedAccessToken = decodeToken(accessToken) as any;
  const decodedRefreshToken = decodeToken(refreshToken) as any;
  const now = Math.round(new Date().getTime() / 1000);
  if (decodedRefreshToken.exp <= now) {
    removeTokensFromLocalStorage();
    return param?.onError && param.onError();
  }
  if (
    decodedAccessToken.exp - now <
    (decodedAccessToken.exp - decodedAccessToken.iat) / 3
  ) {
    // Gọi API refresh token
    // try {
    // const role = decodedRefreshToken.role
    // const res =
    //   role === Role.Guest
    //     ? await guestApiRequest.refreshToken()
    //     : await authApiRequest.refreshToken()
    //   setAccessTokenToLocalStorage(res.payload.data.accessToken)
    //   setRefreshTokenToLocalStorage(res.payload.data.refreshToken)
    //   param?.onSuccess && param.onSuccess()
    // } catch (error) {
    //   param?.onError && param.onError()
    // }
  }
};

import jwt from "jsonwebtoken";
export const decodeToken = (token: string | undefined) => {
  if (!token) return undefined;
  return jwt.decode(token);
};
export const config = {
  runtime: "nodejs", // Chạy API trên Node.js runtime thay vì Edge runtime
};

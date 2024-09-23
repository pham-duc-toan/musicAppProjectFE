import jwt from "jsonwebtoken";
export const decodeToken = (token: string | undefined) => {
  if (!token) return undefined;
  return jwt.decode(token);
};
export const config = {
  runtime: "nodejs", // Chạy API trên Node.js runtime thay vì Edge runtime
};
export const decodeTokenServer = (token: string | undefined) => {
  if (!token) return undefined;

  try {
    const secretKey = process.env.JWT_ACCESS_TOKEN_SECRET!;
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    console.error("Invalid or expired token:", error);
    return undefined;
  }
};

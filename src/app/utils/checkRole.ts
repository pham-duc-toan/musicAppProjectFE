import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export const CheckTokenFromCookie = () => {
  const cookieStore = cookies();

  const refresh_token = cookieStore.get("refresh_token");
  const access_token = cookieStore.get("access_token");

  if (!access_token) {
    redirect(`/`);
  }
  if (!refresh_token) {
    redirect(`/login`);
  }
  return access_token;
};

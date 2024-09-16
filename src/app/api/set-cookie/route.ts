import { post } from "@/app/utils/request";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json({});
  const cookieStore = cookies();
  const refresh_token = cookieStore.get("refresh_token")?.value;
  const access_token = cookieStore.get("access_token")?.value;
  if (access_token) {
    if (refresh_token) {
      const res = await post("/auth/refresh", {
        refreshToken: refresh_token,
      });
    }
  }
  response.cookies.set("toandeptrai", "cookieValue", {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day in seconds
  });

  return response;
}

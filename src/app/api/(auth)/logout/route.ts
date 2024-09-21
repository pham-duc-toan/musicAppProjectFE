import { cookies } from "next/headers";
import { NextResponse } from "next/server";
const SERVER = process.env.NEXT_PUBLIC_BACK_END_URL;
// Handle logout
export async function POST() {
  const cookieStore = cookies();
  const access_token = cookieStore.get("access_token")?.value;
  const res = await fetch(`${SERVER}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });
  const data = await res.json();
  const response = NextResponse.json(data);
  response.cookies.set("access_token", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });

  response.cookies.set("refresh_token", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });

  return response;
}

// app/api/fetch-data/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const SERVER = process.env.NEXT_PUBLIC_BACK_END_URL;
export async function POST(request: Request) {
  const body = await request.json();
  const { method, path, query, option, bearToken } = body;
  const cookieStore = cookies();
  const access_token = cookieStore.get("access_token")?.value;
  const refresh_token = cookieStore.get("access_token")?.value;
  if (
    (access_token && refresh_token && access_token == bearToken) ||
    (!bearToken && !access_token && !refresh_token)
  ) {
    try {
      let queryParams = "";
      if (query) {
        queryParams = new URLSearchParams(query).toString();
      }

      const data = await fetch(`${SERVER}${path}?${queryParams}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          ...(access_token && { Authorization: `Bearer ${access_token}` }),
        },

        ...(option ?? { body: JSON.stringify(option) }),
      }).then((res) => res.json());

      return NextResponse.json(data);
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to fetch data from backend" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

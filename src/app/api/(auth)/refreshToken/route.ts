import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const SERVER = process.env.NEXT_PUBLIC_BACK_END_URL;
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { method, path, query, option } = body;
  const cookieStore = cookies();
  const access_token = cookieStore.get("access_token")?.value;
  const authHeader = request.headers.get("authorization");
  let accessLocal: string | undefined = undefined;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    accessLocal = token;
  }

  if (
    (access_token && access_token == accessLocal) ||
    (!accessLocal && !access_token)
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
        { message: "Failed to fetch data from backend" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({
      message: "Token không đúng ! Vui lòng đăng nhập lại!",
    });
  }
}

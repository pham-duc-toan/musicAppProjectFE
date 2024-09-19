import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const SERVER = process.env.NEXT_PUBLIC_BACK_END_URL;

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { username, password } = body;

    // Validate that username and password are strings
    if (typeof username !== "string" || typeof password !== "string") {
      return NextResponse.json(
        { message: "Username hoặc password không hợp lệ!" },
        { status: 400 }
      );
    }

    // Prepare the request to send to the backend server
    const response = await fetch(`${SERVER}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();

    return NextResponse.json(data);

    // Check if accessToken and refreshToken exist in the backend response
    const { accessToken, refreshToken } = data;
    if (!accessToken || !refreshToken) {
      return NextResponse.json(
        { message: "Thiếu accessToken hoặc refreshToken!" },
        { status: 500 }
      );
    }

    // Set the accessToken and refreshToken as cookies
    const cookieStore = cookies();
    cookieStore.set("access_token", accessToken, {
      httpOnly: true,
      path: "/",
      maxAge: 86400,
    });
    cookieStore.set("refresh_token", refreshToken, {
      httpOnly: true,
      path: "/",
      maxAge: 86400 * 7,
    });

    // Return success response
    return NextResponse.json({ message: "Đăng nhập thành công!" });
  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi xảy ra khi xử lý yêu cầu!" },
      { status: 500 }
    );
  }
}

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { decodeToken, decodeTokenServer } from "./app/helper/jwt";

// const managePaths = ["/manage", "/createSong"];
// const guestPaths = ["/guest"];
// const onlyPassedAuthPaths = [...managePaths, ...guestPaths];
// const onlyUnAuthPaths = ["/login"];

// // This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//   // pathname: /manage/dashboard
//   const accessToken = request.cookies.get("access_token")?.value;
//   const refreshToken = request.cookies.get("refresh_token")?.value;

//   const access_token_infor = decodeToken(accessToken);
//   const refresh_token_infor = decodeToken(refreshToken);
//   console.log("<<<<<<<check refresh_token_infor", refresh_token_infor);
//   console.log(
//     pathname,
//     onlyPassedAuthPaths.some((path) => pathname.startsWith(path))
//   );

//   // 1. Chưa đăng nhập thì không cho vào private paths
//   if (
//     !refresh_token_infor &&
//     onlyPassedAuthPaths.some((path) => pathname.startsWith(path))
//   ) {
//     console.log(refresh_token_infor);

//     const url = new URL("/login", request.url);
//     return NextResponse.redirect(url);
//   }

//   // 2. Trường hợp đã đăng nhập
//   if (refresh_token_infor) {
//     // 2.1 Nếu cố tình vào trang login sẽ redirect về trang chủ
//     if (onlyUnAuthPaths.some((path) => pathname.startsWith(path))) {
//       return NextResponse.redirect(new URL("/", request.url));
//     }

//     // 2.2 Nhưng access token lại hết hạn
//     // if (
//     //   onlyPassedAuthPaths.some((path) => pathname.startsWith(path)) &&
//     //   !access_token_infor
//     // ) {
//     //   const url = new URL("/refresh-token", request.url);
//     //   url.searchParams.set("refreshToken", refreshToken!);
//     //   url.searchParams.set("redirect", pathname);
//     //   return NextResponse.redirect(url);
//     // }

//     // 2.3 Vào không đúng role, redirect về trang chủ
//     // const role = decodeToken(accessToken);

//     // Guest nhưng cố vào route owner
//     // const isGuestGoToManagePath =
//     //   role === Role.Guest &&
//     //   managePaths.some((path) => pathname.startsWith(path));
//     // // Không phải Guest nhưng cố vào route guest
//     // const isNotGuestGoToGuestPath =
//     //   role !== Role.Guest &&
//     //   guestPaths.some((path) => pathname.startsWith(path));
//     // if (isGuestGoToManagePath || isNotGuestGoToGuestPath) {
//     //   return NextResponse.redirect(new URL("/", request.url));
//     // }

//     return NextResponse.next();
//   }
// }

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: ["/manage/:path*", "/:path*", "/login"],
// };
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {}

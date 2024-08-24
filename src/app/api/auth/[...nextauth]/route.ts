import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  secret: process.env.NO_SECRET, // Sử dụng giá trị bí mật mạnh
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/login",

    error: "/",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

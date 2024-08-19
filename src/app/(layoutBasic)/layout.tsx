import type { Metadata } from "next";
import LayOutClient from "../partial/layoutClient/LayoutClient";

export const metadata: Metadata = {
  title: "Trang chủ",
  description: "Trang chủ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <LayOutClient>{children}</LayOutClient>
    </>
  );
}

import "./globals.css";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { ThemeProvider } from "./theme-provider";
import WrapperNextAuth from "@/lib/next.auth.wrapper";

export const metadata = {
  title: "My Project Next",
  description: "Perfect Dark Theme With Next.js and MUI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <InitColorSchemeScript defaultMode="system" />
        <ThemeProvider>
          <WrapperNextAuth>{children}</WrapperNextAuth>
        </ThemeProvider>
      </body>
    </html>
  );
}

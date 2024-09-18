import "./globals.css";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { ThemeProvider } from "./theme-provider";
import ContextApp from "@/context-app";

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
          <ContextApp>{children}</ContextApp>
        </ThemeProvider>
      </body>
    </html>
  );
}

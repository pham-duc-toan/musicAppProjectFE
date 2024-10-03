import "./globals.css";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { ThemeProvider } from "./theme-provider";
import ContextApp from "@/context-app";
import NextTopLoader from "nextjs-toploader";

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
        <NextTopLoader
          color="#8479F2"
          initialPosition={0.08}
          height={3}
          zIndex={9999}
          showSpinner={false}
        />
        <InitColorSchemeScript defaultMode="system" />

        <ThemeProvider>
          <ContextApp>{children}</ContextApp>
        </ThemeProvider>
      </body>
    </html>
  );
}

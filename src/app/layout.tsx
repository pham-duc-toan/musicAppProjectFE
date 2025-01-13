import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import InitColorSchemeScript from "@mui/system/InitColorSchemeScript";
import { ThemeProvider } from "./theme-provider";

export const metadata = {
  title: "My Project Next",
  description: "Perfect Dark Theme With Next.js and MUI",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Kiểm tra nếu `locale` không hợp lệ

  return (
    <html lang="vi" suppressHydrationWarning>
      <body>
        <NextTopLoader
          color="#8479F2"
          initialPosition={0.08}
          height={3}
          zIndex={9999}
          showSpinner={false}
        />
        <InitColorSchemeScript defaultMode="system" />

        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

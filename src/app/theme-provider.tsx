"use client";

import {
  experimental_extendTheme as extendTheme,
  Experimental_CssVarsProvider as CssVarsProvider,
} from "@mui/material/styles";
import { Titillium_Web } from "next/font/google";
import { Provider } from "react-redux";
import { store } from "@/store/store";
const font = Titillium_Web({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "900"],
});
const theme = extendTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 992,
      lg: 1200,
      xl: 1920,
    },
  },

  shape: {
    borderRadius: 10,
  },
  zIndex: {
    appBar: 1200,
    drawer: 1100,
  },
  typography: {
    fontFamily: font.style.fontFamily,
    button: {
      fontFamily: font.style.fontFamily,
    },
  },

  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#8479F2",
          contrastText: "#fff",
        },
        text: {
          primary: "#9A52A0",
        },
        secondary: {
          main: "#B2B4B8",
        },
        background: {
          default: "#ffffff",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: "#655BD3",

          contrastText: "#fff",
        },
        text: {
          primary: "#BF94BF",
        },
        secondary: {
          main: "#414140",
        },
        background: {
          default: "#6a0dad",
        },
      },
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
        },
        sizeSmall: {
          padding: "6px 16px",
        },
        sizeMedium: {
          padding: "8px 20px",
        },
        sizeLarge: {
          padding: "11px 24px",
        },
        textSizeSmall: {
          padding: "7px 12px",
        },
        textSizeMedium: {
          padding: "9px 16px",
        },
        textSizeLarge: {
          padding: "12px 16px",
        },
      },
    },

    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: "16px 24px",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "32px 24px",
          "&:last-child": {
            paddingBottom: "32px",
          },
        },
      },
    },

    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none",
          color: "#fff",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          boxSizing: "border-box",
        },
        html: {
          MozOsxFontSmoothing: "grayscale",
          WebkitFontSmoothing: "antialiased",
          display: "flex",
          flexDirection: "column",
          minHeight: "100%",
          width: "100%",
        },
        body: {
          display: "flex",
          flex: "1 1 auto",
          flexDirection: "column",
          minHeight: "100%",
          width: "100%",
        },

        "#__next": {
          display: "flex",
          flex: "1 1 auto",
          flexDirection: "column",
          height: "100%",
          width: "100%",
        },
      },
    },
  },
});

export default theme;

export function ThemeProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <CssVarsProvider defaultMode="system" theme={theme}>
        {children}
      </CssVarsProvider>
    </Provider>
  );
}

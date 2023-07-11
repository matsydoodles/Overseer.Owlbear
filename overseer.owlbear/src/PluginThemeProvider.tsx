import { Theme as MuiTheme, createTheme } from "@mui/material/styles";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import OBR, { Theme } from "@owlbear-rodeo/sdk";
import React from "react";
import { useEffect, useState } from "react";
import { pooPaletteColor } from "./PaletteColors/PooPaletteColor";
import { starPaletteColor } from "./PaletteColors/StarPaletteColor";

/**
 * Create a MUI theme based off of the current OBR theme
 */
function getTheme(theme?: Theme) {
  return createTheme({
    palette: theme
      ? {
          mode: theme.mode === "LIGHT" ? "light" : "dark",
          text: theme.text,
          primary: theme.primary,
          secondary: theme.secondary,
          background: theme.background, 
          poo: pooPaletteColor,
          star: starPaletteColor
        }
      : undefined,
    shape: {
      borderRadius: 16,
    },
    components: {
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
          style: {
            height: 22.750
          }
        },
      },
      MuiTypography: {
        variants: [
          {
          props: { variant:'h4' },
          style: {
            fontSize: 18,
            fontWeight: 700,
            lineHeight: 1.334,
            letterSpacing: 0,
            Margin: 0
          }, 
        },
        {
          props: { variant:'h5' },
          style: {
            fontSize: 16,
            fontWeight: 700,
            lineHeight: 1.334,
            letterSpacing: 0,
            Margin: 0
          },
        },
        {
          props: { variant:'h6' },
          style: {
            fontSize: 14,
            fontWeight: 700,
            lineHeight: 1.334,
            letterSpacing: 0,
            Margin: 0
          },
        },
      ],
    },
      MuiMenuItem: {
        defaultProps: {
          style: {
          maxHeight: 48 * 4.5 + 8,
          }
        }
      },
    },
  });
}

/**
 * Provide a MUI theme with the same palette as the parent OBR window
 */
export function PluginThemeProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [theme, setTheme] = useState<MuiTheme>(() => getTheme());
  // const [ready, setReady] = useState(false);
  
  // useEffect(() => {
  //   if (OBR.isAvailable) {
  //     console.log(`PluginThemeProvider isAvailable`, OBR.isAvailable, OBR.isReady);
  //     OBR.onReady(() => setReady(true));
  //   }
  // }, []);
  
  useEffect(() => {
    const updateTheme = (theme: Theme) => {
      //console.log('PluginThemeProvider updateTheme');
      setTheme(getTheme(theme));
    };
    OBR.theme.getTheme().then(updateTheme);
    return OBR.theme.onChange(updateTheme);
  }, []);
//  }, [ready]);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
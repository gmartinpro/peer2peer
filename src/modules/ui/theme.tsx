// import original module declarations
import React, { useContext } from "react";
import {
  createGlobalStyle,
  DefaultTheme,
  ThemeContext,
  ThemeProvider,
} from "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
    };
  }
}

// Export theme implementing interface
const theme: DefaultTheme = {
  colors: {
    primary: "#0a3d62",
    secondary: "#3c6382",
  },
};

export const GlobalStyle = createGlobalStyle`
  body {
    height: 100%;
    margin: 0;
  }
  html {
    height: 100%;
    scroll-behavior: smooth;
    font-family: sans-serif;
  }
  #root{
    height: auto;
  }
`;

// Provider
export const AppThemeProvider: React.FC = (props) => (
  <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
);

export function useAppTheme(): DefaultTheme {
  return useContext(ThemeContext);
}

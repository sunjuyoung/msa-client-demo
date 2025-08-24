import { createTheme } from "@mui/material/styles";
import { neutral, typography, spacing, breakpoints } from "./tokens";

export const muiTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#FFFFFF",
      paper: "#FFFFFF",
    },
    text: {
      primary: neutral[800],
      secondary: neutral[600],
    },
    divider: "rgba(0,0,0,0.06)",
    grey: neutral,
    primary: {
      main: neutral[900],
    },
  },
  typography: {
    fontFamily: typography.fontFamily,
  },
  spacing: spacing.unit,
  shape: {
    borderRadius: 4,
  },
  shadows: [
    "none",
    "0 1px 0 0 rgba(0,0,0,0.06)",
    "0 2px 8px rgba(0,0,0,0.12)",
    ...Array(22).fill("none"),
  ],
  breakpoints,
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          color: neutral[800],
          boxShadow: "0 1px 0 0 rgba(0,0,0,0.06)",
        },
      },
    },
  },
});

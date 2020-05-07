import { createMuiTheme } from "@material-ui/core/styles";
export default createMuiTheme({
  typography: {
    useNextVariants: true
  },

  palette: {
    common: {
      black: "#000",
      white: "#fff"
    },
    background: {
      paper: "#fff",
      default: "#fafafa"
    },
    primary: {
      light: "rgba(76, 125, 240, 1)",
      main: "rgba(61, 97, 179, 1)",
      dark: "rgba(46, 73, 133, 1)",
      contrastText: "#fff"
    },
    secondary: {
      light: "rgba(232, 163, 6, 1)",
      main: "rgba(212, 151, 14, 1)",
      dark: "rgba(167, 117, 3, 1)",
      contrastText: "#fff"
    },
    error: {
      light: "#e57373",
      main: "rgba(193, 9, 73, 1)",
      dark: "#d32f2f",
      contrastText: "#fff"
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)"
    }
  }
});

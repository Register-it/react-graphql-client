import { createMuiTheme } from "@material-ui/core/styles"

const theme = {
  palette: {
    primary: {
      main: "#333",
      contrastText: "#efefef"
    },
    secondary: {
      main: "#08c1ff",
      contrastText: "#ffffff"
    }
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          backgroundColor: "#ffffff"
        }
      }
    }
  }
}

export default createMuiTheme(theme)

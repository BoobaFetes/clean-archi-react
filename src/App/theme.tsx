import { createMuiTheme } from "@material-ui/core";

export default createMuiTheme({
  overrides: {
    MuiGrid: {
      "direction-xs-column": {
        height: "inherit",
      },
    },
  },
});

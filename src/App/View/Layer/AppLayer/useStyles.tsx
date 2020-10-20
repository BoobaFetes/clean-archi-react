import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  app: {
    height: "100%",
    "& .app-header": {
      height: 64,
      flex: "0 0 auto",
    },
    "& .app-body": {
      overflow: "auto",
      flex: "1 1 auto",
    },
  },
});

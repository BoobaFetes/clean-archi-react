import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  bodyLeft: {
    flex: "0 0 auto",
    width: "unset",
    minWidth: 300,
    border: "1px solid red",
  },
  bodyRight: {
    flex: "1 1 auto",
    width: "unset",
    border: "1px solid green",
  },
});

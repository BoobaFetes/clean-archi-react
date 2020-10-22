import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
  item: {
    "& > :first-child": {
      flex: "1 1 auto",
    },
    "& > :last-child": {
      flex: "0 0 auto",
    },
  },
});

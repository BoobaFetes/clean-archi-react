import { createStyles, Theme } from "@material-ui/core";

export const styles = ({ spacing }: Theme) =>
  createStyles({
    root: {
      padding: spacing(2),
    },
    buttonHolder: {
      flex: "1 1 auto",
      padding: spacing(1),
    },
  });

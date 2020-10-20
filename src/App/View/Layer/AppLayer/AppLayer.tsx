import React, { FC, ReactNode } from "react";
import { Grid } from "@material-ui/core";
import { useStyles } from "./useStyles";

interface AppLayerProps {
  header: ReactNode;
  body: ReactNode;
}
export const AppLayer: FC<AppLayerProps> = ({ header, body }) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.app} direction="column">
      <Grid item className="app-header">
        {header}
      </Grid>
      <Grid item container direction="row" className="app-body">
        {body}
      </Grid>
    </Grid>
  );
};

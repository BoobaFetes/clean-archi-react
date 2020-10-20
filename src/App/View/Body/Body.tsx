import { Grid } from "@material-ui/core";
import { useStyles } from "./useStyles";
import React, { FC, memo } from "react";
import { ConnectedPageCollection } from "App/View/Body/Page";
import { Route, Switch } from "react-router-dom";
import { ConnectedPage } from "App/View/Body/Page/Page/ConnectedPage";

export const Body: FC = memo(() => {
  const classes = useStyles();
  return (
    <>
      <Grid item container direction="column" className={classes.bodyLeft}>
        <ConnectedPageCollection />
      </Grid>
      <Grid item container direction="column" className={classes.bodyRight}>
        <Switch>
          <Route
            exact
            path="/page"
            render={(props) => <ConnectedPage {...props} />}
          />
          <Route
            exact
            path="/page/:id"
            render={(props) => <ConnectedPage {...props} />}
          />
          <Route path="/" render={() => "click on a page collection"} />
        </Switch>
      </Grid>
    </>
  );
});

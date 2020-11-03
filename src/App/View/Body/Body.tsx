import { Grid } from "@material-ui/core";
import { useStyles } from "./useStyles";
import React, { FC, memo } from "react";
import { PageCollection } from "App/View/Body/Page";
import { Route, Switch } from "react-router-dom";
import { PageWrappper } from "App/View/Body/Page";

export const Body: FC = memo(() => {
  const classes = useStyles();
  return (
    <>
      <Grid item container direction="column" className={classes.bodyLeft}>
        <PageCollection />
      </Grid>
      <Grid item container direction="column" className={classes.bodyRight}>
        <Switch>
          <Route
            exact
            path="/page"
            render={(props) => <PageWrappper {...props} />}
          />
          <Route
            exact
            path="/page/:id"
            render={(props) => <PageWrappper {...props} />}
          />
          <Route path="/" render={() => "click on a page collection"} />
        </Switch>
      </Grid>
    </>
  );
});

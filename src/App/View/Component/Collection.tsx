import { Grid } from "@material-ui/core";
import React, { FC, ReactNode } from "react";

interface Props {
  items: ReactNode[];
}
export const Collection: FC<Props> = ({ items }) => {
  return (
    <Grid item container direction="column" component="ul">
      {items.map((item, index) => (
        <Grid key={index} item container justify="center" component="li">
          {item}
        </Grid>
      ))}
    </Grid>
  );
};

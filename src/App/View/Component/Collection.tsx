import { Grid } from "@material-ui/core";
import React, { FC, ReactNode } from "react";

interface Props {
  items: ReactNode[];
}
export const Collection: FC<Props> = ({ items }) => {
  return (
    <Grid item container direction="column" component="section">
      {items.map((item, index) => (
        <Grid key={index} item container alignItems="center" component="article">
          {item}
        </Grid>
      ))}
    </Grid>
  );
};

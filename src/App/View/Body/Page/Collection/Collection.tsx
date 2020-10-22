import { Grid, IconButton } from "@material-ui/core";
import React, { FC, useEffect, useState, memo } from "react";
import { useStyles } from "./useStyles";
import { PageCollectionState } from "App/Model";
import { PageCollectionPresenter } from "App/Presenter";
import { Collection as ComponentCollection } from "App/View/Component";
import { Link } from "react-router-dom";
import { IPageEntity } from "Core/Entity/IPageEntity";
import { ItemCollectionObserver } from "Core/Observer";
import { Add, Edit, Delete } from "@material-ui/icons";

interface Props {
  items: IPageEntity[];
  onRemove?: ItemCollectionObserver<IPageEntity>;
}

export const Collection: FC<Props> = memo(({ items, onRemove }) => {
  const presenter = new PageCollectionPresenter(items);
  const [, setCollection] = useState<IPageEntity[]>(items);
  const classes = useStyles();

  useEffect(() => {
    function updateView(state: PageCollectionState) {
      setCollection(state.collection);
    }
    presenter.subscribeToChange(updateView);
    presenter.model.collection.subscribeToRemove(onRemove);
  }, [presenter, onRemove]);

  return (
    <>
      <Grid item container alignItems="center">
        <Grid item>
          <Link to="/page?create">
            <IconButton>
              <Add />
            </IconButton>
          </Link>
        </Grid>
        <Grid item>Collection of pages</Grid>
      </Grid>

      <ComponentCollection
        items={presenter.model.collection.map((item, index) => (
          <Grid
            key={item.id}
            item
            container
            justify="space-between"
            alignItems="center"
            className={classes.item}
          >
            <Grid item>
              <input type="hidden" value={item.id} />
              <Link key={index} to={`/page/${item.id}`}>
                {item.name}
              </Link>
            </Grid>
            <Grid item>
              <Link key={index} to={`/page/${item.id}?edit`}>
                <IconButton>
                  <Edit />
                </IconButton>
              </Link>
              <IconButton
                onClick={() => presenter.model.collection.Remove(item)}
              >
                <Delete />
              </IconButton>
            </Grid>
          </Grid>
        ))}
      />
    </>
  );
});

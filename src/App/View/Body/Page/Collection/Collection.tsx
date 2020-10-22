import {
  Grid,
  IconButton,
  withStyles,
  WithStyles,
  useTheme,
} from "@material-ui/core";
import React, { PureComponent, FC, useEffect, useState, memo } from "react";
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
        <Grid item>
          Collection of pages
        </Grid>
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

// type Props_ = Props & WithStyles<typeof styles>;
// class CollectionClass extends PureComponent<Props_, PageCollectionState> {
//   private presenter: PageCollectionPresenter;
//   constructor(props: Props_) {
//     super(props);
//     this.presenter = new PageCollectionPresenter(props.items);
//   }

//   public componentDidMount() {
//     this.presenter.subscribeToChange(this.updateView);
//     this.presenter.model.collection.subscribeToRemove(this.props.onRemove);
//   }

//   public componentDidUpdate(
//     prevProps: Readonly<Props>,
//     prevState: Readonly<PageCollectionState>
//   ) {
//     const observers = this.presenter.model.unSubscribeToChangeAll();
//     for (const item of this.props.items) {
//       if (this.presenter.model.collection.includes(item)) continue;
//       this.presenter.model.collection.Add(item);
//     }
//     this.presenter.model.subscribeToChangeAll(observers);
//     this.presenter.model.notifyChange();
//   }

//   public componentWillUnmount() {
//     this.presenter.unSubscribeToChange(this.updateView);
//     this.presenter.model.collection.unSubscribeToRemove(this.props.onRemove);
//   }

//   private updateView: ChangeObserver<PageCollectionState> = (state) => {
//     this.setState({ collection: state.collection || [] });
//   };

//   public render() {
//     // const { classes } = this.props;
//     return (
//       <>
//         <Link to="/page?create">
//           <IconButton>
//             <Add />
//           </IconButton>
//         </Link>
//         <ComponentCollection
//           items={this.presenter.model.collection.map((item, index) => (
//             <Grid
//               key={item.id}
//               item
//               container
//               justify="space-between"
//               alignItems="center"
//             >
//               <input type="hidden" value={item.id} />
//               <Link key={index} to={`/page/${item.id}`}>
//                 {item.name}
//               </Link>
//               <Link key={index} to={`/page/${item.id}?edit`}>
//                 <IconButton>
//                   <Edit />
//                 </IconButton>
//               </Link>
//             </Grid>
//           ))}
//         />
//       </>
//     );
//   }
// }

// export const Collection_ = withStyles(styles)(CollectionClass);

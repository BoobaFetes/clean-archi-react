import { Grid, IconButton, withStyles, WithStyles } from "@material-ui/core";
import React, { PureComponent } from "react";
import { styles } from "./styles";
import { PageCollectionViewState } from "App/ViewModel";
import { PageCollectionPresenter } from "App/Presenter";
import { Collection as ComponentCollection } from "App/View/Component";
import { Link } from "react-router-dom";
import { IPageEntity } from "Core/Entity/IPageEntity";
import { ItemCollectionObserver } from "Core/Observer";
import { ChangeObserver } from "App/ViewModel";
import { Add, Edit } from "@material-ui/icons";

interface Props extends WithStyles<typeof styles> {
  items: IPageEntity[];
  onRemove?: ItemCollectionObserver<IPageEntity>;
}

class CollectionClass extends PureComponent<Props, PageCollectionViewState> {
  private presenter: PageCollectionPresenter;
  constructor(props: Props) {
    super(props);
    this.presenter = new PageCollectionPresenter(props.items);
  }

  public componentDidMount() {
    this.presenter.subscribeToChange(this.updateView);
    this.presenter.model.collection.subscribeToRemove(this.props.onRemove);
  }

  public componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<PageCollectionViewState>
  ) {
    this.presenter.model.unSubscribeToChangeAll();
    for (const item of this.props.items) {
      if (this.presenter.model.collection.includes(item)) continue;
      this.presenter.model.collection.Add(item);
    }
    this.presenter.model.subscribeToChangeAll();
    this.presenter.model.notifyChange();
  }

  public componentWillUnmount() {
    this.presenter.unSubscribeToChange(this.updateView);
    this.presenter.model.collection.unSubscribeToRemove(this.props.onRemove);
  }

  private updateView: ChangeObserver<PageCollectionViewState> = (state) => {
    this.setState({ collection: state.collection || [] });
  };

  public render() {
    const { classes } = this.props;
    return (
      <>
        <Link to="/page?create">
          <IconButton>
            <Add />
          </IconButton>
        </Link>
        <ComponentCollection
          items={this.presenter.model.collection.map((item, index) => (
            <Grid
              key={item.id}
              item
              container
              justify="space-between"
              alignItems="center"
            >
              <input type="hidden" value={item.id} />
              <Link key={index} to={`/page/${item.id}`}>
                {item.name}
              </Link>
              <Link key={index} to={`/page/${item.id}?edit`}>
                <IconButton>
                  <Edit />
                </IconButton>
              </Link>
            </Grid>
          ))}
        />
      </>
    );
  }
}

export const Collection = withStyles(styles)(CollectionClass);

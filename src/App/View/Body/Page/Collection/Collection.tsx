import {
  Grid,
  IconButton,
  LinearProgress,
  withStyles,
  WithStyles,
} from "@material-ui/core";
import React, { PureComponent } from "react";
import { styles } from "./styles";
import { Collection as ComponentCollection } from "App/View/Component";
import { Link } from "react-router-dom";
import { Add, Edit, Delete } from "@material-ui/icons";
import { PageCollectionState } from "./PageCollectionModel";
import { Presenter } from "./Presenter";
import { DataVizPageStore } from "App/Infra";

// simulate the dependancy injection
const pageStore = new DataVizPageStore();

type Props = WithStyles<typeof styles>;

class CollectionClass extends PureComponent<Props, PageCollectionState> {
  private presenter: Presenter;

  constructor(props: Props) {
    super(props);
    this.presenter = new Presenter(pageStore);
  }

  public componentDidMount() {
    this.presenter.viewUpdater = (state) => {
      this.setState({ ...state });
    };
    this.presenter.setModel({ items: [] });
    this.presenter.query();
  }

  public componentWillUnmount() {
    this.presenter.destroy();
  }

  public render() {
    return (
      <>
        <Link to="/page?create">
          <IconButton>
            <Add />
          </IconButton>
        </Link>
        {this.presenter.model.loading && <LinearProgress />}
        <ComponentCollection
          items={this.presenter.model.collection.list.map((item, index) => (
            <Grid
              key={item.id || index}
              item
              container
              justify="space-between"
              alignItems="center"
            >
              <input type="hidden" value={item.id as string} />
              <Link to={`/page/${item.id}`}>{item.name}</Link>

              <Grid item>
                <Link to={`/page/${item.id}?edit`}>
                  <IconButton>
                    <Edit />
                  </IconButton>
                </Link>{" "}
                <IconButton onClick={() => this.presenter.remove(item)}>
                  <Delete />
                </IconButton>
              </Grid>
            </Grid>
          ))}
        />
      </>
    );
  }
}

export const Collection = withStyles(styles)(CollectionClass);

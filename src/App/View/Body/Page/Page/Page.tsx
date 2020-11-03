import { Field } from "App/View/Component";
import React, { ComponentType, PureComponent } from "react";
import {
  Grid,
  LinearProgress,
  WithStyles,
  withStyles,
} from "@material-ui/core";
import { PagePresenter } from "./PagePresenter";
import { nsEntity } from "Core/Entity";
import { EditionMode } from "Core/UseCase";
import { DataVizPageStore } from "App/Infra";
import { styles } from "./styles";
import { RouteAdapter } from "App/Infra/Adapters";
import { PageState } from "./PageModel";
import { nsObserver } from "Core/Observer";

// simulate the dependancy injection
const pageStore = new DataVizPageStore();

export type PageProps = nsEntity.IPageEntity & {
  mode: EditionMode;
  route: RouteAdapter;
  isLoading?: boolean;
};

type Props = PageProps & WithStyles<typeof styles>;
class PageClass extends PureComponent<Props, PageState> {
  private presenter: PagePresenter;

  constructor(props: Props) {
    super(props);
    this.presenter = new PagePresenter(pageStore, props.route);
    this.presenter.bind(this.props, this.viewUpdater);
  }

  public componentDidUpdate(prevProps: Readonly<Props>) {
    this.presenter.setModel(this.props);
  }

  public componentWillUnmount() {
    this.presenter.destroy();
  }

  private viewUpdater: nsObserver.StateObserver<PageState> = (state) => {
    this.setState({ ...state });
  };

  public render() {
    const { classes } = this.props;
    return (
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (await this.presenter.save()) {
            this.presenter.route.navigate("/");
          }
        }}
      >
        <Grid item container direction="column" className={classes.root}>
          <Grid item container>
            {this.presenter.model.isLoading && <LinearProgress />}
            <Field
              fullWidth
              label="edition mode"
              value={EditionMode[this.presenter.model.mode || EditionMode.None]}
            />
            <Field fullWidth label="id" value={this.presenter.model.id} />
            <Field
              fullWidth
              label="date de création"
              value={this.presenter.model.created || ""}
            />
          </Grid>
          <Grid item container>
            <Field
              fullWidth
              label="nom de la page"
              edit={!!this.presenter.model.mode}
              value={this.presenter.model.name}
              onChange={(e) => (this.presenter.model.name = e.target.value)}
              error={this.presenter.model.errors.name}
            />
          </Grid>
          <Grid
            item
            container
            justify="flex-end"
            alignItems="flex-end"
            className={classes.buttonHolder}
            spacing={1}
          >
            <Grid item>
              <input
                type="button"
                value="Cancel"
                onClick={this.presenter.route.back}
              />
            </Grid>
            <Grid item>
              <input type="submit" value="Apply" />
            </Grid>
          </Grid>
        </Grid>
      </form>
    );
  }
}

export const Page = withStyles(styles)(PageClass) as ComponentType<PageProps>;

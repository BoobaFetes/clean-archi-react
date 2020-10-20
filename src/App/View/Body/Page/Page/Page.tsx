import { Field } from "App/View/Component";
import React, { PureComponent } from "react";
import { PageViewModel, PageViewState } from "App/ViewModel";
import { PagePresenter } from "App/Presenter";
import { Grid, WithStyles, withStyles } from "@material-ui/core";
import { styles } from "./styles";
import { IPageEntity } from "Core/Entity/IPageEntity";
import { EditionMode } from "App/ViewModel/PageViewModel";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { ChangeObserver } from "Core/Observer";

export type PageRouteProps = RouteComponentProps<{
  id?: string;
  edit?: string;
  create?: string;
}>;
export interface PageProps extends Partial<PageViewState>, PageRouteProps {
  onUpsert?(item: IPageEntity): void;
  onAdd?(item: IPageEntity): void;
}

type Props = PageProps & WithStyles<typeof styles>;
class PageClass extends PureComponent<Props, PageViewState> {
  private presenter: PagePresenter;
  constructor(props: Props) {
    super(props);
    this.presenter = new PagePresenter(props);
  }

  public componentDidMount() {
    this.presenter.subscribeToChange(this.updateView);
    this.presenter.onSaved = this.onSaved;
  }

  public componentWillUnmount() {
    this.presenter.unSubscribeToChangeAll();
    this.presenter.onSaved = undefined;
  }

  private updateView: ChangeObserver<PageViewState> = (state) =>
    this.setState({ ...state });

  private onSaved: ChangeObserver<PageViewState> = (state) => {
    const entity = {
      ...state,
    };
    switch (this.presenter.model.mode) {
      case EditionMode.Create:
        this.onAdd(entity);
        break;
      case EditionMode.Edit:
        this.onUpsert(entity);
        break;

      default:
        break;
    }
  };
  private onAdd(entity: IPageEntity) {
    if (!this.props.onAdd) return;
    this.props.onAdd(entity);
  }
  private onUpsert(entity: IPageEntity) {
    if (!this.props.onUpsert) return;
    this.props.onUpsert(entity);
  }

  public render() {
    const { classes } = this.props;
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          this.presenter.save();
          this.goToMainPageOrGoBack();
        }}
      >
        <Grid item container direction="column" className={classes.root}>
          <Grid item container>
            <Field
              fullWidth
              label="edition mode"
              value={EditionMode[this.presenter.model.mode || EditionMode.None]}
            />
            <Field fullWidth label="id" value={this.presenter.model.id} />
            <Field
              fullWidth
              label="date de création"
              value={this.presenter.model.created?.toISOString() || ""}
            />
          </Grid>
          <Grid item container>
            <Field
              fullWidth
              label="nom de la page"
              edit={!!this.presenter.model.mode}
              value={this.presenter.model.name}
              onChange={(e) => (this.presenter.model.name = e.target.value)}
              error={this.presenter.model.error.name}
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
                onClick={this.goToMainPageOrGoBack}
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

  private goToMainPageOrGoBack() {
    const { history } = this.props;
    if (history.length === 0) history.push("/");
    else history.goBack();
  }
}
export const Page = withRouter(withStyles(styles)(PageClass));

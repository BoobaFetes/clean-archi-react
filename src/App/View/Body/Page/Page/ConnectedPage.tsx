import { PageAction } from "App/Store";
import { Page, PageProps, PageRouteProps } from "App/View/Body/Page/Page/Page";
import { IPageEntity } from "Core/Entity/IPageEntity";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Dispatch } from "redux";
import { parse as qsParse, ParsedQuery } from "query-string";
import { EditionMode } from "App/ViewModel/PageViewModel";
import { ComponentType } from "react";

type QueryStringParams = {
  edit?: boolean;
  create?: boolean;
};

const mapStateToProps = (state: IPageEntity[], ownProps: PageProps) => {
  const queryString: QueryStringParams = qsParse(ownProps.location.search, {
    parseBooleans: true,
  });

  return {
    mode:
      queryString.create === null
        ? EditionMode.Create
        : queryString.edit === null
        ? EditionMode.Edit
        : undefined,
    ...(state.find((item) => item.id === ownProps.match.params.id) || {}),
  };
};

const mapDispatchToProps = (dispatch: Dispatch<PageAction>) => {
  return {
    onUpsert: (payload: IPageEntity) => dispatch({ type: "UPSERT", payload }),
    onAdd: (payload: IPageEntity) => dispatch({ type: "ADD", payload }),
  };
};
export const ConnectedPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Page) as ComponentType<PageRouteProps>;

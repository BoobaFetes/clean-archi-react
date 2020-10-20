import { connect } from "react-redux";
import { Collection } from "./Collection";
import { IPageEntity } from "Core/Entity";
import { PageAction } from "App/Store";
import { Dispatch } from "react";

const mapStateToProps = (state: IPageEntity[]) => {
  return {
    items: state,
  };
};
const mapDispatchToProps = (dispatch: Dispatch<PageAction>) => {
  return {
    onRemove: (payload: IPageEntity) => dispatch({ type: "REMOVE", payload }),
  };
};

export const ConnectedCollection = connect(
  mapStateToProps,
  mapDispatchToProps
)(Collection);

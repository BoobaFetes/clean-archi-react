import React, { FC } from "react";
import { Page } from "./Page";
import { parse } from "query-string";
import { RouteComponentProps } from "react-router-dom";
import { DataVizPageStore } from "App/Infra";
import { nsEntity } from "Core/Entity";
import { EditionMode } from "Core/UseCase";
import { RouteAdapter } from "App/Infra/Adapters";

export declare namespace nsPageWrapper {
  export type QueryString = {
    edit?: null;
    create?: null;
  };
  export type Props = RouteComponentProps<{
    id?: string;
  }>;
}

export const PageWrappper: FC<nsPageWrapper.Props> = (props) => {
  const queryString: nsPageWrapper.QueryString = parse(props.location.search, {
    parseBooleans: true,
  });

  const store = new DataVizPageStore();
  const result = store.single(props.match.params.id);

  const item = result.data || ({} as nsEntity.IPageEntity);
  const route = new RouteAdapter(props);

  return (
    <Page
      {...item}
      mode={
        queryString.create === null
          ? EditionMode.Create
          : queryString.edit === null
          ? EditionMode.Edit
          : EditionMode.None
      }
      route={route}
    />
  );
};

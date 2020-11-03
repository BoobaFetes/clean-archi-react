import { nsEntity } from "Core/Entity";
export { DataVizPageStore } from "./DataVizPageStore";
export { DataVizStore } from "./DataVizStore";

export enum StateKey {
  page = "page",
  section = "section",
  widget = "widget",
}

export declare namespace nsDataViz {
  export type ActionTargetName =
    | StateKey.page
    | StateKey.section
    | StateKey.widget;

  export type ActionTarget<T = ActionTargetName> = { target: T };

  export type ActionQueryAll<
    T extends ActionTargetName,
    TEntity extends nsEntity.IEntity
  > = ActionTarget<T> & {
    type: "queryAll";
    payload: TEntity[];
  };

  export type ActionQuerySingle<
    T extends ActionTargetName,
    TEntity extends nsEntity.IEntity
  > = ActionTarget<T> & {
    type: "querySingle";
    payload: TEntity;
  };

  export type ActionCommandInsert<
    T extends ActionTargetName,
    TEntity extends nsEntity.IEntity
  > = ActionTarget<T> & {
    type: "commandInsert";
    payload: TEntity;
  };

  export type ActionCommandUpdate<
    T extends ActionTargetName,
    TEntity extends nsEntity.IEntity
  > = ActionTarget<T> & {
    type: "commandUpdate";
    payload: TEntity;
  };

  export type ActionCommandRemove<
    T extends ActionTargetName,
    TEntity extends nsEntity.IEntity
  > = ActionTarget<T> & {
    type: "commandRemove";
    payload: TEntity;
  };

  export type PageActions =
    | ActionQueryAll<StateKey.page, nsEntity.IPageEntity>
    | ActionQuerySingle<StateKey.page, nsEntity.IPageEntity>
    | ActionCommandInsert<StateKey.page, nsEntity.IPageEntity>
    | ActionCommandUpdate<StateKey.page, nsEntity.IPageEntity>
    | ActionCommandRemove<StateKey.page, nsEntity.IPageEntity>;

  export type SectionActions =
    | ActionQueryAll<StateKey.section, nsEntity.IPageEntity>
    | ActionQuerySingle<StateKey.section, nsEntity.IPageEntity>
    | ActionCommandInsert<StateKey.section, nsEntity.ISectionEntity>
    | ActionCommandUpdate<StateKey.section, nsEntity.ISectionEntity>
    | ActionCommandRemove<StateKey.section, nsEntity.IPageEntity>;

  export type WidgetActions =
    | ActionQueryAll<StateKey.widget, nsEntity.IPageEntity>
    | ActionQuerySingle<StateKey.widget, nsEntity.IPageEntity>
    | ActionCommandInsert<StateKey.widget, nsEntity.IWidgetEntity>
    | ActionCommandUpdate<StateKey.widget, nsEntity.IWidgetEntity>
    | ActionCommandRemove<StateKey.widget, nsEntity.IPageEntity>;
}

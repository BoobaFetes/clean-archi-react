import { nsEntity } from "Core/Entity";
import { StateKey } from ".";
import { createStore } from "redux";
import { DataVizReducer } from "./DataVizReducer";

export const DataVizStore = createStore(DataVizReducer);

export type DataVizState = {
  [StateKey.page]: nsEntity.IPageEntity[];
  [StateKey.section]: nsEntity.ISectionEntity[];
  [StateKey.widget]: nsEntity.IWidgetEntity[];
};

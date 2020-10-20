import { IPageEntity } from "Core/Entity";

export type Action = {
  type: "ADD" | "REMOVE" | "UPSERT";
  payload: IPageEntity;
};

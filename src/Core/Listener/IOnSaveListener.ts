import { IModel } from "App/Model";

export interface IOnSaveListener<T> {
  onSaved?(item: T): void;
  save(): void;
}

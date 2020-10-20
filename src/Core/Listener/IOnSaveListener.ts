import { IViewModel } from "App/ViewModel";

export interface IOnSaveListener<T> {
  onSaved?(item: T): void;
  save(): void;
}

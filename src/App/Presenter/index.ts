import { ModelBase } from "App/Model";
import { nsObserver } from "Core/Observer";

export interface IPresenter<T extends ModelBase<TState>, TState extends {}> {
  model: T;
  viewUpdater: nsObserver.Observer | undefined;
  setModel(model: Partial<T>): void;
  destroy(): void;
}

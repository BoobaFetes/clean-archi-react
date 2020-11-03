import { ModelBase } from "App/Model";
import { nsObserver } from "Core/Observer";

export interface IPresenter<
  TModel extends ModelBase<TState>,
  TState extends {}
> {
  model: TModel;
  bind(
    state: Partial<TState>,
    viewUpdater?: nsObserver.StateObserver<TState>
  ): void;
}

export { PresenterBase } from "./PresenterBase";

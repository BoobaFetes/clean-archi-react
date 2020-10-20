import { IChangeSubscription } from "Core/Observer/IChangeSubscription";

export interface IPresenter<TModel, TState>
  extends IChangeSubscription<TState> {
  model: TModel;
}

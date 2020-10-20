import { IViewModel, ViewState } from "App/ViewModel";
import { IChangeSubscription } from "Core/Observer/IChangeSubscription";

export interface IPresenter<T extends IViewModel<any>>
  extends IChangeSubscription<Omit<T, keyof IViewModel<T>>> {
  model: T;
}

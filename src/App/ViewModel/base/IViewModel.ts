import { IChangeSubscription } from "Core/Observer/IChangeSubscription";

export interface IViewModel<TViewState>
  extends IChangeSubscription<TViewState> {
  notifyChange(item: TViewState): void;
}

import { IChangeSubscription } from "Core/Observer/IChangeSubscription";

export interface IModel<TState> extends IChangeSubscription<TState> {
  notifyChange(item: TState): void;
}

import {
  IChangeSubscription,
  ChangeObserver as ChangeObserverBase,
} from "Core/Observer/IChangeSubscription";

type UnwantedMember<T> = keyof IChangeSubscription<T> | "notifyChange";
export type ViewState<T> = Omit<T, UnwantedMember<T>>;
export type ChangeObserver<T> = ChangeObserverBase<Omit<T, UnwantedMember<T>>>;
export interface IViewModel<T> extends IChangeSubscription<ViewState<T>> {
  notifyChange(item: ViewState<T>): void;
}

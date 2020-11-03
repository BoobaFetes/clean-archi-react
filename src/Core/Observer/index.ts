export { ObservableCollection } from "./ObservableCollection";

export declare namespace nsObserver {
  export type Observer = () => void;
  export type StateObserver<T> = (state: T) => void;
  export type UnSubscribe = () => void;
  export interface IChangeSubscription {
    subscribeToChange(observer: Observer): UnSubscribe;
    notifyChange(): void;
  }

  export interface ISetSubscription {
    subscribeToSet(observer: Observer): UnSubscribe;
  }

  export interface IAddSubscription {
    subscribeToAdd(observer: Observer): UnSubscribe;
  }

  export interface IRemoveSubscription {
    subscribeToRemove(observer: Observer): UnSubscribe;
  }
}

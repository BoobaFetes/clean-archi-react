import { ItemCollectionObserver } from "Core/Observer";

export interface IRemoveSubscription<T> {
  subscribeToRemove(observer: ItemCollectionObserver<T> | undefined): void;
  unSubscribeToRemove(observer: ItemCollectionObserver<T> | undefined): void;
}

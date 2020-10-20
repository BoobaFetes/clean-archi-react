import { ItemCollectionObserver } from "Core/Observer";

export interface IAddSubscription<T> {
  subscribeToAdd(observer: ItemCollectionObserver<T> | undefined): void;
  unSubscribeToAdd(observer: ItemCollectionObserver<T> | undefined): void;
}

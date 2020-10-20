import { EmptyCollectionObserver } from "Core/Observer";

export interface IClearSubscription<T> {
  subscribeToClear(observer: EmptyCollectionObserver): void;
  unSubscribeToClear(observer: EmptyCollectionObserver): void;
}

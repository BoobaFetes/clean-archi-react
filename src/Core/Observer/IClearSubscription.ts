import { EmptyCollectionObserver } from "Core/Observer";

export interface IClearSubscription {
  subscribeToClear(observer: EmptyCollectionObserver): void;
  unSubscribeToClear(observer: EmptyCollectionObserver): void;
}

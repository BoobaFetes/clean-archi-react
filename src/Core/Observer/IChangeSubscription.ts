export type ChangeObserver<T> = (
  item: Omit<T, keyof IChangeSubscription<T>>
) => void;

export interface IChangeSubscription<T> {
  subscribeToChange(observer: ChangeObserver<T>): void;
  unSubscribeToChange(observer: ChangeObserver<T>): void;
  subscribeToChangeAll(observers: Array<ChangeObserver<T>>): void;
  unSubscribeToChangeAll(): Array<ChangeObserver<T>>;
}

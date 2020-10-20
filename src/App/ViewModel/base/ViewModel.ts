import { ChangeObserver, IViewModel, ViewState } from "./IViewModel";

export abstract class ViewModel<TModel> implements IViewModel<TModel> {
  private observers = new Set<ChangeObserver<TModel>>();

  public subscribeToChange(observer: ChangeObserver<TModel>): void {
    this.observers.add(observer);
  }

  public unSubscribeToChange(
    observer: ChangeObserver<TModel>
  ): ChangeObserver<TModel> {
    if (this.observers.has(observer)) {
      this.observers.delete(observer);
    }
    return observer;
  }

  public subscribeToChangeAll(observers: ChangeObserver<TModel>[]): void {
    observers.forEach((observer) => this.observers.add(observer));
  }

  public unSubscribeToChangeAll(): ChangeObserver<TModel>[] {
    const returns = this.observers;
    this.observers = new Set<ChangeObserver<TModel>>();
    return Array.from(returns);
  }

  public notifyChange(): void {
    for (const observer of this.observers) {
      observer(this.setChange(this));
    }
  }
  protected abstract setChange(item: ViewModel<TModel>): ViewState<TModel>;
}

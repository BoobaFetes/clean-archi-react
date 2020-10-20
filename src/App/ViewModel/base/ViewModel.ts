import { ChangeObserver } from "Core/Observer/IChangeSubscription";
import { IViewModel } from "./IViewModel";

export abstract class ViewModel<TViewState> implements IViewModel<TViewState> {
  private observers = new Set<ChangeObserver<TViewState>>();

  public subscribeToChange(observer: ChangeObserver<TViewState>): void {
    this.observers.add(observer);
  }

  public unSubscribeToChange(
    observer: ChangeObserver<TViewState>
  ): ChangeObserver<TViewState> {
    if (this.observers.has(observer)) {
      this.observers.delete(observer);
    }
    return observer;
  }

  public subscribeToChangeAll(observers: ChangeObserver<TViewState>[]): void {
    observers.forEach((observer) => this.observers.add(observer));
  }

  public unSubscribeToChangeAll(): ChangeObserver<TViewState>[] {
    const returns = this.observers;
    this.observers = new Set<ChangeObserver<TViewState>>();
    return Array.from(returns);
  }

  public notifyChange(): void {
    for (const observer of this.observers) {
      observer(this.stateNotifiedOnChange(this));
    }
  }
  protected abstract stateNotifiedOnChange(
    model: ViewModel<TViewState>
  ): TViewState;
}

import { ChangeObserver } from "Core/Observer/IChangeSubscription";
import { IModel } from "./IModel";

export abstract class ModelBase<TState> implements IModel<TState> {
  private observers = new Set<ChangeObserver<TState>>();

  public subscribeToChange(observer: ChangeObserver<TState>): void {
    this.observers.add(observer);
  }

  public unSubscribeToChange(
    observer: ChangeObserver<TState>
  ): ChangeObserver<TState> {
    if (this.observers.has(observer)) {
      this.observers.delete(observer);
    }
    return observer;
  }

  public subscribeToChangeAll(observers: ChangeObserver<TState>[]): void {
    observers.forEach((observer) => this.observers.add(observer));
  }

  public unSubscribeToChangeAll(): ChangeObserver<TState>[] {
    const returns = this.observers;
    this.observers = new Set<ChangeObserver<TState>>();
    return Array.from(returns);
  }

  public notifyChange(): void {
    for (const observer of this.observers) {
      observer(this.stateNotifiedOnChange(this));
    }
  }
  protected abstract stateNotifiedOnChange(model: IModel<TState>): TState;
}

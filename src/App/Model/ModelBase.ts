import { nsObserver } from "Core/Observer";

export abstract class ModelBase<TState>
  implements nsObserver.IChangeSubscription {
  protected abstract getState(): TState;
  private observers = new Set<nsObserver.StateObserver<TState>>();

  public subscribeToChange(
    observer: nsObserver.StateObserver<TState>
  ): nsObserver.UnSubscribe {
    this.observers.add(observer);
    return () => this.observers.delete(observer);
  }

  public notifyChange(): void {
    for (const observer of this.observers) {
      observer(this.getState());
    }
  }
}

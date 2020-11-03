import { nsObserver } from "Core/Observer";

export abstract class ModelBase<TState>
  implements nsObserver.IChangeSubscription {
  private observers = new Set<nsObserver.Observer>();

  public subscribeToChange(
    observer: nsObserver.Observer
  ): nsObserver.UnSubscribe {
    this.observers.add(observer);
    return () => this.observers.delete(observer);
  }

  public notifyChange(): void {
    for (const observer of this.observers) {
      observer(this.notifyArgument());
    }
  }

  protected abstract notifyArgument(): TState;
}

import { ModelBase } from "App/Model";
import { IPresenter } from "App/Presenter";
import { nsObserver } from "Core/Observer";

export abstract class PresenterBase<
  TModel extends ModelBase<TState>,
  TState extends {}
> implements IPresenter<TModel, TState> {
  public abstract model: TModel;
  protected viewUpdater?: nsObserver.StateObserver<TState>;
  public abstract bind(
    state: Partial<TState>,
    viewUpdater?: nsObserver.StateObserver<TState>
  ): void;

  protected subscribeToChange = () => {
    const viewUpdater = this.viewUpdater;
    if (viewUpdater) {
      this.addSubscriptionFor(
        "model",
        this.model.subscribeToChange(viewUpdater)
      );
    }
  };
  protected unsubscribeToChange() {
    const unsubscription = this.unsubscriptions["model"];
    if (unsubscription) {
      unsubscription();
      delete this.unsubscriptions["model"];
    }
  }

  private unsubscriptions: Record<string, nsObserver.Observer> = {};
  protected addSubscriptionFor(name: string, observer: nsObserver.UnSubscribe) {
    if (!observer) {
      return;
    }
    this.unsubscriptions[name] = observer;
  }
  protected clearSubscriptions() {
    for (const name in this.unsubscriptions) {
      this.unsubscriptions[name]();
    }
    this.unsubscriptions = {};
  }

  public destroy(): void {
    this.clearSubscriptions();
  }
}

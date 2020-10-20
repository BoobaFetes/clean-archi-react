import {
  EmptyCollectionObserver,
  IAddSubscription,
  IClearSubscription,
  IRemoveSubscription,
  ItemCollectionObserver,
} from "Core/Observer";

export class ObservableCollection<T>
  extends Array<T>
  implements IAddSubscription<T>, IRemoveSubscription<T>, IClearSubscription {
  public added: T[] = [];
  public removed: T[] = [];

  private observersAdd = new Set<ItemCollectionObserver<T>>();
  private observersRemove = new Set<ItemCollectionObserver<T>>();
  private observersClear = new Set<EmptyCollectionObserver>();

  public update(items: T[]) {
    const toRemove = this.filter((i) => !items.includes(i));
    toRemove.forEach((item) => this.Remove(item));

    const toAdd = items.filter((i) => !this.includes(i));
    toAdd.forEach((item) => this.Add(item));
  }

  public Add(item: T) {
    this.add(item);
    this.notifyAdd(item);
  }
  private add(item: T) {
    this.push(item);
    this.added.push(item);
    this.delete(this.removed, item);
  }

  public Remove(item: T) {
    this.remove(item);
    this.notifyRemove(item);
  }
  private remove(item: T) {
    this.delete(this, item);
    this.delete(this.added, item);
    this.removed.push(item);
  }
  private delete(array: T[], item: T) {
    const index = array.indexOf(item);
    if (index >= 0) {
      array.splice(index, 1);
    }
  }

  public Clear() {
    this.splice(0, this.length);
    this.added.splice(0, this.added.length);
    this.removed.splice(0, this.removed.length);
    this.notifyClear();
  }

  //#region Subscriptions
  subscribeToAdd(observer: ItemCollectionObserver<T>): void {
    if (!observer) return;
    this.observersAdd.add(observer);
  }
  unSubscribeToAdd(observer: ItemCollectionObserver<T>): void {
    if (this.observersAdd.has(observer)) {
      this.observersAdd.delete(observer);
    }
  }
  subscribeToRemove(observer: ItemCollectionObserver<T> | undefined): void {
    if (!observer) return;
    this.observersRemove.add(observer);
  }
  unSubscribeToRemove(observer: ItemCollectionObserver<T> | undefined): void {
    if (!observer) return;
    if (this.observersRemove.has(observer)) {
      this.observersRemove.delete(observer);
    }
  }
  subscribeToClear(observer: EmptyCollectionObserver): void {
    if (!observer) return;
    this.observersClear.add(observer);
  }
  unSubscribeToClear(observer: EmptyCollectionObserver): void {
    if (!observer) return;
    if (this.observersClear.has(observer)) {
      this.observersClear.delete(observer);
    }
  }
  //#endregion Subscriptions

  //#region Notifications
  private notifyAdd(item: T) {
    for (const observer of this.observersAdd) {
      observer(item);
    }
  }
  private notifyRemove(item: T) {
    for (const observer of this.observersRemove) {
      observer(item);
    }
  }
  private notifyClear() {
    for (const observer of this.observersClear) {
      observer();
    }
  }
  //#endregion Notifications
}

import { nsObserver } from "Core/Observer";
import { Unsubscribe } from "redux-saga";

export class ObservableCollection<T>
  implements
    nsObserver.ISetSubscription,
    nsObserver.IAddSubscription,
    nsObserver.IRemoveSubscription {
  public added: T[] = [];
  public removed: T[] = [];
  public get list() {
    return [...this._items];
  }
  private _items: T[] = [];

  private observersSet = new Set<nsObserver.Observer>();
  private observersAdd = new Set<nsObserver.Observer>();
  private observersRemove = new Set<nsObserver.Observer>();

  constructor(items?: T[]) {
    this._items = items || [];
  }

  public Set(newItems: T[], shouldMakeDiff: boolean = false) {
    const oldItems = this._items;
    this._items = newItems;
    this.added = [];
    this.removed = [];

    if (shouldMakeDiff) {
      this.added = this._items.filter((i) => !oldItems.includes(i));
      this.removed = oldItems.filter((i) => !this._items.includes(i));
    }

    this.notify(this.observersSet, this._items);
  }
  public update(items: T[]) {
    const toRemove = this._items.filter((i) => !items.includes(i));
    toRemove.forEach((item) => this.Remove(item));

    const toAdd = items.filter((i) => !this._items.includes(i));
    toAdd.forEach((item) => this.Add(item));
  }

  public Add(item: T) {
    this._items.push(item);
    this.added.push(item);
    this.delete(this.removed, item);

    this.notify(this.observersAdd, item);
  }

  public Remove(item: T) {
    this.delete(this._items, item);
    this.delete(this.added, item);
    this.removed.push(item);

    this.notify(this.observersRemove, item);
  }

  public Clear() {
    this.Set([]);
  }

  private delete(array: T[], item: T) {
    const index = array.indexOf(item);
    if (index >= 0) {
      array.splice(index, 1);
    }
  }

  //#region Subscriptions
  public subscribeToAdd(observer: nsObserver.Observer): Unsubscribe {
    if (!observer) return () => {};
    this.observersAdd.add(observer);
    return () => this.observersAdd.delete(observer);
  }
  public subscribeToRemove(observer: nsObserver.Observer): Unsubscribe {
    if (!observer) return () => {};
    this.observersRemove.add(observer);
    return () => this.observersRemove.delete(observer);
  }
  public subscribeToSet(observer: nsObserver.Observer): Unsubscribe {
    if (!observer) return () => {};
    this.observersSet.add(observer);
    return () => this.observersSet.delete(observer);
  }
  //#endregion Subscriptions

  //#region Notifications
  private notify(observers: Set<nsObserver.Observer>, obj?: T | T[]) {
    for (const observer of observers) {
      observer(obj);
    }
  }
  //#endregion Notifications
}

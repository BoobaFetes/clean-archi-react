import { nsObserver } from "Core/Observer";
import { cloneDeep } from "lodash";

export class ObservableCollection<T> implements nsObserver.IChangeSubscription {
  private items: T[] = [];
  public get list() {
    return cloneDeep(this.items);
  }

  private observers = new Set<nsObserver.Observer>();

  constructor(items?: T[]) {
    this.items = items || [];
  }

  public set(newItems: T[]) {
    this.items = newItems;
    this.notifyChange();
  }

  public add(item: T) {
    this.items.push(item);
    this.notifyChange();
  }

  public update(index: number, item: T) {
    if (index > this.items.length || 0 > index) {
      return;
    }
    this.items[index] = item;
    this.notifyChange();
  }

  public remove(item: T) {
    this.delete(this.items, item);
    this.notifyChange();
  }

  public clear() {
    this.set([]);
  }

  private delete(array: T[], item: T) {
    const index = array.indexOf(item);
    if (index >= 0) {
      array.splice(index, 1);
    }
  }

  public subscribeToChange(
    observer: nsObserver.Observer
  ): nsObserver.UnSubscribe {
    this.observers.add(observer);
    return () => this.observers.delete(observer);
  }
  public notifyChange(): void {
    for (const observer of this.observers) {
      observer();
    }
  }
}

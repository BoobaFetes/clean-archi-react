import { ModelBase } from "App/Model";
import { ObservableCollection } from "Core/Observer/ObservableCollection";
import { IPageEntity } from "Core/Entity";

export interface PageCollectionState {
  collection: ObservableCollection<IPageEntity>;
}

export class PageCollectionModel extends ModelBase<PageCollectionState> {
  public collection: ObservableCollection<IPageEntity>;

  constructor(items: IPageEntity[]) {
    super();
    this.collection = new ObservableCollection(...items);
  }

  public subscribeToChangeOnCollectionEvent() {
    this.collection.subscribeToAdd(this.notifyChange);
    this.collection.subscribeToRemove(this.notifyChange);
    this.collection.subscribeToClear(this.notifyChange);
  }
  public unSubscribeToChangeOnCollectionEvent() {
    this.collection.unSubscribeToAdd(this.notifyChange);
    this.collection.unSubscribeToRemove(this.notifyChange);
    this.collection.unSubscribeToClear(this.notifyChange);
  }

  protected stateNotifiedOnChange(
    item: PageCollectionModel
  ): PageCollectionState {
    return {
      collection: item.collection,
    };
  }
}

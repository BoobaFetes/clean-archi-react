import { ViewModel } from "App/ViewModel/base/ViewModel";
import { ObservableCollection } from "Core/Observer/ObservableCollection";
import { IPageEntity } from "Core/Entity";

export interface PageCollectionViewState {
  collection: ObservableCollection<IPageEntity>;
}

export class PageCollectionViewModel extends ViewModel<
  PageCollectionViewState
> {
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
    item: PageCollectionViewModel
  ): PageCollectionViewState {
    return {
      collection: item.collection,
    };
  }
}

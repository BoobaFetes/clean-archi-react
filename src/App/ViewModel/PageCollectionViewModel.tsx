import { ViewState } from "App/ViewModel";
import { ViewModel } from "App/ViewModel/base/ViewModel";
import { ObservableCollection } from "Core/Observer/ObservableCollection";
import { IPageEntity } from "Core/Entity";

export type PageCollectionViewState = Omit<
  ViewState<PageCollectionViewModel>,
  "subscribeToChangeOnCollectionEvent" | "unSubscribeToChangeOnCollectionEvent"
>;

export class PageCollectionViewModel extends ViewModel<
  PageCollectionViewModel
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

  protected setChange(
    item: PageCollectionViewModel
  ): ViewState<PageCollectionViewModel> {
    return {
      collection: item.collection,
    } as ViewState<PageCollectionViewModel>;
  }
}

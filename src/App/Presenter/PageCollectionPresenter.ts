import { IPresenter } from "./base/IPresenter";
import {
  PageCollectionViewModel,
  PageCollectionViewState,
} from "App/ViewModel";
import { IPageEntity } from "Core/Entity";
import { IRemoveSubscription } from "Core/Observer";
import { ItemCollectionObserver } from "Core/Observer/ItemCollectionObserver";
import { ChangeObserver } from "Core/Observer";

export class PageCollectionPresenter
  implements
    IPresenter<PageCollectionViewModel, PageCollectionViewState>,
    IRemoveSubscription<PageCollectionViewState> {
  public model: PageCollectionViewModel;

  constructor(items: IPageEntity[]) {
    this.model = new PageCollectionViewModel(items);
  }

  public subscribeToChange(
    observer: ChangeObserver<PageCollectionViewState>
  ): void {
    this.model.subscribeToChange(observer);
  }
  public unSubscribeToChange(
    observer: ChangeObserver<PageCollectionViewState>
  ): void {
    this.model.unSubscribeToChange(observer);
  }
  public subscribeToChangeAll(
    observers: ChangeObserver<PageCollectionViewState>[]
  ): void {
    this.model.subscribeToChangeAll(observers);
  }
  public unSubscribeToChangeAll(): ChangeObserver<PageCollectionViewState>[] {
    return this.model.unSubscribeToChangeAll();
  }
  public subscribeToRemove(
    observer: ItemCollectionObserver<PageCollectionViewModel> | undefined
  ): void {
    this.model.collection.subscribeToRemove(this.notifyModelChange);
  }
  public unSubscribeToRemove(
    observer: ItemCollectionObserver<PageCollectionViewModel> | undefined
  ): void {
    this.model.collection.unSubscribeToRemove(this.notifyModelChange);
  }

  private notifyModelChange() {
    this.model.notifyChange();
  }
}

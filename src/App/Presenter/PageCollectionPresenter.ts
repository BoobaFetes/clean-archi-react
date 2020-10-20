import { IPresenter } from "./base/IPresenter";
import { PageCollectionModel, PageCollectionState } from "App/Model";
import { IPageEntity } from "Core/Entity";
import { IRemoveSubscription } from "Core/Observer";
import { ItemCollectionObserver } from "Core/Observer/ItemCollectionObserver";
import { ChangeObserver } from "Core/Observer";

export class PageCollectionPresenter
  implements
    IPresenter<PageCollectionModel, PageCollectionState>,
    IRemoveSubscription<PageCollectionState> {
  public model: PageCollectionModel;

  constructor(items: IPageEntity[]) {
    this.model = new PageCollectionModel(items);
  }

  public subscribeToChange(
    observer: ChangeObserver<PageCollectionState>
  ): void {
    this.model.subscribeToChange(observer);
  }
  public unSubscribeToChange(
    observer: ChangeObserver<PageCollectionState>
  ): void {
    this.model.unSubscribeToChange(observer);
  }
  public subscribeToChangeAll(
    observers: ChangeObserver<PageCollectionState>[]
  ): void {
    this.model.subscribeToChangeAll(observers);
  }
  public unSubscribeToChangeAll(): ChangeObserver<PageCollectionState>[] {
    return this.model.unSubscribeToChangeAll();
  }
  public subscribeToRemove(
    observer: ItemCollectionObserver<PageCollectionModel> | undefined
  ): void {
    this.model.collection.subscribeToRemove(this.notifyModelChange);
  }
  public unSubscribeToRemove(
    observer: ItemCollectionObserver<PageCollectionModel> | undefined
  ): void {
    this.model.collection.unSubscribeToRemove(this.notifyModelChange);
  }

  private notifyModelChange() {
    this.model.notifyChange();
  }
}

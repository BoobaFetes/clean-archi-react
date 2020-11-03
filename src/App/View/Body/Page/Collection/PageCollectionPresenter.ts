import { IPresenter } from "App/Presenter";
import { nsEntity } from "Core/Entity";
import { nsAdapter } from "Core/Adapter";
import { nsObserver, ObservableCollection } from "Core/Observer";
import { RemovePageUseCase } from "Core/UseCase/Page/RemovePageUseCase";
import { Property, UseProperty } from "Core/Decorator";
import {
  PageCollectionModel,
  PageCollectionState,
} from "./PageCollectionModel";

@UseProperty
export class PageCollectionPresenter
  implements IPresenter<PageCollectionModel, PageCollectionState> {
  @Property<PageCollectionPresenter>({
    onInit(that) {
      if (that?.viewUpdater) {
        that?.unsubscriptions.push(
          that?.model.subscribeToChange(that?.viewUpdater)
        );
      }
    },
    notifyChange: true,
  })
  public model: PageCollectionModel;
  public viewUpdater: nsObserver.Observer | undefined;

  @Property<PageCollectionPresenter>({
    onInit(that) {
      that?.unsubscriptions.push(
        that?.pageStore.subscribe((pages) => {
          that.model.collection = new ObservableCollection(pages);
        })
      );
    },
  })
  private pageStore: nsAdapter.IDataStore<nsEntity.IPageEntity>;
  private unsubscriptions: Function[] = [];
  private removeUseCase: RemovePageUseCase;

  constructor(pageStore: nsAdapter.IDataStore<nsEntity.IPageEntity>) {
    this.removeUseCase = new RemovePageUseCase(pageStore);
    this.model = new PageCollectionModel();
    this.pageStore = pageStore;
  }

  public setModel(model: Partial<PageCollectionState>) {
    this.model = new PageCollectionModel(model.items);
  }

  public async remove(item: nsEntity.IPageEntity) {
    this.model.loading = true;
    await this.removeUseCase.exec(item);
    this.model.loading = false;
  }

  public async query() {
    this.model.loading = true;
    console.time("PageCollectionPresenter : query");
    const result = await this.pageStore.queryAll();
    console.log("PageCollectionPresenter : query : result", result);
    console.timeEnd("PageCollectionPresenter : query");
    this.model.loading = false;
  }

  destroy(): void {
    this.unsubscriptions.forEach((unsubscription) => unsubscription());
  }
}

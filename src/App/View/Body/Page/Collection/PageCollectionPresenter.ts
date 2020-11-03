import { IPresenter, PresenterBase } from "App/Presenter";
import { nsEntity } from "Core/Entity";
import { CommandStatus, nsAdapter } from "Core/Adapter";
import { nsObserver, ObservableCollection } from "Core/Observer";
import { RemovePageUseCase } from "Core/UseCase/Page/RemovePageUseCase";
import { Bind, UseBinding } from "Core/Decorator";
import {
  PageCollectionModel,
  PageCollectionState,
} from "./PageCollectionModel";

@UseBinding
export class PageCollectionPresenter
  extends PresenterBase<PageCollectionModel, PageCollectionState>
  implements IPresenter<PageCollectionModel, PageCollectionState> {
  public model: PageCollectionModel = undefined as any;

  @Bind<PageCollectionPresenter>({
    onSet(that, name) {
      that.addSubscriptionFor(
        name,
        that.pageStore.subscribe((pages) => {
          that.model.collection = new ObservableCollection(pages);
        })
      );
    },
  })
  private pageStore: nsAdapter.IDataStore<nsEntity.IPageEntity>;
  private removeUseCase: RemovePageUseCase;

  constructor(pageStore: nsAdapter.IDataStore<nsEntity.IPageEntity>) {
    super();
    this.removeUseCase = new RemovePageUseCase(pageStore);
    this.model = new PageCollectionModel();
    this.pageStore = pageStore;
  }

  public bind(
    state: Partial<PageCollectionState>,
    viewUpdater?: nsObserver.StateObserver<PageCollectionState>
  ): void {
    this.unsubscribeToChange();
    this.model = new PageCollectionModel(state.items);
    this.viewUpdater = viewUpdater;
    this.subscribeToChange();
  }

  private setModel(state: Partial<PageCollectionState>) {
    this.model.collection = new ObservableCollection(state.items);
  }

  public async query() {
    this.model.isLoading = true;
    const result = await this.pageStore.queryAll();
    if (result.status === CommandStatus.Success) {
      this.setModel({ items: result.data });
    }
    this.model.isLoading = false;
  }

  public async remove(item: nsEntity.IPageEntity) {
    this.model.isLoading = true;
    await this.removeUseCase.exec(item);
    this.model.isLoading = false;
  }
}

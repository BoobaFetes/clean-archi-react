import { IPresenter } from "App/Presenter";
import {
  CreatePageUseCase,
  EditionMode,
  EditPageUseCase,
  nsUseCase,
  ReadPageUseCase,
} from "Core/UseCase";
import { CommandStatus, nsAdapter } from "Core/Adapter";
import { nsEntity } from "Core/Entity";
import { Property, UseProperty } from "Core/Decorator";
import { nsObserver } from "Core/Observer";
import { PageModel, PageState } from "./PageModel";

@UseProperty
export class PagePresenter implements IPresenter<PageModel, PageState> {
  @Property<PagePresenter>({
    onInit(that) {
      if (that?.viewUpdater) {
        that?.unsubscriptions.push(
          that?.model.subscribeToChange(that?.viewUpdater)
        );
      }
      that?.model.validateAll();
      that?.model.notifyChange();
    },
  })
  public model: PageModel;
  public viewUpdater: nsObserver.Observer | undefined;
  public route: nsAdapter.IRouteAdapter;

  private strategy: Record<EditionMode, nsUseCase.PageHandler>;
  @Property<PagePresenter>({
    onInit(that) {
      that?.unsubscriptions.push(
        that?.pageStore.subscribe((pages) => {
          const page = pages.find((p) => p.id === that.model.id);
          if (!page) return;
          that.model = new PageModel(page);
        })
      );
    },
  })
  private pageStore: nsAdapter.IDataStore<nsEntity.IPageEntity>;
  private unsubscriptions: Function[] = [];

  constructor(
    pageStore: nsAdapter.IDataStore<nsEntity.IPageEntity>,
    route: nsAdapter.IRouteAdapter
  ) {
    this.pageStore = pageStore;
    this.route = route;
    this.model = new PageModel({});
    this.strategy = {
      [EditionMode.None]: new ReadPageUseCase(),
      [EditionMode.Create]: new CreatePageUseCase(pageStore),
      [EditionMode.Edit]: new EditPageUseCase(pageStore),
    };
  }

  public async query(id: string | undefined) {
    if (!id) return;

    this.model.isLoading = true;
    const item = this.pageStore.single(id);
    if (item.status === CommandStatus.Success) {
      this.model = new PageModel(item.data || {});
      this.model.isLoading = true;
      return;
    }

    console.time("PageCollectionPresenter : querySingle");
    const result = await this.pageStore.querySingle(id);
    console.log("PageCollectionPresenter : querySingle : result", result);
    console.timeEnd("PageCollectionPresenter : querySingle");

    this.model.isLoading = true;
  }

  public setModel(model: Partial<PageState>) {
    this.model = new PageModel(model);
  }

  destroy(): void {
    this.unsubscriptions.forEach((unsubscription) => unsubscription());
  }

  public async save(): Promise<boolean> {
    const hasErrors = Object.keys(this.model.errors).length > 0;
    if (hasErrors) {
      return false;
    }

    this.model.isLoading = true;
    const result = await this.strategy[this.model.mode].exec(this.model);
    this.model.isLoading = false;
    return result;
  }
}

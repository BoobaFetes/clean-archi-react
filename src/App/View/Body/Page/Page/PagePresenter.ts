import { IPresenter, PresenterBase } from "App/Presenter";
import {
  CreatePageUseCase,
  EditionMode,
  EditPageUseCase,
  nsUseCase,
  ReadPageUseCase,
} from "Core/UseCase";
import { nsAdapter } from "Core/Adapter";
import { nsEntity } from "Core/Entity";
import { Bind, UseBinding } from "Core/Decorator";
import { PageModel, PageState } from "./PageModel";
import { nsObserver } from "Core/Observer";

@UseBinding
export class PagePresenter
  extends PresenterBase<PageModel, PageState>
  implements IPresenter<PageModel, PageState> {
  public model: PageModel;
  public route: nsAdapter.IRouteAdapter;

  private strategy: Record<EditionMode, nsUseCase.PageHandler>;
  @Bind<PagePresenter>({
    onSet: (that, name) =>
      that.addSubscriptionFor(
        name,
        that.pageStore.subscribe((pages) => {
          const page = pages.find((p) => p.id === that.model.id);
          if (!page) return;
          that.model = new PageModel(page);
        })
      ),
  })
  private pageStore: nsAdapter.IDataStore<nsEntity.IPageEntity>;

  constructor(
    pageStore: nsAdapter.IDataStore<nsEntity.IPageEntity>,
    route: nsAdapter.IRouteAdapter
  ) {
    super();
    this.pageStore = pageStore;
    this.route = route;
    this.model = new PageModel({});
    this.strategy = {
      [EditionMode.None]: new ReadPageUseCase(),
      [EditionMode.Create]: new CreatePageUseCase(pageStore),
      [EditionMode.Edit]: new EditPageUseCase(pageStore),
    };
  }

  public bind(
    state: Partial<PageState>,
    viewUpdater?: nsObserver.StateObserver<PageState>
  ) {
    this.unsubscribeToChange();
    this.model = new PageModel(state);
    this.viewUpdater = viewUpdater;
    this.subscribeToChange();
  }

  public setModel(state: Partial<PageState>) {
    this.model.id = state.id;
    this.model.created = state.created || "";
    this.model.edited = state.edited || "";
    this.model.name = state.name || "";
    this.model.sections = state.sections || [];
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

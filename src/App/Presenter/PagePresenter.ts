import { IPresenter } from "App/Presenter/base/IPresenter";
import { ChangeObserver, PageViewModel, ViewState } from "App/ViewModel";
import { EditionMode, PageViewState } from "App/ViewModel/PageViewModel";
import { IOnSaveListener } from "Core/Listener";
import {
  CreatePageUseCase,
  EditPageUseCase,
  IPageUseCase,
  ReadPageUseCase,
} from "Core/UseCase";

export class PagePresenter
  implements IPresenter<PageViewModel>, IOnSaveListener<PageViewModel> {
  private static strategy: Record<EditionMode, IPageUseCase> = {
    [EditionMode.None]: new ReadPageUseCase(),
    [EditionMode.Create]: new CreatePageUseCase(),
    [EditionMode.Edit]: new EditPageUseCase(),
  };
  private get strategy(): IPageUseCase {
    return PagePresenter.strategy[EditionMode[this.model.mode]];
  }

  public model: PageViewModel;

  constructor(model: Partial<PageViewState>) {
    this.model = new PageViewModel(model);

    const entity = this.strategy.getEntity(this.model);
    this.model.id = entity.id;
    this.model.name = entity.name;
    this.model.created = entity.created;
    this.model.edited = entity.edited;
    this.model.sections = entity.sections;
  }
  public subscribeToChange(observer: ChangeObserver<PageViewState>): void {
    this.model.subscribeToChange(observer);
  }
  public unSubscribeToChange(observer: ChangeObserver<PageViewState>): void {
    this.model.unSubscribeToChange(observer);
  }

  public subscribeToChangeAll(
    observers: ChangeObserver<PageViewState>[]
  ): void {
    this.model.subscribeToChangeAll(observers);
  }
  public unSubscribeToChangeAll(): ChangeObserver<PageViewState>[] {
    return this.model.unSubscribeToChangeAll();
  }
  public onSaved?(item: PageViewModel): void;

  public save() {
    if (!this.onSaved || Object.keys(this.model.error).length > 0) {
      return;
    }

    this.onSaved(this.model);
    if (this.strategy instanceof CreatePageUseCase) {
      this.model.error = {} as any;

      const entity = this.strategy.getEntity(this.model);
      this.model.id = entity.id;
      this.model.name = entity.name;
      this.model.created = entity.created;
      this.model.edited = entity.edited;
    }
  }
}

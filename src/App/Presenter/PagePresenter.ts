import { IPresenter } from "App/Presenter/base/IPresenter";
import { PageModel } from "App/Model";
import { EditionMode, PageState } from "App/Model/PageModel";
import { IOnSaveListener } from "Core/Listener";
import { ChangeObserver } from "Core/Observer";
import {
  CreatePageUseCase,
  EditPageUseCase,
  IPageUseCase,
  ReadPageUseCase,
} from "Core/UseCase";
import { IRouteAdapter } from "Core/Adapter";

export class PagePresenter
  implements IPresenter<PageModel, PageState>, IOnSaveListener<PageState> {
  private static strategy: Record<EditionMode, IPageUseCase> = {
    [EditionMode.None]: new ReadPageUseCase(),
    [EditionMode.Create]: new CreatePageUseCase(),
    [EditionMode.Edit]: new EditPageUseCase(),
  };
  private get strategy(): IPageUseCase {
    return PagePresenter.strategy[EditionMode[this.model.mode]];
  }

  public model: PageModel;
  public route: IRouteAdapter;

  constructor(model: Partial<PageState>, route: IRouteAdapter) {
    this.model = new PageModel(model);
    this.route = route;

    const entity = this.strategy.getEntity(this.model);
    this.model.id = entity.id;
    this.model.name = entity.name;
    this.model.created = entity.created;
    this.model.edited = entity.edited;
    this.model.sections = entity.sections;
  }
  public subscribeToChange(observer: ChangeObserver<PageState>): void {
    this.model.subscribeToChange(observer);
  }
  public unSubscribeToChange(observer: ChangeObserver<PageState>): void {
    this.model.unSubscribeToChange(observer);
  }

  public subscribeToChangeAll(observers: ChangeObserver<PageState>[]): void {
    this.model.subscribeToChangeAll(observers);
  }
  public unSubscribeToChangeAll(): ChangeObserver<PageState>[] {
    return this.model.unSubscribeToChangeAll();
  }
  public onSaved?(item: PageModel): void;

  public save() {
    if (!this.onSaved || Object.keys(this.model.error).length > 0) {
      return;
    }

    this.onSaved(this.model);
    // if (this.strategy instanceof CreatePageUseCase) {
    //   this.model.error = {} as any;

    //   const entity = this.strategy.getEntity(this.model);
    //   this.model.id = entity.id;
    //   this.model.name = entity.name;
    //   this.model.created = entity.created;
    //   this.model.edited = entity.edited;
    // }
    this.route.navigate("/");
  }
}

import { Property, PropertyTranslator } from "Core/Decorator";
import { ViewState } from "App/ViewModel";
import { ViewModel } from "App/ViewModel/base/ViewModel";
import { IPageEntity } from "Core/Entity/IPageEntity";
import { ISectionEntity } from "Core/Entity/ISectionEntity";
import { Guid } from "Core/Entity/Guid";

export enum EditionMode {
  None = "None",
  Create = "Create",
  Edit = "Edit",
}
export type PageViewState = ViewState<PageViewModel>;

export class PageViewModel
  extends ViewModel<PageViewModel>
  implements IPageEntity {
  //#region IPageEntity
  public id: Guid;

  @Property<PageViewModel>({
    observers: [
      (item) => item?.validate("name"),
      (item) => item?.notifyChange(),
    ],
  })
  public name: string = "";

  public edited: Date;
  public created: Date;

  public sections: ISectionEntity[] = [];
  //#endregion

  public mode: EditionMode;
  public error: Record<keyof PageViewState, string | undefined>;

  constructor(model?: Partial<PageViewModel>) {
    super();
    this.mode = model?.mode || EditionMode.None;
    this.error = {} as any;

    //#region IPageEntity
    this.id = model?.id as Guid;
    this.name = model?.name || "";
    this.created = model?.created as Date;
    this.edited = model?.edited as Date;
    this.sections = model?.sections || [];
    //#endregion

    PropertyTranslator.exec<PageViewModel>(this);
  }

  protected setChange(item: PageViewModel): PageViewState {
    return {
      id: item.id,
      name: item.name,
      created: item.created,
      edited: item.edited,
      error: item.error,
      mode: item.mode,
      sections: item.sections,
    };
  }

  private validate(property: keyof PageViewState) {
    const value = this[property];

    switch (property) {
      case "name":
        if (/[0-9]/.test(value as string))
          this.error[property] = "name contains number";
        else delete this.error[property];
    }
  }
}

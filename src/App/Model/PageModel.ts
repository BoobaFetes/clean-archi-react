import { Property, PropertyTranslator } from "Core/Decorator";
import { ModelBase } from "App/Model";
import { IPageEntity } from "Core/Entity/IPageEntity";
import { ISectionEntity } from "Core/Entity/ISectionEntity";
import { Guid } from "Core/Entity/Guid";

export enum EditionMode {
  None = "None",
  Create = "Create",
  Edit = "Edit",
}

export interface PageState extends IPageEntity {
  mode: EditionMode;
  error: Record<keyof IPageEntity, string | undefined>;
}

export class PageModel extends ModelBase<PageState> implements IPageEntity {
  //#region IPageEntity
  public id: Guid;

  @Property<PageModel>({
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
  public error: Record<keyof PageState, string | undefined>;

  constructor(model?: Partial<PageState>) {
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

    PropertyTranslator.exec<PageState>(this);
  }

  protected stateNotifiedOnChange(model: PageModel): PageState {
    return {
      id: model.id,
      name: model.name,
      created: model.created,
      edited: model.edited,
      error: model.error,
      mode: model.mode,
      sections: model.sections,
    };
  }

  private validate(property: keyof PageState) {
    const value = this[property];

    switch (property) {
      case "name":
        if (/[0-9]/.test(value as string))
          this.error[property] = "name contains number";
        else delete this.error[property];
    }
  }
}

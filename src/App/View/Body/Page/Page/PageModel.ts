import { Bind, UseBinding } from "Core/Decorator";
import { ModelBase } from "App/Model";
import { nsEntity } from "Core/Entity";
import { EditionMode } from "Core/UseCase";

export type PageState = nsEntity.IPageEntity & {
  isLoading: boolean;
  mode: EditionMode;
  errors: Record<keyof PageState, string | undefined>;
};

@UseBinding
export class PageModel extends ModelBase<PageState> implements PageState {
  //#region IPageEntity
  public id: nsEntity.Guid | undefined;

  @Bind<PageModel>({
    onSet: (that) => that.validate("name"),
    notifyChange: true,
  })
  public name: string = "";

  public edited: nsEntity.DateIso = "";
  public created: nsEntity.DateIso = "";

  public sections: nsEntity.Guid[] = [];
  //#endregion

  @Bind({ notifyChange: true })
  public isLoading: boolean = false;
  public mode: EditionMode;
  public errors: Record<keyof PageState, string | undefined>;

  constructor(model: Partial<PageState>) {
    super();
    this.mode = model?.mode || EditionMode.None;
    this.errors = {} as any;

    //#region IPageEntity
    this.id = model?.id as nsEntity.Guid;
    this.name = model?.name || "";
    this.created = model?.created || "";
    this.edited = model?.edited || "";
    this.sections = model?.sections || [];
    //#endregion
  }

  public getState(): PageState {
    return {
      id: this.id,
      name: this.name,
      created: this.created,
      edited: this.edited,
      sections: this.sections,
      errors: this.errors,
      mode: this.mode,
      isLoading: this.isLoading,
    };
  }

  public validateAll() {
    for (const propertyName in this) {
      this.validate(propertyName as keyof PageState);
    }
  }
  public validate(property: keyof PageState) {
    const value = this[property];

    switch (property) {
      case "name":
        if (/[0-9]/.test(value as string))
          this.errors[property] = "name contains number";
        else delete this.errors[property];
    }
  }
}

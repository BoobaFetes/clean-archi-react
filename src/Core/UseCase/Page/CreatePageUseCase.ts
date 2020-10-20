import { IPageEntity, NewGuid } from "Core/Entity";
import { IPageUseCase } from "Core/UseCase";
import { defaultValue } from "Core/UseCase/Page/ReadPageUseCase";

export class CreatePageUseCase implements IPageUseCase {
  public getEntity(model: Partial<IPageEntity>): IPageEntity {
    const now = new Date(Date.now());
    return {
      ...defaultValue(),
      ...model,
      id: NewGuid(),
      name: "",
      created: now,
      edited: now,
    };
  }

  public save(model: IPageEntity) {}
}

import { IPageEntity } from "Core/Entity";
import { IPageUseCase } from "Core/UseCase";
import { defaultValue } from "Core/UseCase/Page/ReadPageUseCase";

export class EditPageUseCase implements IPageUseCase {
  public getEntity(model: Partial<IPageEntity>): IPageEntity {
    return {
      ...defaultValue(),
      ...model,
      edited: new Date(Date.now()),
    };
  }

  public save(model: IPageEntity) {}
}

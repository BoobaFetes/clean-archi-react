import { IPageEntity, NewGuid } from "Core/Entity";
import { IPageUseCase } from "Core/UseCase";

export function defaultValue(): IPageEntity {
  return {
    id: NewGuid(),
    name: "",
    created: new Date(),
    edited: new Date(),
    sections: [],
  };
}
export class ReadPageUseCase implements IPageUseCase {
  public getEntity(model: Partial<IPageEntity>): IPageEntity {
    return {
      ...defaultValue(),
      ...model,
    };
  }

  public save(model: IPageEntity) {}
}

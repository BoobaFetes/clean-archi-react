import { IPageEntity } from "Core/Entity";

export interface IPageUseCase {
  getEntity(entity: Partial<IPageEntity>): IPageEntity;
  save(model: IPageEntity): void;
}

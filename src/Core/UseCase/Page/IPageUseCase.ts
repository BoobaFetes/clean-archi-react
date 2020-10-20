import { IPageEntity } from "Core/Entity";

export interface IPageUseCase {
  getEntity(model: Partial<IPageEntity>): IPageEntity;
  save(model: IPageEntity): void;
}

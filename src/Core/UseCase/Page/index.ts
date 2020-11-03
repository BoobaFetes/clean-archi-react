import { nsEntity } from "Core/Entity";

export { CreatePageUseCase } from "./CreatePageUseCase";
export { EditPageUseCase } from "./EditPageUseCase";
export { ReadPageUseCase } from "./ReadPageUseCase";

export interface IPageHandlerUseCase {
  exec(model: nsEntity.IPageEntity): Promise<boolean>;
}

import { IPageHandlerUseCase } from "./Page";
export { CreatePageUseCase, EditPageUseCase, ReadPageUseCase } from "./Page";

export enum EditionMode {
  None = "None",
  Create = "Create",
  Edit = "Edit",
}

export declare namespace nsUseCase {
  export type PageHandler = IPageHandlerUseCase;
}

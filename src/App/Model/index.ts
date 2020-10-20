import { IModel as _IModel } from "./base/IModel";
import { PageState as _PageState } from "./PageModel";
import { PageCollectionState as _PageCollectionState } from "./PageCollectionModel";

export { ModelBase } from "./base/ModelBase";
export type IModel<T> = _IModel<T>;

export { PageModel } from "./PageModel";
export type PageState = _PageState;

export { PageCollectionModel } from "./PageCollectionModel";
export type PageCollectionState = _PageCollectionState;

import { IViewModel as _IViewModel } from "./base/IViewModel";
import { PageViewState as _PageViewState } from "./PageViewModel";
import { PageCollectionViewState as _PageCollectionViewState } from "./PageCollectionViewModel";

export { ViewModel } from "./base/ViewModel";
export type IViewModel<T> = _IViewModel<T>;

export { PageViewModel } from "./PageViewModel";
export type PageViewState = _PageViewState;

export { PageCollectionViewModel } from "./PageCollectionViewModel";
export type PageCollectionViewState = _PageCollectionViewState;

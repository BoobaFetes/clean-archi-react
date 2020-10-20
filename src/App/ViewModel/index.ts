import {
  ChangeObserver as _ChangeObserver,
  IViewModel as _IViewModel,
  ViewState as _ViewState,
} from "./base/IViewModel";
import { PageViewState as _PageViewState } from "./PageViewModel";
import { PageCollectionViewState as _PageCollectionViewState } from "./PageCollectionViewModel";

export { ViewModel } from "./base/ViewModel";
export type ChangeObserver<T> = _ChangeObserver<T>;
export type IViewModel<T> = _IViewModel<T>;
export type ViewState<T> = _ViewState<T>;

export { PageViewModel } from "./PageViewModel";
export type PageViewState = _PageViewState;

export { PageCollectionViewModel } from "./PageCollectionViewModel";
export type PageCollectionViewState = _PageCollectionViewState;

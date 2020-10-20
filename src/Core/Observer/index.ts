import {
  IChangeSubscription as _IChangeSubscription,
  ChangeObserver as _ChangeObserver,
} from "./IChangeSubscription";
import { EmptyCollectionObserver as _EmptyCollectionObserver } from "./EmptyCollectionObserver";
import { ItemCollectionObserver as _ItemCollectionObserver } from "./ItemCollectionObserver";
import { IAddSubscription as _IAddSubscription } from "./IAddSubscription";
import { IRemoveSubscription as _IRemoveSubscription } from "./IRemoveSubscription";
import { IClearSubscription as _IClearSubscription } from "./IClearSubscription";

export type IChangeSubscription<T> = _IChangeSubscription<T>;
export type ChangeObserver<T> = _ChangeObserver<T>;

export type IAddSubscription<T> = _IAddSubscription<T>;
export type IRemoveSubscription<T> = _IRemoveSubscription<T>;
export type IClearSubscription = _IClearSubscription;
export type EmptyCollectionObserver = _EmptyCollectionObserver;
export type ItemCollectionObserver<T> = _ItemCollectionObserver<T>;

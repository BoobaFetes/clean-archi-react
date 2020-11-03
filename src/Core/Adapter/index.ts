//import { nsEntity } from "../Entity";

import { nsEntity } from "Core/Entity";

export enum CommandStatus {
  Failure = 0,
  InFlight = 1,
  Success = 2,
}

export declare namespace nsAdapter {
  export type StoreResult<T extends nsEntity.IEntity> = {
    data: T | undefined;
    errors?: any[];
    status: CommandStatus;
  };
  export type StoreResults<T extends nsEntity.IEntity> = {
    data: T[];
    errors?: any[];
    status: CommandStatus;
  };
  export type Subscription<T extends nsEntity.IEntity> = (state: T[]) => void;
  export type UnSubscribe = () => void;
  export interface IDataStore<T extends nsEntity.IEntity> {
    queryAll(): Promise<StoreResults<T>>;
    querySingle(id: nsEntity.Guid): Promise<StoreResult<T>>;
    commandInsert(entity: T): Promise<StoreResult<T>>;
    commandUpdate(entity: T): Promise<StoreResult<T>>;
    commandRemove(id: nsEntity.Guid): Promise<StoreResult<T>>;

    all(ids?: nsEntity.Guid[]): StoreResults<T>;
    single(id: nsEntity.Guid): StoreResult<T>;
    subscribe(observer: Subscription<T>): UnSubscribe;
  }

  export interface IRouteAdapter {
    back(): void;
    navigate(path: string, locationState?: any): void;
  }
}

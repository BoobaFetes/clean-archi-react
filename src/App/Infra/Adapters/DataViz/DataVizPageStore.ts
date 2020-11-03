import { nsAdapter, CommandStatus } from "Core/Adapter";
import { nsEntity } from "Core/Entity";
import { nsDataViz, StateKey } from ".";
import { DataVizStore } from "./DataVizStore";

const fakeDb: nsEntity.IPageEntity[] = [
  {
    id: "26da970a-3e6b-1a60-925b-c296b1ce8469",
    name: "fake 19",
    created: new Date(2019, 1, 1).toISOString(),
    edited: new Date(2019, 1, 2).toISOString(),
    sections: [],
  },
  {
    id: "4e1c16d6-f06d-1029-9808-a053d3c9f9b2",
    name: "fake 20",
    created: new Date(2020, 1, 1).toISOString(),
    edited: new Date(2020, 1, 2).toISOString(),
    sections: [],
  },
];
function fakeCall<T>(resolvedItem: T): Promise<T> {
  return new Promise<T>((resolve, _) => {
    // fake call to an api
    setTimeout(() => {
      resolve(resolvedItem);
    }, 2000);
  });
}

export class DataVizPageStore
  implements nsAdapter.IDataStore<nsEntity.IPageEntity> {
  protected store = DataVizStore;

  public subscribe(
    observer: nsAdapter.Subscription<nsEntity.IPageEntity>
  ): nsAdapter.UnSubscribe {
    return this.store.subscribe(() => {
      observer(this.store.getState().page as nsEntity.IPageEntity[]);
    });
  }

  public all(): nsAdapter.StoreResults<nsEntity.IPageEntity> {
    const data = this.store.getState().page;
    return {
      data: data,
      status:
        data && data.length > 0 ? CommandStatus.Success : CommandStatus.Failure,
    };
  }

  public single(
    id: string | undefined
  ): nsAdapter.StoreResult<nsEntity.IPageEntity> {
    const data = this.store.getState().page?.find((i) => i.id === id);
    return {
      data: data,
      status: data ? CommandStatus.Success : CommandStatus.Failure,
    };
  }

  public async queryAll(): Promise<
    nsAdapter.StoreResults<nsEntity.IPageEntity>
  > {
    // fetch policy : cache and network : get fro cache before fetching data
    const result: nsAdapter.StoreResults<nsEntity.IPageEntity> = {
      data: this.store.getState().page || [],
      status: CommandStatus.InFlight,
    };

    try {
      const payload = await fakeCall(fakeDb);

      this.store.dispatch<nsDataViz.PageActions>({
        target: StateKey.page,
        type: "queryAll",
        payload,
      });

      result.data = payload;
      result.status = CommandStatus.Success;
    } catch (error) {
      result.status = CommandStatus.Failure;
      result.errors = [error];
    }

    return result;
  }

  public async querySingle(
    id: nsEntity.Guid
  ): Promise<nsAdapter.StoreResult<nsEntity.IPageEntity>> {
    // fetch policy : cache and network : get fro cache before fetching data
    const result: nsAdapter.StoreResult<nsEntity.IPageEntity> = {
      data: undefined,
      status: CommandStatus.InFlight,
    };

    try {
      const payload = await fakeCall(fakeDb.filter((i) => id === i.id)[0]);

      this.store.dispatch<nsDataViz.PageActions>({
        target: StateKey.page,
        type: "querySingle",
        payload,
      });

      result.data = payload;
      result.status = CommandStatus.Success;
    } catch (error) {
      result.status = CommandStatus.Failure;
      result.errors = [error];
    }

    return result;
  }

  public async commandInsert(
    entity: nsEntity.IPageEntity
  ): Promise<nsAdapter.StoreResult<nsEntity.IPageEntity>> {
    const result: nsAdapter.StoreResult<nsEntity.IPageEntity> = {
      data: entity,
      status: CommandStatus.InFlight,
    };

    try {
      const payload = await fakeCall(entity);

      this.store.dispatch<nsDataViz.PageActions>({
        target: StateKey.page,
        type: "commandInsert",
        payload,
      });

      result.status = CommandStatus.Success;
    } catch (error) {
      result.status = CommandStatus.Failure;
      result.errors = [error];
    }

    return result;
  }
  public async commandUpdate(
    entity: nsEntity.IPageEntity
  ): Promise<nsAdapter.StoreResult<nsEntity.IPageEntity>> {
    const result: nsAdapter.StoreResult<nsEntity.IPageEntity> = {
      data: entity,
      status: CommandStatus.InFlight,
    };

    try {
      const payload = await fakeCall(entity);

      this.store.dispatch<nsDataViz.PageActions>({
        target: StateKey.page,
        type: "commandUpdate",
        payload,
      });

      result.status = CommandStatus.Success;
    } catch (error) {
      result.status = CommandStatus.Failure;
      result.errors = [error];
    }

    return result;
  }
  public async commandRemove(
    id: string
  ): Promise<nsAdapter.StoreResult<nsEntity.IPageEntity>> {
    const result = this.single(id);
    if (result.status === CommandStatus.Failure) {
      return result;
    }

    result.status = CommandStatus.InFlight;

    try {
      const payload = await fakeCall(result.data as nsEntity.IPageEntity);

      this.store.dispatch<nsDataViz.PageActions>({
        target: StateKey.page,
        type: "commandRemove",
        payload,
      });

      result.status = CommandStatus.Success;
    } catch (error) {
      result.status = CommandStatus.Failure;
      result.errors = [error];
    }

    return result;
  }
}

import { nsAdapter, CommandStatus } from "Core/Adapter";
import { NewGuid, nsEntity } from "Core/Entity";
import { IPageHandlerUseCase } from "Core/UseCase/Page";

export class RemovePageUseCase implements IPageHandlerUseCase {
  private store: nsAdapter.IDataStore<nsEntity.IPageEntity>;
  constructor(store: nsAdapter.IDataStore<nsEntity.IPageEntity>) {
    this.store = store;
  }

  public async exec(model: nsEntity.IPageEntity): Promise<boolean> {
    if (!model.id) {
      throw new Error("a functional error to create for RemovePageUseCase");
    }
    const cmd = await this.store.commandRemove(model.id);
    return cmd.status === CommandStatus.Success;
  }

  public entity(model: Partial<nsEntity.IPageEntity>): nsEntity.IPageEntity {
    const now = new Date(Date.now()).toISOString();
    return {
      id: NewGuid(),
      created: now,
      edited: now,
      name: model.name || "",
      sections: model.sections || [],
    };
  }
}

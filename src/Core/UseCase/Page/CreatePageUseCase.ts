import { nsAdapter, CommandStatus } from "Core/Adapter";
import { NewGuid, nsEntity } from "Core/Entity";
import { IPageHandlerUseCase } from "Core/UseCase/Page";

export class CreatePageUseCase implements IPageHandlerUseCase {
  private store: nsAdapter.IDataStore<nsEntity.IPageEntity>;
  constructor(store: nsAdapter.IDataStore<nsEntity.IPageEntity>) {
    this.store = store;
  }

  public async exec(model: nsEntity.IPageEntity): Promise<boolean> {
    const entity = this.entity(model);

    if (model.id) {
      throw new Error("a functional error to create for CreatePageUseCase");
    }

    model.id = entity.id;
    const cmd = await this.store.commandInsert(entity);
    return cmd.status === CommandStatus.Success;
  }

  private entity(model: Partial<nsEntity.IPageEntity>): nsEntity.IPageEntity {
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

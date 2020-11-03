import { nsAdapter, CommandStatus } from "Core/Adapter";
import { nsEntity } from "Core/Entity";
import { IPageHandlerUseCase } from "Core/UseCase/Page";

export class EditPageUseCase implements IPageHandlerUseCase {
  private store: nsAdapter.IDataStore<nsEntity.IPageEntity>;
  constructor(store: nsAdapter.IDataStore<nsEntity.IPageEntity>) {
    this.store = store;
  }

  public async exec(model: nsEntity.IPageEntity): Promise<boolean> {
    const entity = this.entity(model);

    if (!entity.id) {
      throw new Error("a functional error to create for EditPageUseCase");
    }

    if (this.store.single(entity.id).status === CommandStatus.Failure) {
      return false;
    }
    const cmd = await this.store.commandUpdate(entity);
    return cmd.status === CommandStatus.Success;
  }

  private entity(model: Partial<nsEntity.IPageEntity>): nsEntity.IPageEntity {
    return {
      id: model.id,
      created: model.created || "",
      edited: new Date(Date.now()).toISOString(),
      name: model.name || "",
      sections: model.sections || [],
    };
  }
}

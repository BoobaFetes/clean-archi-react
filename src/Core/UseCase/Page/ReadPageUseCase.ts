import { nsEntity } from "Core/Entity";
import { IPageHandlerUseCase } from "Core/UseCase/Page";

export class ReadPageUseCase implements IPageHandlerUseCase {
  public async exec(model: nsEntity.IPageEntity): Promise<boolean> {
    throw new Error(
      "a functional error to create for ReadPageUseCase => we should not try to save when reading an entity..."
    );
  }

  private entity(model: Partial<nsEntity.IPageEntity>): nsEntity.IPageEntity {
    if (!model.id) {
      throw new Error("a functional error to create for ReadPageUseCase");
    }

    return {
      id: model.id,
      created: model.created || "",
      edited: model.edited || "",
      name: model.name || "",
      sections: model.sections || [],
    };
  }
}

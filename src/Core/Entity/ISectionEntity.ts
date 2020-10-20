import { IEntity } from "Core/Entity/IEntity";
import { IWidgetEntity } from "Core/Entity/IWidgetEntity";

export interface ISectionEntity extends IEntity {
  name: string;
  widgets: IWidgetEntity[];
}

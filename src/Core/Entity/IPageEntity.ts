import { IEntity } from "Core/Entity/IEntity";
import { ISectionEntity } from "Core/Entity/ISectionEntity";

export interface IPageEntity extends IEntity {
  name: string;
  edited: Date;
  created: Date;
  sections: ISectionEntity[];
}

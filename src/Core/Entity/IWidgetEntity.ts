import { IEntity } from "Core/Entity/IEntity";

type Point = {
  x: number;
  y: number;
};

export interface IWidgetEntity extends IEntity {
  name: string;
  plots: Point[];
}

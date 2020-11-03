export { NewGuid } from "./Guid";

export declare namespace nsEntity {
  export type Guid = string;
  export type DateIso = string;
  export interface IEntity {
    id?: Guid;
  }
  export interface IPageEntity extends IEntity {
    name: string;
    edited: DateIso;
    created: DateIso;
    sections: Guid[];
  }
  export interface ISectionEntity extends IEntity {
    name: string;
    widgets: Guid[];
  }
  type Point = {
    x: number;
    y: number;
  };

  export interface IWidgetEntity extends IEntity {
    name: string;
    plots: Point[];
  }
}

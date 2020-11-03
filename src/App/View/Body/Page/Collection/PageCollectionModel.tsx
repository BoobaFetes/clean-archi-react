import { ModelBase } from "App/Model/ModelBase";
import { ObservableCollection } from "Core/Observer/ObservableCollection";
import { nsEntity } from "Core/Entity";
import { Bind, UseBinding } from "Core/Decorator";

export type PageCollectionState = {
  isLoading: boolean;
  items: nsEntity.IPageEntity[];
};

@UseBinding
export class PageCollectionModel extends ModelBase<PageCollectionState> {
  @Bind<PageCollectionModel>({ notifyChange: true })
  public isLoading: boolean = false;

  @Bind<PageCollectionModel>({
    onSet: (that) => that.collection.subscribeToChange(that?.notifyChange),
    notifyChange: true,
  })
  public collection: ObservableCollection<nsEntity.IPageEntity>;

  constructor(items: nsEntity.IPageEntity[] = []) {
    super();
    this.collection = new ObservableCollection(items);
  }

  public getState(): PageCollectionState {
    return {
      isLoading: this.isLoading,
      items: this.collection.list,
    };
  }
}

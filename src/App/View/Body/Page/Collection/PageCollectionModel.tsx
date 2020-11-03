import { ModelBase } from "App/Model/ModelBase";
import { ObservableCollection } from "Core/Observer/ObservableCollection";
import { nsEntity } from "Core/Entity";
import { Property, UseProperty } from "Core/Decorator";

export type PageCollectionState = {
  loading: boolean;
  items: nsEntity.IPageEntity[];
};

@UseProperty
export class PageCollectionModel extends ModelBase<PageCollectionState> {
  @Property<PageCollectionModel>({ notifyChange: true })
  public loading: boolean = false;

  @Property<PageCollectionModel>({
    onInit(that) {
      that?.collection.subscribeToSet(that?.notifyChange);
      that?.collection.subscribeToAdd(that?.notifyChange);
      that?.collection.subscribeToRemove(that?.notifyChange);
    },
    notifyChange: true,
  })
  public collection: ObservableCollection<nsEntity.IPageEntity>;

  constructor(items: nsEntity.IPageEntity[] = []) {
    super();
    this.collection = new ObservableCollection(items);
  }

  protected notifyArgument(): PageCollectionState {
    return {
      loading: this.loading,
      items: this.collection.list,
    };
  }
}

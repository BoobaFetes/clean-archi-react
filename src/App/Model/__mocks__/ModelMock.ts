import { Bind, UseBinding } from "Core/Decorator";
import { ModelBase } from "../ModelBase";

type State = {
  isLoading: boolean;
  text: string;
};

@UseBinding
export class ModelMock extends ModelBase<State> {
  public spies = {
    getState: jest.fn(),
  };

  @Bind<ModelMock>({ notifyChange: true })
  public isLoading: boolean;
  public text: string;

  constructor(state: State) {
    super();
    this.isLoading = state.isLoading;
    this.text = state.text;
  }

  protected getState(): State {
    this.spies.getState();
    return {
      isLoading: this.isLoading,
      text: this.text,
    };
  }
}

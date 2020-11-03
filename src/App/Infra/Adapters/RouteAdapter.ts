import { nsAdapter } from "Core/Adapter";
import { RouteComponentProps } from "react-router-dom";
import * as H from "history";

export class RouteAdapter implements nsAdapter.IRouteAdapter {
  private history: H.History<H.LocationState>;

  constructor(route: RouteComponentProps<any>) {
    this.history = route.history;
  }

  public back(): void {
    if (this.history.length === 0) {
      this.history.push("/");
    } else {
      this.history.goBack();
    }
  }

  public navigate<T>(
    path: string,
    locationState?: H.History.LocationDescriptor<T>
  ): void {
    this.history.push(path, locationState);
  }
}

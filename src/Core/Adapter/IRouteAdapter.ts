export interface IRouteAdapter {
  back(): void;
  navigate(path: string, locationState?: any): void;
}

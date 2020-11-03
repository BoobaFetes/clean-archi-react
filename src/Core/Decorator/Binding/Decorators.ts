import "reflect-metadata";
import { BindingTranslator } from "./BindingTranslator";

const formatMetadataKey = Symbol("Binding");

export type PropertyObserver<T extends object> = (
  item: T,
  propertyName: string
) => void;

export type BindingOptions<T extends object> = {
  onSet?: PropertyObserver<T>;
  notifyChange?: boolean;
  descriptor?: PropertyDescriptor;
};

const bindingTranslator = new BindingTranslator();
export function UseBinding<T extends { new (...args: any[]): {} }>(
  constructor: T
) {
  return class extends constructor {
    constructor(...args: any[]) {
      super(...args);
      bindingTranslator.exec(this);
    }
  };
}

export function Bind<T extends object>(options?: BindingOptions<T>) {
  return Reflect.metadata(formatMetadataKey, options);
}

export function getBinding<T extends object>(
  target: any,
  propertyKey: string
): BindingOptions<T> | undefined {
  return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}

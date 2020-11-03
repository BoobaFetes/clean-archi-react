import { nsObserver } from "Core/Observer";
import "reflect-metadata";

const formatMetadataKey = Symbol("Property");

type PropertyObserver<T extends object> = (item?: T) => void;

interface IPropertyOptions<T extends object> {
  onInit?: PropertyObserver<T>;
  onChange?: PropertyObserver<T>;
  notifyChange?: boolean;
  descriptor?: PropertyDescriptor;
}

class Translator {
  public exec<T extends object>(that: T) {
    const fields = Object.entries(that);

    const propertyDescriptors = fields.reduce((mem, [key, value]) => {
      const property = getProperty(that, key);
      if (property) {
        try {
          mem[key] = !!property.descriptor
            ? this.getDataAccessor(value, property.descriptor)
            : this.getAccessorDescriptor(that, value, property);
        } catch (ex) {
          console.error(
            `Property Translator reached an error for '${key}' on object '${
              that.constructor?.name || "object without constructor"
            }'`
          );
        }
      }
      return mem;
    }, {} as Record<string, PropertyDescriptor>);

    if (Object.keys(propertyDescriptors).length > 0) {
      Object.defineProperties(that, propertyDescriptors);
    }
  }

  /** For more details refers to https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty */
  private getDataAccessor(
    value: any,
    descriptor: PropertyDescriptor = {}
  ): PropertyDescriptor {
    return {
      value,
      writable: descriptor.writable || true,
      enumerable: descriptor.enumerable || false,
      configurable: false, // decorated fields are sealed !
    };
  }
  /** For more details refers to https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty */
  private getAccessorDescriptor<T extends object>(
    that: T,
    value: any,
    property: IPropertyOptions<T>
  ) {
    const { onInit, onChange, notifyChange = false } = property;

    if (onInit) {
      onInit(that);
      Translator.notify(that, property);
    }

    // action to create a property in place of the field
    let current = value;
    return {
      get() {
        return current;
      },
      set(value: any) {
        if (current === value) {
          return;
        }

        current = value;

        const obj = this as any;
        if (onInit) {
          onInit(obj);
        }
        if (onChange) {
          onChange(obj);
        }
        Translator.notify(obj, property);

        const notificator = obj as nsObserver.IChangeSubscription;
        if (notifyChange && notificator.notifyChange) {
          notificator.notifyChange();
        }
      },
      enumerable: true,
      configurable: false, // decorated fields are sealed !
    };
  }
  private static notify<T extends object>(
    obj: object,
    property: IPropertyOptions<T>
  ) {
    const notificator = obj as nsObserver.IChangeSubscription;
    if (property.notifyChange && notificator.notifyChange) {
      notificator.notifyChange();
    }
  }
}

const PropertyTranslator = new Translator();

export function UseProperty<T extends { new (...args: any[]): {} }>(
  constructor: T
) {
  return class extends constructor {
    constructor(...args: any[]) {
      super(...args);
      PropertyTranslator.exec(this);
    }
  };
}

export function Property<T extends object>(options?: IPropertyOptions<T>) {
  return Reflect.metadata(formatMetadataKey, options);
}

function getProperty<T extends object>(
  target: any,
  propertyKey: string
): IPropertyOptions<T> | undefined {
  return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}

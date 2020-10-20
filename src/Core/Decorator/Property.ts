import "reflect-metadata";

const formatMetadataKey = Symbol("Property");

type PropertyObserver<T extends object> = (item?: T) => void;

interface IPropertyOptions<T extends object> {
  observers?: PropertyObserver<T>[];
  descriptor?: PropertyDescriptor;
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

class Translator {
  public exec<T extends object>(that: T) {
    const fields = Object.entries(that);

    const propertyDescriptors = fields.reduce((mem, [key, value]) => {
      const property = getProperty(that, key);
      if (property) {
        try {
          mem[key] = !property.observers
            ? this.getDataAccessor(that, value, property?.descriptor)
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
  private getDataAccessor<T extends object>(
    that: T,
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
    const { observers = [] } = property;

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

        for (const observer of observers) {
          observer(that);
        }
      },
      enumerable: true,
      configurable: false, // decorated fields are sealed !
    };
  }
}

export const PropertyTranslator = new Translator();

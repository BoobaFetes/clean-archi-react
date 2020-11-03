import { nsObserver } from "Core/Observer";
import { BindingOptions, getBinding } from "./Decorators";

export class BindingTranslator {
  public exec<T extends object>(that: T) {
    const fields = Object.entries(that);

    const propertyDescriptors = fields.reduce((mem, [key, value]) => {
      const binding = getBinding(that, key);
      if (binding) {
        try {
          mem[key] = !!binding.descriptor
            ? this.getDataAccessor(value, binding.descriptor)
            : this.getAccessorDescriptor(that, key, value, binding);
        } catch (ex) {
          console.error(
            `Bind Translator reached an error for '${key}' on object '${
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
    property: string,
    value: any,
    binding: BindingOptions<T>
  ) {
    BindingTranslator.applyOnSet(that, property, binding);
    BindingTranslator.notify(that, binding);

    // action to replace a field as a property (javascript meaning)
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

        BindingTranslator.applyOnSet(that, property, binding);
        BindingTranslator.notify(that as any, binding);
      },
      enumerable: true,
      configurable: false, // decorated fields are sealed !
    };
  }
  private static applyOnSet<T extends object>(
    obj: T,
    property: string,
    binding: BindingOptions<T>
  ) {
    if (binding.onSet) {
      binding.onSet(obj, property);
    }
  }
  private static notify<T extends object>(
    obj: object,
    binding: BindingOptions<T>
  ) {
    const notificator = obj as nsObserver.IChangeSubscription;
    if (binding.notifyChange && notificator.notifyChange) {
      notificator.notifyChange();
    }
  }
}

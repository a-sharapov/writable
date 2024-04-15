export type Writable<T> = {
  value: T;
  set(newValue: T): void;
  update(callback: (value: T) => T): void;
  subscribe(callback: (value: T) => void): () => void;
};

/**
 * Creates a writable object with the given initial value.
 *
 * @param {T} initialValue - The initial value of the writable object.
 * @return {Object} - An object with the following methods and property:
 *   - value: T - The current value of the writable object.
 *   - set(newValue: T): void - Sets the value of the writable object to the specified new value and notifies all subscribers.
 *   - update(callback: Function): void - Calls the specified callback function with the current value of the writable object.
 *   - subscribe(callback: Function): Function - Subscribes the specified callback function to value changes of the writable object. Returns an unsubscribe function.
 *
 * @example
 * const count = createWritable(0)
 * const unsubscribe = count.subscribe((value) => console.log('The new count value is:', value))
 * count.set(1)
 * count.update((current) => current + 1)
 * unsubscribe()
 */
export const createWritable = <T>(initialValue: T): Writable<T> => {
  let value: T = initialValue;
  const subscribers: Set<(value: T) => void> = new Set();

  const set = (newValue: T) => {
    value = newValue;
    subscribers.forEach((subscriber) => subscriber(newValue));
  };

  const update = (callback: (value: T) => T) => set(callback(value));

  const subscribe = (callback: (value: T) => void) => {
    subscribers.add(callback);
    callback(value);
    return () => subscribers.delete(callback);
  };

  return {
    get value() {
      return value;
    },
    set,
    update,
    subscribe,
  };
};

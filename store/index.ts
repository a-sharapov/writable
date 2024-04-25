type SubscriberId = string;

export type Writable<T> = {
  value: T;
  set(newValue: T): void;
  update(callback: (value: T) => T): void;
  subscribe(callback: (value: T) => void): SubscriberId;
  unsubscribe(id: SubscriberId): void;
};

const ALPHABET = "abcdefghijklmnopqrstuvwxyz";
const DEFAULT_HASH_DICTIONARY = `_${ALPHABET.toUpperCase()}${ALPHABET}`;

/**
 * Creates a writable object with the given initial value.
 *
 * @param {T} initialValue - The initial value of the writable object.
 * @return {Object} - An object with the following methods and property:
 *   - value: T - The current value of the writable object.
 *   - set(newValue: T): void - Sets the value of the writable object to the specified new value and notifies all subscribers.
 *   - update(callback: Function): void - Calls the specified callback function with the current value of the writable object.
 *   - subscribe(callback: Function): string - Subscribes the specified callback function to value changes of the writable object. Returns a unique identifier for the subscriber.
 *   - unsubscribe(id: string): void - Unsubscribes the specified callback function from value changes of the writable object.
 *
 * @example
 * const count = createWritable(0)
 * const subscriberId = count.subscribe((value) => console.log('The new count value is:', value))
 * count.set(1)
 * count.update((current) => current + 1)
 * count.unsubscribe(subscriberId)
 */
export const createWritable = <T>(initialValue: T): Writable<T> => {
  let value: T = initialValue;
  const subscribers: Map<string, (value: T) => void> = new Map();

  const _getRandomHash = (length = 10, dictionary = DEFAULT_HASH_DICTIONARY) =>
    Array.from({ length }, () =>
      dictionary.charAt(Math.floor(Math.random() * dictionary.length))
    ).join("");

  const _getUniqueRandomHash = () => {
    let hash = _getRandomHash();
    while (subscribers.has(hash)) {
      hash = _getRandomHash();
    }
    return hash;
  };

  const set = (newValue: T) => {
    value = newValue;
    subscribers.forEach((subscriber) => subscriber(newValue));
  };

  const update = (callback: (value: T) => T) => set(callback(value));

  const subscribe = (callback: (value: T) => void) => {
    let hash = _getUniqueRandomHash();
    subscribers.set(hash, callback);
    return hash;
  };

  const unsubscribe = (id: SubscriberId) => subscribers.delete(id);

  return {
    get value() {
      return value;
    },
    set,
    update,
    subscribe,
    unsubscribe,
  };
};

import { createWritable } from "$lib/store";

describe("Test writable store", () => {
  test("it sould create a new writable store", () => {
    let writable = createWritable(0);

    expect(writable.value).toBe(0);
  });

  test("it sould set a new value", () => {
    let writable = createWritable(0);
    writable.set(1);

    expect(writable.value).toBe(1);
  });

  test("it sould update current value", () => {
    let writable = createWritable(0);
    writable.set(1);
    writable.update((current) => current + 1);

    expect(writable.value).toBe(2);
  });

  test("it should subscribe to a store", () => {
    let writable = createWritable(0);
    writable.set(1);
    writable.subscribe((value) => {
      expect(value).toBe(1);
    });

    writable.update((current) => current);
  });

  test("it should unsubscribe from a store", () => {
    let writable = createWritable(0);
    writable.set(1);
    const callback = (value) => {
      expect(value).toBe(1);
    };
    const subscriberId = writable.subscribe(callback);

    writable.unsubscribe(subscriberId);
    writable.update((current) => current + 100);
    writable.set(100);
  });
});

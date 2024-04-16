import { createWritable } from "$lib/store";

let writable;

test("it sould create a new writable store", () => {
  writable = createWritable(0);

  expect(writable.value).toBe(0);
});

test("it sould set a new value", () => {
  writable.set(1);

  expect(writable.value).toBe(1);
});

test("it sould update current value", () => {
  writable.set(1);
  writable.update((current) => current + 1);

  expect(writable.value).toBe(2);
});

test("it should subscribe to a store", () => {
  writable.set(1);
  writable.subscribe((value) => {
    expect(value).toBe(1);
  });

  writable.update((current) => current);
});

test("it should unsubscribe from a store", () => {
  writable.set(1);
  const callback = (value) => {
    expect(value).toBe(1);
  };
  const unsubscribe = writable.subscribe(callback);

  unsubscribe();
  writable.update((current) => current + 100);
  writable.set(100);
});

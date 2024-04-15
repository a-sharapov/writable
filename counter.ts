import { count } from "./main";

const unsubscribe = count.subscribe((value) =>
  console.log("The new count value from subscriber is:", value)
);

count.set(1);
console.log("The current count value is:", count.value);

count.update((current) => current + 1);
console.log("The current count value is:", count.value);

count.set(0);
count.update((current) => current - 100);
console.log("The current count value is:", count.value);

unsubscribe();

count.update((current) => current + 100);
console.log("The current count value is:", count.value);

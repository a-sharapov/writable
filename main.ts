import { createWritable } from "$lib/store";

export const count = createWritable<number>(0);

export const arraySize = 16;
export const seed = 8932;
export const headItems: Array<number> = Array.from({ length: arraySize }, () => Math.round(Math.random() * seed));
export const headItemsReverse: Array<number> = headItems.slice().reverse();
export const tailItems: Array<number> = Array.from({ length: arraySize }, () => Math.round(Math.random() * seed));
export const tailItemsReverse: Array<number> = tailItems.slice().reverse();

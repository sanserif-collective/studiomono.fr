export const shuffle = <A extends Array<unknown>>(array: A) =>
  array.sort(() => Math.random() - 0.5);

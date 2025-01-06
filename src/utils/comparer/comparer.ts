export interface IComparer<T> {
  compare(x: T, y: T): number;
}

export abstract class Comparer<T> implements IComparer<T> {
  static _defaultComparer?: Comparer<unknown>;
  static get default() {
    if (typeof Comparer._defaultComparer === "undefined") {
      Comparer._defaultComparer = new DefaultComparer();
    }
    return Comparer._defaultComparer;
  }
  abstract compare(x: T, y: T): number;
}

export class DefaultComparer<A = number> extends Comparer<A> {
  override compare(x: A, y: A): -1 | 0 | 1 {
    if (x > y) {
      return 1;
    } else if (x < y) {
      return -1;
    } else {
      return 0;
    }
  }
}

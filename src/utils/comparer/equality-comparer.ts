export interface IEqualityComparer<T> {
  equals(x: T, y: T): boolean;
}

export abstract class EqualityComparer<T> implements IEqualityComparer<T> {
  static _defaultComparer?: EqualityComparer<unknown>;
  static get default() {
    if (typeof EqualityComparer._defaultComparer === "undefined") {
      EqualityComparer._defaultComparer = new DefaultEqualityComparer();
    }
    return EqualityComparer._defaultComparer;
  }
  abstract equals(x: T, y: T): boolean;
}

export class DefaultEqualityComparer<T> extends EqualityComparer<T> {
  public equals(x: T, y: T): boolean {
    if (x === y) {
      return true;
    }
    return false;
  }
}

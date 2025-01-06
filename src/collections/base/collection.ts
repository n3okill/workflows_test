import { CollectionChangedException } from "../../utils/exceptions/CollectionChangedException.ts";
import { ICollection } from "./collection.interface.ts";
import { ICollectionNode } from "./collection.node.interface.ts";

export abstract class Collection<T> implements ICollection<T> {
  protected _head?: ICollectionNode<T>;
  protected _size = 0;
  protected _version = 0;
  protected _useVersion = false;

  get size() {
    return this._size;
  }

  [Symbol.iterator](): Iterator<T> {
    let current = this._head;
    const version = this._version;
    return {
      next: (): IteratorResult<T> => {
        if (this._useVersion && version !== this._version) {
          throw new CollectionChangedException();
        }
        if (current) {
          const value = current.data;
          current = current.next;
          return { value, done: false };
        } else {
          return { value: undefined, done: true };
        }
      },
    };
  }

  [Symbol.dispose](): void {
    this.clear();
  }

  public clear() {
    let current = this._head;
    while (current !== undefined) {
      const node = current;
      current = current.next;
      node[Symbol.dispose]();
    }

    this._head = undefined;
    this._size = 0;
    this._version++;
  }

  public contains(data: T): boolean {
    for (const item of this) {
      if (item === data) {
        return true;
      }
    }
    return false;
  }

  public toArray() {
    return Array.from(this);
  }
}

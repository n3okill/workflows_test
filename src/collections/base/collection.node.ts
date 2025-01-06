import { ICollectionNode } from "./collection.node.interface.ts";

export class CollectionNode<T> implements ICollectionNode<T> {
  #_next?: ICollectionNode<T>;
  #_data: T;
  constructor(data: T) {
    this.#_data = data;
  }

  get data() {
    return this.#_data;
  }
  get next(): ICollectionNode<T> | undefined {
    return this.#_next;
  }
  set next(node: ICollectionNode<T> | undefined) {
    this.#_next = node;
  }

  [Symbol.dispose]() {
    this.#_next = undefined;
  }
}

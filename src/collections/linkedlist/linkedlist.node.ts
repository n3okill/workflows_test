import { CollectionNode } from "../base/collection.node.ts";
import { ILinkedListNode } from "./linkedlist.node.interface.ts";

export class LinkedListNode<T> extends CollectionNode<T> implements ILinkedListNode<T> {
  #_prev?: LinkedListNode<T>;

  get prev() {
    return this.#_prev;
  }

  set prev(node: ILinkedListNode<T> | undefined) {
    this.#_prev = node as LinkedListNode<T> | undefined;
  }

  public override [Symbol.dispose]() {
    this.#_prev = undefined;
    super[Symbol.dispose]();
  }
}

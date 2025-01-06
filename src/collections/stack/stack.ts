import { EmptyStackException } from "../../utils/exceptions/EmptyStackException.ts";
import { CollectionNode } from "../base/collection.node.ts";
import { Collection } from "../base/collection.ts";
import { IStack } from "./stack.interface.ts";

export class Stack<T> extends Collection<T> implements IStack<T> {
  constructor(data?: Iterable<T>) {
    super();
    if (typeof data !== "undefined" && typeof data[Symbol.iterator] === "function") {
      for (const item of data) {
        this.push(item);
      }
    }
  }

  public peek(): T {
    if (this._head === undefined) {
      throw new EmptyStackException();
    }
    return this._head?.data as T;
  }

  public pop(): T {
    if (this._head === undefined) {
      throw new EmptyStackException();
    }
    const node = this._head;
    const data = node.data;
    this._head = this._head?.next;
    this._size--;
    node[Symbol.dispose]();
    return data as T;
  }

  public push(data: T) {
    const node = new CollectionNode<T>(data);
    if (this._head === undefined) {
      this._head = node;
    } else {
      node.next = this._head;
      this._head = node;
    }
    this._size++;
  }

  public tryPop(): [false] | [true, T] {
    if (this._head === undefined) {
      return [false];
    }
    return [true, this.pop()];
  }

  public tryPeek(): [false] | [true, T] {
    if (this._head === undefined) {
      return [false];
    }
    return [true, this.peek()];
  }
}

export const Lifo = Stack;

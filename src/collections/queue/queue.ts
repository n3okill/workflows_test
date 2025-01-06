import { EmptyQueueException } from "../../utils/exceptions/EmptyQueueException.ts";
import { ICollectionNode } from "../base/collection.node.interface.ts";
import { CollectionNode } from "../base/collection.node.ts";
import { Collection } from "../base/collection.ts";
import { IQueue } from "./queue.interface.ts";

export class Queue<T> extends Collection<T> implements IQueue<T> {
  protected _tail?: ICollectionNode<T>;

  constructor(data?: Iterable<T>) {
    super();
    if (typeof data !== "undefined" && typeof data[Symbol.iterator] === "function") {
      for (const item of data) {
        this.enqueue(item);
      }
    }
  }

  public override clear() {
    super.clear();
    this._tail = undefined;
  }

  public dequeue(): T {
    if (this._head === undefined) {
      throw new EmptyQueueException();
    }
    const node = this._head;
    const data = node.data;
    this._head = this._head?.next;
    this._size--;
    node[Symbol.dispose]();
    return data as T;
  }

  public enqueue(data: T) {
    const node = new CollectionNode<T>(data);
    if (this._head === undefined) {
      this._head = node;
      this._tail = node;
    } else {
      (this._tail as ICollectionNode<T>).next = node;
      this._tail = node;
    }
    this._size++;
  }

  public pop() {
    return this.dequeue();
  }

  public enqueueDequeue(data: T): T {
    this.enqueue(data);
    return this.dequeue();
  }

  public dequeueEnqueue(data: T): T {
    const result = this.dequeue();
    this.enqueue(data);
    return result;
  }

  public peek() {
    if (this._head === undefined) {
      throw new EmptyQueueException();
    }
    return this._head?.data as T;
  }

  public tryDequeue(): [false] | [true, T] {
    if (this._head === undefined) {
      return [false];
    }
    return [true, this.dequeue()];
  }

  public tryPeek(): [false] | [true, T] {
    if (this._head === undefined) {
      return [false];
    }
    return [true, this.peek()];
  }
}

export const Fifo = Queue;

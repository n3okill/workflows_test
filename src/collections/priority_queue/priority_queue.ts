import { Comparer, IComparer } from "../../utils/comparer/comparer.ts";
import { EmptyQueueException } from "../../utils/exceptions/EmptyQueueException.ts";
import { ICollectionNode } from "../base/collection.node.interface.ts";
import { CollectionNode } from "../base/collection.node.ts";
import { Collection } from "../base/collection.ts";
import { IPriorityQueue } from "./priority_queue.interface.ts";

export class PriorityQueue<TElement, TPriority>
  extends Collection<[TElement, TPriority]>
  implements IPriorityQueue<TElement, TPriority>
{
  constructor(
    data: Iterable<[TElement, TPriority]> = [],
    protected readonly _comparer: IComparer<TPriority> = Comparer.default,
  ) {
    super();
    this._useVersion = true;
    if (data) {
      this.enqueueRange(data);
    }
  }

  public dequeue(): TElement {
    if (this._head === undefined) {
      throw new EmptyQueueException();
    }
    const node = this._head;
    const data = node.data;
    this._head = this._head?.next;
    this._size--;
    this._version++;
    node[Symbol.dispose]();
    return data[0] as TElement;
  }

  public dequeueEnqueue(data: TElement, priority: TPriority): TElement {
    const result = this.dequeue();
    this.enqueue(data, priority);
    return result;
  }

  public enqueue(data: TElement, priority: TPriority) {
    const node = new CollectionNode([data, priority] as [TElement, TPriority]);
    if (this._head === undefined) {
      this._head = node;
    } else {
      let current: ICollectionNode<[TElement, TPriority]> | undefined = this._head;
      let previous: ICollectionNode<[TElement, TPriority]> | undefined = current;
      do {
        if (this._comparer.compare(priority, current.data[1]) < 0) {
          node.next = current;
          if (this._head === current) {
            this._head = node;
          } else {
            previous.next = node;
          }
          previous = undefined;
          break;
        }
        previous = current;
        current = current.next;
      } while (current);
      if (previous) {
        previous.next = node;
      }
    }
    this._size++;
    this._version++;
  }

  public enqueueDequeue(data: TElement, priority: TPriority): TElement {
    if (this._head === undefined || this._comparer.compare(priority, this._head.data[1]) < 0) {
      return data;
    }
    this.enqueue(data, priority);
    return this.dequeue();
  }

  public enqueueRange(items: Iterable<[TElement, TPriority]>): void {
    if (typeof items !== "undefined" && typeof items[Symbol.iterator] === "function") {
      for (const [item, priority] of items) {
        this.enqueue(item, priority);
      }
    }
  }

  public peek() {
    if (this._head === undefined) {
      throw new EmptyQueueException();
    }
    return this._head?.data[0];
  }

  public remove(item: TElement): [TElement, TPriority] | undefined {
    const node = this.find(item);
    if (node !== undefined) {
      const data = node.node.data;
      node.previous.next = node.node.next;
      node.node[Symbol.dispose]();
      this._size--;
      this._version++;
      return data;
    }
  }

  private find(
    item: TElement,
  ): { previous: ICollectionNode<[TElement, TPriority]>; node: ICollectionNode<[TElement, TPriority]> } | undefined {
    let current: ICollectionNode<[TElement, TPriority]> | undefined = this._head;
    let previousNode = current;
    while (current !== undefined && current.data[0] !== item) {
      previousNode = current;
      current = current.next;
    }
    if (current !== undefined) {
      return { previous: previousNode as ICollectionNode<[TElement, TPriority]>, node: current };
    }
  }

  public tryDequeue(): [false] | [true, TElement] {
    if (this._head === undefined) {
      return [false];
    }
    return [true, this.dequeue()];
  }

  public tryPeek(): [false] | [true, TElement] {
    if (this._head === undefined) {
      return [false];
    }
    return [true, this.peek()];
  }
}

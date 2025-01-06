import { Collection } from "../base/collection.ts";
import { EmptyListException } from "../../utils/exceptions/EmptyListException.ts";
import { CollectionChangedException } from "../../utils/exceptions/CollectionChangedException.ts";
import { ILinkedList } from "./linkedlist.interface.ts";
import { ILinkedListNode } from "./linkedlist.node.interface.ts";
import { LinkedListNode } from "./linkedlist.node.ts";

export class LinkedList<T> extends Collection<T> implements ILinkedList<T> {
  constructor(data?: Iterable<T>) {
    super();
    this._useVersion = true;
    if (typeof data !== "undefined" && typeof data[Symbol.iterator] === "function") {
      for (const item of data) {
        this.addLast(item);
      }
    }
  }

  get first() {
    return this._head as ILinkedListNode<T>;
  }

  get last() {
    return (this._head as ILinkedListNode<T>)?.prev;
  }

  [Symbol.iterator](): Iterator<T> {
    let current = this._head;
    const version = this._version;
    return {
      next: (): IteratorResult<T> => {
        if (version !== this._version) {
          throw new CollectionChangedException();
        }
        if (current === undefined) {
          return { done: true, value: undefined };
        }
        const value = current.data;
        current = current.next !== this._head ? current.next : undefined;
        return { done: false, value };
      },
    };
  }

  add(data: T) {
    this.addLast(data);
  }

  addAfter(node: ILinkedListNode<T>, data: T | ILinkedListNode<T>): ILinkedListNode<T> {
    const newNode = data instanceof LinkedListNode ? data : new LinkedListNode(data);
    this.insertNodeBefore(node.next as ILinkedListNode<T>, newNode);
    return newNode;
  }

  addBefore(node: ILinkedListNode<T>, data: T | ILinkedListNode<T>): ILinkedListNode<T> {
    const newNode = data instanceof LinkedListNode ? data : new LinkedListNode(data);
    this.insertNodeBefore(node as ILinkedListNode<T>, newNode);
    if (this._head === node) {
      this._head = newNode;
    }
    return newNode;
  }

  addFirst(data: T | ILinkedListNode<T>): ILinkedListNode<T> {
    const newNode = data instanceof LinkedListNode ? data : new LinkedListNode(data);
    if (this._head === undefined) {
      this.insertNodeToEmptyList(newNode);
    } else {
      this.insertNodeBefore(this._head as ILinkedListNode<T>, newNode);
      this._head = newNode;
    }
    return newNode;
  }

  addLast(data: T | ILinkedListNode<T>): ILinkedListNode<T> {
    const newNode = data instanceof LinkedListNode ? data : new LinkedListNode(data);
    if (this._head === undefined) {
      this.insertNodeToEmptyList(newNode);
    } else {
      this.insertNodeBefore(this._head as ILinkedListNode<T>, newNode);
    }
    return newNode;
  }

  clear() {
    super.clear();
    this._version++;
  }

  contains(data: T): boolean {
    return this.find(data) !== undefined;
  }

  find(data: T): ILinkedListNode<T> | undefined {
    let current = this._head as ILinkedListNode<T>;
    if (current !== undefined) {
      do {
        if (current.data === data) {
          return current;
        }
        current = current.next as ILinkedListNode<T>;
      } while (current !== this._head);
    }
  }

  findLast(data: T): ILinkedListNode<T> | undefined {
    if (this._head === undefined) {
      return undefined;
    }
    const last = (this._head as ILinkedListNode<T>).prev as ILinkedListNode<T>;
    let current = last;
    do {
      if (current.data === data) {
        return current;
      }

      current = current.prev as ILinkedListNode<T>;
    } while (current !== last);
  }

  remove(data: T | ILinkedListNode<T>): boolean {
    if (!(data instanceof LinkedListNode)) {
      const node = this.find(data as T);
      if (node !== undefined) {
        this.removeNode(node);
        return true;
      }
    } else {
      this.removeNode(data);
      return true;
    }
    return false;
  }

  removeFirst(): void {
    if (this._head === undefined) {
      throw new EmptyListException();
    }
    this.removeNode(this._head as ILinkedListNode<T>);
  }
  removeLast(): void {
    if (this._head === undefined) {
      throw new EmptyListException();
    }
    this.removeNode((this._head as ILinkedListNode<T>).prev as ILinkedListNode<T>);
  }

  private insertNodeBefore(node: ILinkedListNode<T>, newNode: ILinkedListNode<T>): void {
    newNode.next = node;
    newNode.prev = node.prev;
    (node.prev as ILinkedListNode<T>).next = newNode;
    node.prev = newNode;
    this._size++;
    this._version++;
  }

  private insertNodeToEmptyList(newNode: ILinkedListNode<T>): void {
    newNode.next = newNode;
    newNode.prev = newNode;
    this._head = newNode;
    this._size++;
    this._version++;
  }

  private removeNode(node: ILinkedListNode<T>): void {
    if (node.next === node) {
      this._head = undefined;
    } else {
      (node.next as ILinkedListNode<T>).prev = node.prev;
      (node.prev as ILinkedListNode<T>).next = node.next;
      if (this._head === node) {
        this._head = node.next;
      }
    }
    node[Symbol.dispose]();
    this._size--;
    this._version++;
  }
}

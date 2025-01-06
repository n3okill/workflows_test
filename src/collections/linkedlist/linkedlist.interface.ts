import { ICollection } from "../base/collection.interface.ts";
import { ILinkedListNode } from "./linkedlist.node.interface.ts";

export interface ILinkedList<T> extends ICollection<T> {
  get first(): ILinkedListNode<T> | undefined;
  get last(): ILinkedListNode<T> | undefined;
  add(data: T): void;
  addAfter(node: ILinkedListNode<T>, data: T | ILinkedListNode<T>): ILinkedListNode<T>;
  addBefore(node: ILinkedListNode<T>, data: T | ILinkedListNode<T>): ILinkedListNode<T>;
  addFirst(data: T | ILinkedListNode<T>): ILinkedListNode<T>;
  addLast(data: T | ILinkedListNode<T>): ILinkedListNode<T>;
  find(data: T): ILinkedListNode<T> | undefined;
  findLast(data: T): ILinkedListNode<T> | undefined;
  remove(data: T | ILinkedListNode<T>): boolean;
  removeFirst(): void;
  removeLast(): void;
}

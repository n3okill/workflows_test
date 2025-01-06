import { ICollectionNode } from "../base/collection.node.interface.ts";

export interface ILinkedListNode<T> extends ICollectionNode<T> {
  get prev(): ILinkedListNode<T> | undefined;
  set prev(node: ILinkedListNode<T> | undefined);
}

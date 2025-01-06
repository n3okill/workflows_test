export interface ICollectionNode<T> extends Disposable {
  get data(): T;
  get next(): ICollectionNode<T> | undefined;
  set next(node: ICollectionNode<T> | undefined);
}

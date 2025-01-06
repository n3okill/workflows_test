export interface ICollection<T> extends Iterable<T>, Disposable {
  get size(): number;
  /**
   * Removes all elements from the queue or stack.
   */
  clear(): void;

  /**
   * Determines if the queue or stack contains the specified element.
   * @param data the element to search for
   * @returns true if the element is found, false otherwise
   */
  contains(data: T): boolean;

  /**
   * Converts the queue or stack to an array.
   * @returns An array containing all the elements in the queue or stack.
   */
  toArray(): Array<T>;
}

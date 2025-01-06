import { ICollection } from "../base/collection.interface.ts";

export interface IStack<T> extends ICollection<T> {
  /**
   * Returns the first element of the queue or stack without removing it.
   * @throws {Error} if the queue is empty
   * @returns {T} The element at the front of the queue.
   */

  peek(): T;

  /**
   * Removes and returns the top element of the queue or stack.
   * @throws {Error} if the queue is empty
   */
  pop(): T;

  /**
   * Adds an element to the queue or stack.
   */
  push(data: T): void;

  /**
   * Attempts to remove and return the top element of the queue or stack.
   *
   * @returns A tuple where the first element is a boolean indicating success,
   *          and the second element is the data if successful.
   *          [false] if the queue or stack is empty, otherwise [true, item].
   */
  tryPop(): [false] | [true, T];

  /**
   * Attempts to return the first element of the queue or stack without removing it.
   *
   * @returns A tuple where the first element is a boolean indicating success,
   *          and the second element is the data if successful.
   *          [false] if the queue or stack is empty, otherwise [true, item].
   */
  tryPeek(): [false] | [true, T];
}

export type ILifo<T> = IStack<T>;

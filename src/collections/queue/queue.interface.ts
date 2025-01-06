import { ICollection } from "../base/collection.interface.ts";

export interface IQueue<T> extends ICollection<T> {
  /**
   * Removes the element at the front of the queue.
   *
   * @throws {Error} If the queue is empty.
   * @returns {T} The element at the front of the queue.
   */
  dequeue(): T;

  /**
   * Adds an element to the end of the queue.
   *
   * @param data - The data to be added to the queue.
   */
  enqueue(data: T): void;

  /**
   * Removes the element at the front of the queue and immediately adds the provided element to the end of the queue.
   *
   * @param data - The data to be added to the end of the queue.
   * @throws {Error} if the queue is empty
   * @returns {T} The element that was removed from the front of the queue.
   */
  dequeueEnqueue(data: T): T;

  /**
   * Adds an element to the end of the queue and immediately removes the element from the front.
   *
   * @param data - The data to be added to the queue.
   * @returns {T} The element that was removed from the front of the queue.
   */
  enqueueDequeue(data: T): T;

  /**
   * Returns the first element of the queue or stack without removing it.
   * @throws {Error} if the queue is empty
   * @returns {T} The element at the front of the queue.
   */

  peek(): T;

  /**
   * Attempts to remove and return the top element of the queue or stack.
   *
   * @returns A tuple where the first element is a boolean indicating success,
   *          and the second element is the data if successful.
   *          [false] if the queue or stack is empty, otherwise [true, item].
   */
  tryDequeue(): [false] | [true, T];

  /**
   * Attempts to return the first element of the queue or stack without removing it.
   *
   * @returns A tuple where the first element is a boolean indicating success,
   *          and the second element is the data if successful.
   *          [false] if the queue or stack is empty, otherwise [true, item].
   */
  tryPeek(): [false] | [true, T];
}

export type IFifo<T> = IQueue<T>;

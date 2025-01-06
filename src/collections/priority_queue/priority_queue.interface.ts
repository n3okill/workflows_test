import { ICollection } from "../base/collection.interface.ts";

export interface IPriorityQueue<TElement, TPriority> extends ICollection<[TElement, TPriority]> {
  /**
   * Removes the element at the front of the queue.
   *
   * @throws {Error} If the queue is empty.
   * @returns {TElement} The element at the front of the queue.
   */
  dequeue(): TElement;

  /**
   * Adds an element to the end of the queue.
   *
   * @param data - The data to be added to the queue.
   */
  enqueue(data: TElement, priority: TPriority): void;

  /**
   * Removes the element at the front of the queue and immediately adds the provided element to the end of the queue.
   *
   * @param data - The data to be added to the end of the queue.
   * @throws {Error} if the queue is empty
   * @returns {TElement} The element that was removed from the front of the queue.
   */
  dequeueEnqueue(data: TElement, priority: TPriority): TElement;

  /**
   * Adds an element to the end of the queue and immediately removes the element from the front.
   *
   * @param data - The data to be added to the queue.
   * @returns {TElement} The element that was removed from the front of the queue.
   */
  enqueueDequeue(data: TElement, priority: TPriority): TElement;

  /**
   * Enqueues a sequence of element/priority pairs to the <see cref="PriorityQueue{TElement, TPriority}"/>.
   * @param items The pairs of elements and priorities to add to the queue.
   */
  enqueueRange(items: Iterable<[TElement, TPriority]>): void;

  /**
   * Returns the first element of the queue or stack without removing it.
   * @throws {Error} if the queue is empty
   * @returns {TElement} The element at the front of the queue.
   */

  peek(): TElement;

  /**
   * Attempts to remove and return the top element of the queue or stack.
   *
   * @returns A tuple where the first element is a boolean indicating success,
   *          and the second element is the data if successful.
   *          [false] if the queue or stack is empty, otherwise [true, item].
   */

  remove(item: TElement): [TElement, TPriority] | undefined;

  tryDequeue(): [false] | [true, TElement];

  /**
   * Attempts to return the first element of the queue or stack without removing it.
   *
   * @returns A tuple where the first element is a boolean indicating success,
   *          and the second element is the data if successful.
   *          [false] if the queue or stack is empty, otherwise [true, item].
   */
  tryPeek(): [false] | [true, TElement];
}

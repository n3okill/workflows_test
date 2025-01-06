import { describe, test } from "node:test";
import * as assert from "node:assert/strict";
import {
  CollectionChangedException,
  EmptyQueueException,
  IComparer,
  IPriorityQueue,
  PriorityQueue,
  Queue,
} from "../src";

describe("Priority Queue", () => {
  function createSmallPriorityQueue() {
    return new PriorityQueue([
      ["one", 1],
      ["two", 2],
      ["three", 3],
    ]);
  }
  function createPriorityQueue(count: number) {
    const arr: Array<[number, number]> = Array.from({ length: count }, (_, i) => [i, i]);
    return new PriorityQueue(arr);
  }

  describe("enqueueDequeue", () => {
    test("empty", () => {
      const queue = new PriorityQueue();
      assert.strictEqual(queue.enqueueDequeue("hello", 42), "hello");
    });
    test("smaller than min", () => {
      const queue = createSmallPriorityQueue();
      assert.strictEqual(queue.enqueueDequeue("zero", 0), "zero");
      assert.strictEqual(queue.dequeue(), "one");
      assert.strictEqual(queue.dequeue(), "two");
      assert.strictEqual(queue.dequeue(), "three");
    });

    test("larger than min", () => {
      const queue = createSmallPriorityQueue();
      assert.strictEqual(queue.enqueueDequeue("four", 4), "one");
      assert.strictEqual(queue.dequeue(), "two");
      assert.strictEqual(queue.dequeue(), "three");
      assert.strictEqual(queue.dequeue(), "four");
    });
    test("equal to min", () => {
      const queue = createSmallPriorityQueue();
      assert.strictEqual(queue.enqueueDequeue("one-to-enqueue", 1), "one");
      assert.strictEqual(queue.dequeue(), "one-to-enqueue");
      assert.strictEqual(queue.dequeue(), "two");
      assert.strictEqual(queue.dequeue(), "three");
    });
  });
  describe("dequeueEnqueue", () => {
    test("empty should throw", () => {
      const queue = new PriorityQueue();
      assert.throws(() => queue.dequeueEnqueue("hello", 42), EmptyQueueException);
    });
    test("smaller than min", () => {
      const queue = createSmallPriorityQueue();
      assert.strictEqual(queue.dequeueEnqueue("zero", 0), "one");
      assert.strictEqual(queue.dequeue(), "zero");
      assert.strictEqual(queue.dequeue(), "two");
      assert.strictEqual(queue.dequeue(), "three");
    });

    test("larger than min", () => {
      const queue = createSmallPriorityQueue();
      assert.strictEqual(queue.dequeueEnqueue("four", 4), "one");
      assert.strictEqual(queue.dequeue(), "two");
      assert.strictEqual(queue.dequeue(), "three");
      assert.strictEqual(queue.dequeue(), "four");
    });
    test("equal to min", () => {
      const queue = createSmallPriorityQueue();
      assert.strictEqual(queue.dequeueEnqueue("one-to-enqueue", 1), "one");
      assert.strictEqual(queue.dequeue(), "one-to-enqueue");
      assert.strictEqual(queue.dequeue(), "two");
      assert.strictEqual(queue.dequeue(), "three");
    });
  });
  describe("enqueueRange", () => {
    test("empty", () => {
      const queue = new PriorityQueue();
      queue.enqueueRange([
        ["one", 1],
        ["two", 2],
        ["three", 3],
      ]);
      assert.deepStrictEqual(queue.toArray(), [
        ["one", 1],
        ["two", 2],
        ["three", 3],
      ]);
    });
  });
  describe("remove", () => {
    test("empty should return undefined", () => {
      const queue = new PriorityQueue();
      assert.strictEqual(queue.remove("value"), undefined);
    });
    test("matching element", () => {
      const queue = new PriorityQueue();
      queue.enqueueRange([
        ["value0", 0],
        ["value1", 1],
        ["value2", 2],
      ]);
      const removedElement = queue.remove("value1");
      assert.deepStrictEqual(removedElement, ["value1", 1]);
      assert.strictEqual(queue.size, 2);
    });
    test("mismatch element", () => {
      const queue = new PriorityQueue();
      queue.enqueueRange([
        ["value0", 0],
        ["value1", 1],
        ["value2", 2],
      ]);
      const removedElement = queue.remove("value4");
      assert.deepStrictEqual(removedElement, undefined);
      assert.strictEqual(queue.size, 3);
    });
    test("duplicate element", () => {
      const queue = new PriorityQueue();
      queue.enqueueRange([
        ["value0", 0],
        ["value1", 1],
        ["value0", 2],
      ]);
      const removedElement = queue.remove("value0");
      assert.deepStrictEqual(removedElement, ["value0", 0]);
      assert.strictEqual(queue.size, 2);
    });
  });
  describe("dequeue", () => {
    test("empty should throw", () => {
      const queue = new PriorityQueue();
      assert.deepStrictEqual(queue.tryDequeue(), [false]);
      assert.throws(() => queue.dequeue(), EmptyQueueException);
    });
  });
  describe("peek", () => {
    test("empty should throw", () => {
      const queue = new PriorityQueue();
      assert.deepStrictEqual(queue.tryPeek(), [false]);
      assert.throws(() => queue.peek(), EmptyQueueException);
    });
  });
  describe("iteration", () => {
    function* nonModifyingOperations(): Generator<[string, CallableFunction, number]> {
      yield ["peek", (queue: IPriorityQueue<number, number>) => queue.peek(), 1];
      yield ["tryPeek", (queue: IPriorityQueue<number, number>) => queue.tryPeek(), 1];
      yield ["tryDequeue", (queue: IPriorityQueue<number, number>) => queue.tryDequeue(), 0];
      yield [
        "enqueueDequeue 1",
        (queue: IPriorityQueue<number, number>) => queue.enqueueDequeue(5, Number.MIN_SAFE_INTEGER),
        1,
      ];
      yield [
        "enqueueDequeue 0",
        (queue: IPriorityQueue<number, number>) => queue.enqueueDequeue(5, Number.MAX_SAFE_INTEGER),
        0,
      ];
      yield ["enqueueRange", (queue: IPriorityQueue<number, number>) => queue.enqueueRange([]), 5];
    }

    function* modifyingOperations(): Generator<[string, CallableFunction, number]> {
      yield ["enqueue", (queue: IPriorityQueue<number, number>) => queue.enqueue(42, 0), 0];
      yield ["dequeue", (queue: IPriorityQueue<number, number>) => queue.dequeue(), 5];
      yield ["tryDequeue", (queue: IPriorityQueue<number, number>) => queue.tryDequeue(), 5];
      yield [
        "enqueueDequeue",
        (queue: IPriorityQueue<number, number>) => queue.enqueueDequeue(5, Number.MAX_SAFE_INTEGER),
        5,
      ];
      yield ["enqueueRange 0", (queue: IPriorityQueue<number, number>) => queue.enqueueRange([[1, 2]]), 0];
      yield ["enqueueRange 10", (queue: IPriorityQueue<number, number>) => queue.enqueueRange([[1, 2]]), 10];
      yield ["clear", (queue: IPriorityQueue<number, number>) => queue.clear(), 5];
      yield ["clear", (queue: IPriorityQueue<number, number>) => queue.clear(), 0];
    }
    test("valid on non modifying operations", async (t) => {
      for (const operation of nonModifyingOperations()) {
        await t.test(`operation: ${operation[0]}`, () => {
          const queue = createPriorityQueue(operation[2]);
          const iterator = queue[Symbol.iterator]();
          operation[1](queue);
          assert.ok(iterator.next());
        });
      }
    });
    test("invalidation on modifying operations", async (t) => {
      for (const operation of modifyingOperations()) {
        await t.test(`operation: ${operation[0]}`, () => {
          const queue = createPriorityQueue(operation[2]);
          const iterator = queue[Symbol.iterator]();
          operation[1](queue);
          assert.throws(() => iterator.next(), CollectionChangedException);
        });
      }
    });
  });
  test("Dijkstra", () => {
    class Edge {
      constructor(
        public readonly neighbor: number,
        public readonly weight: number,
      ) {}
    }
    class Graph {
      constructor(public readonly nodes: Array<Array<Edge>>) {}
    }

    function runDijkstra(graph: Graph, startNode: number) {
      const distances = Array.from({ length: graph.nodes.length }, () => Number.MAX_SAFE_INTEGER);
      const queue = new PriorityQueue<number, number>();

      // eslint-disable-next-line security/detect-object-injection
      distances[startNode] = 0;
      queue.enqueue(startNode, 0);

      do {
        const nodeId = queue.dequeue();
        // eslint-disable-next-line security/detect-object-injection
        const nodeDistance = distances[nodeId];

        // eslint-disable-next-line security/detect-object-injection
        for (const edge of graph.nodes[nodeId]) {
          const distance = distances[edge.neighbor];
          const newDistance = nodeDistance + edge.weight;
          if (newDistance < distance) {
            distances[edge.neighbor] = newDistance;
            // Simulate priority update by attempting to remove the entry
            // before re-inserting it with the new distance.
            queue.remove(edge.neighbor);
            queue.enqueue(edge.neighbor, newDistance);
          }
        }
      } while (queue.size > 0);
      return distances.map((distance, index) => [index, distance]);
    }

    const graph = new Graph([
      [new Edge(1, 7), new Edge(2, 9), new Edge(5, 14)],
      [new Edge(0, 7), new Edge(2, 10), new Edge(3, 15)],
      [new Edge(0, 9), new Edge(1, 10), new Edge(3, 11), new Edge(5, 2)],
      [new Edge(1, 15), new Edge(2, 11), new Edge(4, 6)],
      [new Edge(3, 6), new Edge(5, 9)],
      [new Edge(0, 14), new Edge(2, 2), new Edge(4, 9)],
    ]);
    const startNode = 0;
    const expectedDistances = [
      [0, 0],
      [1, 7],
      [2, 9],
      [3, 20],
      [4, 20],
      [5, 11],
    ];
    const actualDistances = runDijkstra(graph, startNode);
    assert.deepStrictEqual(actualDistances, expectedDistances);
  });
  test("Complex", () => {
    class Item {
      constructor(
        public readonly name: string,
        public readonly date: Date,
        public readonly priority: Priority,
        public readonly workDays: number,
      ) {}
    }
    class WorkItem {
      constructor(
        public readonly item: Item,
        public workDays: number,
      ) {}
    }

    enum Priority {
      Critical,
      High,
      Normal,
    }
    const data: Array<Item> = [
      new Item("clean code", new Date(2025, 0, 4), Priority.Normal, 5),
      new Item("refactoring", new Date(2025, 0, 5), Priority.High, 3),
      new Item("design patterns", new Date(2025, 0, 9), Priority.Critical, 5),
      new Item("domain-driven design", new Date(2025, 0, 11), Priority.Normal, 3),
      new Item("object-oriented", new Date(2025, 0, 12), Priority.Critical, 6),
      new Item("test-driven", new Date(2025, 0, 13), Priority.High, 4),
      new Item("the art of computer", new Date(2025, 0, 14), Priority.High, 2),
      new Item("the pragmatic programmer", new Date(2025, 0, 18), Priority.Normal, 4),
      new Item("code complete", new Date(2025, 0, 19), Priority.Normal, 1),
      new Item("patterns of enterprise", new Date(2025, 0, 20), Priority.Critical, 4),
      new Item("the mythical", new Date(2025, 0, 25), Priority.Normal, 1),
      new Item("the clean architecture", new Date(2025, 0, 26), Priority.High, 6),
      new Item("build a large", new Date(2025, 0, 27), Priority.Critical, 3),
      new Item("programming pearls", new Date(2025, 0, 30), Priority.Normal, 6),
    ];

    function* workDays() {
      const date = new Date(2024, 11, 31);
      while (true) {
        yield new Date(date.setDate(date.getDate() + 1));
      }
    }

    class SortOrder {
      constructor(
        public readonly priority: Priority,
        public readonly date: Date,
        public readonly sequence,
      ) {}
    }

    class SortOrderComparer implements IComparer<SortOrder> {
      compare(x: SortOrder, y: SortOrder): number {
        return x.priority !== y.priority
          ? x.priority > y.priority
            ? 1
            : -1
          : x.date.getTime() !== y.date.getTime()
            ? x.date.getTime() > y.date.getTime()
              ? 1
              : -1
            : x.sequence >= y.sequence
              ? x.sequence > y.sequence
                ? 1
                : 0
              : -1;
      }
    }

    class QueueItem {
      constructor(
        public readonly item: WorkItem,
        public readonly sortOrder: SortOrder,
      ) {}
    }

    const dayIterator = workDays();
    let day;

    let currentTask: WorkItem | undefined = undefined;
    let currentSortOrder: SortOrder;
    let sequence = 0;

    const incomingItems = new Queue<{ initiated: Date; task: WorkItem; priority: Priority }>(
      data.map((item) => {
        return {
          initiated: item.date,
          task: new WorkItem(item, item.workDays),
          priority: item.priority,
        };
      }),
    );

    const workQueue = new PriorityQueue<QueueItem, SortOrder>([], new SortOrderComparer());

    const resultSequence: Array<number> = [];
    function reportCompletion(task: WorkItem, date: Date, currentSort: SortOrder) {
      resultSequence.push(currentSort?.sequence);
      /* console.log(
                `${date.toLocaleDateString()}\t${task.item.date.toLocaleDateString()}\t${task.item.priority}\t[${curretSort?.sequence}]\t${task.item.name}`,
            );*/
    }

    function completeCurrentTask() {
      if (currentTask === undefined || currentTask.workDays > 0) {
        return;
      }
      reportCompletion(currentTask, day.value, currentSortOrder);
      currentTask = undefined;
    }

    function acceptIncomingItems(date: Date, sequence: number) {
      while (incomingItems.size > 0 && incomingItems.peek().initiated <= date) {
        const { task, priority, initiated } = incomingItems.dequeue();
        const sortOrder = new SortOrder(priority, initiated, ++sequence);
        workQueue.enqueue(new QueueItem(task, sortOrder), sortOrder);
      }
      return sequence;
    }

    function preemptCurrentTask() {
      if (currentTask === undefined) {
        return;
      }
      if (currentSortOrder?.priority === Priority.Critical) {
        return;
      }
      if (workQueue.size === 0) {
        return;
      }
      if (workQueue.peek().sortOrder.priority !== Priority.Critical) {
        return;
      }
      workQueue.enqueue(new QueueItem(currentTask, currentSortOrder), currentSortOrder);
      currentTask = undefined;
    }

    function startNewTask() {
      if (currentTask !== undefined) {
        return;
      }
      if (workQueue.size === 0) {
        return;
      }
      ({ item: currentTask, sortOrder: currentSortOrder } = workQueue.dequeue());
    }

    function workOnCurrentTask() {
      if (currentTask !== undefined) {
        currentTask.workDays--;
      }
    }

    while (currentTask !== undefined || incomingItems.size > 0) {
      day = dayIterator.next();

      completeCurrentTask();
      sequence = acceptIncomingItems(day.value, sequence);
      preemptCurrentTask();
      startNewTask();
      workOnCurrentTask();
    }

    assert.deepStrictEqual(resultSequence, [1, 3, 5, 10, 2, 13, 6, 7, 12, 4, 8, 9, 11, 14]);
  });
});

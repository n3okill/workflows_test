import { describe, test } from "node:test";
import * as assert from "node:assert/strict";
import { ILinkedListNode, LinkedList } from "../../src";
import { arraySize, headItems, headItemsReverse, tailItems } from "./common";

describe("addAfter", () => {
  test("basic", () => {
    const list = new LinkedList<number>();
    list.addFirst(headItems[0]);
    list.addAfter(list.first, 0);
    assert.strictEqual(list.size, 2);
    assert.deepStrictEqual(Array.from(list), [headItems[0], 0]);
  });
  test("Node is the Head", () => {
    const list = new LinkedList<number>();
    list.addFirst(headItems[0]);
    const tempItems = headItems.slice(1).reverse();
    tempItems.unshift(headItems[0]);

    for (let i = 1; i < arraySize; i++) {
      // eslint-disable-next-line security/detect-object-injection
      list.addAfter(list.first, headItems[i]);
    }
    assert.strictEqual(list.size, arraySize);
    assert.deepStrictEqual(Array.from(list), tempItems);
  });
  test("Node is the Tail", () => {
    const list = new LinkedList<number>();
    list.addFirst(headItems[0]);
    for (let i = 1; i < arraySize; i++) {
      // eslint-disable-next-line security/detect-object-injection, @typescript-eslint/no-non-null-assertion
      list.addAfter(list.last!, headItems[i]);
    }
    assert.strictEqual(list.size, arraySize);
    assert.deepStrictEqual(Array.from(list), headItems);
  });
  test("Node is after the Head", () => {
    const list = new LinkedList<number>();
    list.addFirst(headItems[0]);
    list.addLast(headItems[1]);

    const tempItems = headItems.slice(2).reverse();
    tempItems.unshift(headItems[1]);
    tempItems.unshift(headItems[0]);

    for (let i = 2; i < arraySize; i++) {
      // eslint-disable-next-line security/detect-object-injection
      list.addAfter(list.first.next as ILinkedListNode<number>, headItems[i]);
    }
    assert.strictEqual(list.size, tempItems.length);
    assert.deepStrictEqual(Array.from(list), tempItems);
  });
  test("Node is before the Tail", () => {
    const list = new LinkedList<number>();
    list.addFirst(headItems[0]);
    list.addLast(headItems[1]);

    const tempItems = headItems.slice(2);
    tempItems.unshift(headItems[0]);
    tempItems.push(headItems[1]);

    for (let i = 2; i < arraySize; i++) {
      // eslint-disable-next-line security/detect-object-injection, @typescript-eslint/no-non-null-assertion
      list.addAfter(list.last!.prev as ILinkedListNode<number>, headItems[i]);
    }
    assert.strictEqual(list.size, tempItems.length);
    assert.deepStrictEqual(Array.from(list), tempItems);
  });
  test("Node is somewhere in the middle", () => {
    const list = new LinkedList<number>();
    list.addFirst(headItems[0]);
    list.addLast(headItems[1]);
    list.addLast(headItems[2]);

    const tempItems = headItems.slice(3);
    tempItems.unshift(headItems[0]);
    tempItems.push(headItems[1]);
    tempItems.push(headItems[2]);

    for (let i = 3; i < arraySize; i++) {
      // eslint-disable-next-line security/detect-object-injection, @typescript-eslint/no-non-null-assertion
      list.addAfter(list.last!.prev!.prev!, headItems[i]);
    }
    assert.strictEqual(list.size, tempItems.length);
    assert.deepStrictEqual(Array.from(list), tempItems);
  });
  test("Call AddAfter several times remove some of the items", () => {
    const list = new LinkedList<number>();
    list.addFirst(headItems[0]);
    for (let i = 1; i < arraySize; i++) {
      // eslint-disable-next-line security/detect-object-injection, @typescript-eslint/no-non-null-assertion
      list.addAfter(list.last!, headItems[i]);
    }
    list.remove(headItems[2]);
    list.remove(headItems[headItems.length - 3]);
    list.remove(headItems[1]);
    list.remove(headItems[headItems.length - 2]);
    list.removeFirst();
    list.removeLast();
    const tempItems = headItems.slice(3, headItems.length - 3);
    assert.strictEqual(list.size, tempItems.length);
    assert.deepStrictEqual(Array.from(list), tempItems);

    for (let i = 0; i < arraySize; i++) {
      // eslint-disable-next-line security/detect-object-injection, @typescript-eslint/no-non-null-assertion
      list.addAfter(list.last!, tailItems[i]);
    }
    const tempItems2 = [...tempItems, ...tailItems];
    assert.strictEqual(list.size, tempItems2.length);
    assert.deepStrictEqual(Array.from(list), tempItems2);
  });
  test("Call AddAfter several times remove all of the items", () => {
    const list = new LinkedList<number>();
    list.addFirst(headItems[0]);
    for (let i = 1; i < arraySize; i++) {
      // eslint-disable-next-line security/detect-object-injection, @typescript-eslint/no-non-null-assertion
      list.addAfter(list.last!, headItems[i]);
    }
    for (let i = 0; i < arraySize; ++i) {
      list.removeFirst();
    }
    list.addFirst(tailItems[0]);
    for (let i = 1; i < arraySize; i++) {
      // eslint-disable-next-line security/detect-object-injection, @typescript-eslint/no-non-null-assertion
      list.addAfter(list.last!, tailItems[i]);
    }
    assert.strictEqual(list.size, tailItems.length);
    assert.deepStrictEqual(Array.from(list), tailItems);
  });
  test("Call AddAfter several times then call Clear", () => {
    const list = new LinkedList<number>();
    list.addFirst(headItems[0]);
    for (let i = 1; i < arraySize; i++) {
      // eslint-disable-next-line security/detect-object-injection, @typescript-eslint/no-non-null-assertion
      list.addAfter(list.last!, headItems[i]);
    }
    list.clear();
    assert.strictEqual(list.size, 0);

    list.addFirst(tailItems[0]);
    for (let i = 1; i < arraySize; i++) {
      // eslint-disable-next-line security/detect-object-injection, @typescript-eslint/no-non-null-assertion
      list.addAfter(list.last!, tailItems[i]);
    }
    assert.strictEqual(list.size, tailItems.length);
    assert.deepStrictEqual(Array.from(list), tailItems);
  });
  test("Mix AddBefore and AddAfter calls", () => {
    const list = new LinkedList<number>();
    list.addLast(headItems[0]);
    list.addLast(tailItems[0]);

    for (let i = 1; i < arraySize; ++i) {
      // eslint-disable-next-line security/detect-object-injection, @typescript-eslint/no-non-null-assertion
      list.addBefore(list.first!, headItems[i]);
      // eslint-disable-next-line security/detect-object-injection, @typescript-eslint/no-non-null-assertion
      list.addAfter(list.last!, tailItems[i]);
    }
    const tempItems = [...headItemsReverse, ...tailItems];
    assert.strictEqual(list.size, tempItems.length);
    assert.deepStrictEqual(Array.from(list), tempItems);
  });
});

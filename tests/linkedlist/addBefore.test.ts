import { describe, test } from "node:test";
import * as assert from "node:assert/strict";
import { ILinkedListNode, LinkedList } from "../../src";
import { arraySize, headItems, headItemsReverse, tailItems, tailItemsReverse } from "./common";

describe("addBefore", () => {
  test("basic", () => {
    const list = new LinkedList<number>();
    list.addFirst(headItems[0]);
    list.addBefore(list.first, 0);
    assert.strictEqual(list.size, 2);
    assert.deepStrictEqual(Array.from(list), [0, headItems[0]]);
  });
  test("Node is the Head", () => {
    const list = new LinkedList<number>();
    list.addFirst(headItems[0]);

    for (let i = 1; i < arraySize; i++) {
      // eslint-disable-next-line security/detect-object-injection
      list.addBefore(list.first, headItems[i]);
    }
    assert.strictEqual(list.size, arraySize);
    assert.deepStrictEqual(Array.from(list), headItemsReverse);
  });
  test("Node is the Tail", () => {
    const list = new LinkedList<number>();
    list.addFirst(headItems[0]);
    for (let i = 1; i < arraySize; i++) {
      // eslint-disable-next-line security/detect-object-injection, @typescript-eslint/no-non-null-assertion
      list.addBefore(list.last!, headItems[i]);
    }
    const tempItems = headItems.slice(1);
    tempItems.push(headItems[0]);

    assert.strictEqual(list.size, arraySize);
    assert.deepStrictEqual(Array.from(list), tempItems);
  });
  test("Node is after the Head", () => {
    const list = new LinkedList<number>();
    list.addFirst(headItems[0]);
    list.addLast(headItems[1]);

    const tempItems = headItems.slice(2).reverse();
    tempItems.unshift(headItems[0]);
    tempItems.push(headItems[1]);

    for (let i = 2; i < arraySize; i++) {
      // eslint-disable-next-line security/detect-object-injection, @typescript-eslint/no-non-null-assertion
      list.addBefore(list.first!.next! as ILinkedListNode<number>, headItems[i]);
    }

    assert.strictEqual(list.size, tempItems.length);
    assert.deepStrictEqual(Array.from(list), tempItems);
  });
  test("Node is before the Tail", () => {
    const list = new LinkedList<number>();
    list.addFirst(headItems[0]);
    list.addLast(headItems[1]);

    const tempItems = headItems.slice(2);
    tempItems.push(headItems[0]);
    tempItems.push(headItems[1]);

    for (let i = 2; i < arraySize; i++) {
      // eslint-disable-next-line security/detect-object-injection, @typescript-eslint/no-non-null-assertion
      list.addBefore(list.last!.prev!, headItems[i]);
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
    tempItems.push(headItems[0]);
    tempItems.push(headItems[1]);
    tempItems.push(headItems[2]);

    for (let i = 3; i < arraySize; i++) {
      // eslint-disable-next-line security/detect-object-injection, @typescript-eslint/no-non-null-assertion
      list.addBefore(list.last!.prev!.prev!, headItems[i]);
    }
    assert.strictEqual(list.size, tempItems.length);
    assert.deepStrictEqual(Array.from(list), tempItems);
  });
  test("Call addBefore several times remove some of the items", () => {
    const list = new LinkedList<number>();
    list.addFirst(headItems[0]);
    for (let i = 1; i < arraySize; i++) {
      // eslint-disable-next-line security/detect-object-injection, @typescript-eslint/no-non-null-assertion
      list.addBefore(list.first!, headItems[i]);
    }
    list.remove(headItems[2]);
    list.remove(headItems[headItems.length - 3]);
    list.remove(headItems[1]);
    list.remove(headItems[headItems.length - 2]);
    list.removeFirst();
    list.removeLast();
    const tempItems = headItemsReverse.slice(3, headItemsReverse.length - 3);
    assert.strictEqual(list.size, tempItems.length);
    assert.deepStrictEqual(Array.from(list), tempItems);

    for (let i = 0; i < arraySize; i++) {
      // eslint-disable-next-line security/detect-object-injection, @typescript-eslint/no-non-null-assertion
      list.addBefore(list.first!, tailItems[i]);
    }
    const tempItems2 = [...tailItemsReverse, ...tempItems];
    assert.strictEqual(list.size, tempItems2.length);
    assert.deepStrictEqual(Array.from(list), tempItems2);
  });
  test("Call addBefore several times remove all of the items", () => {
    const list = new LinkedList<number>();
    list.addFirst(headItems[0]);
    for (let i = 1; i < arraySize; i++) {
      // eslint-disable-next-line security/detect-object-injection, @typescript-eslint/no-non-null-assertion
      list.addBefore(list.first!, headItems[i]);
    }
    for (let i = 0; i < arraySize; ++i) {
      list.removeFirst();
    }
    list.addFirst(tailItems[0]);
    for (let i = 1; i < arraySize; i++) {
      // eslint-disable-next-line security/detect-object-injection, @typescript-eslint/no-non-null-assertion
      list.addBefore(list.first!, tailItems[i]);
    }
    assert.strictEqual(list.size, tailItemsReverse.length);
    assert.deepStrictEqual(Array.from(list), tailItemsReverse);
  });
  test("Call addBefore several times then call Clear", () => {
    const list = new LinkedList<number>();
    list.addFirst(headItems[0]);
    for (let i = 1; i < arraySize; i++) {
      // eslint-disable-next-line security/detect-object-injection, @typescript-eslint/no-non-null-assertion
      list.addBefore(list.first!, headItems[i]);
    }
    list.clear();
    assert.strictEqual(list.size, 0);

    list.addFirst(tailItems[0]);
    for (let i = 1; i < arraySize; i++) {
      // eslint-disable-next-line security/detect-object-injection, @typescript-eslint/no-non-null-assertion
      list.addBefore(list.first!, tailItems[i]);
    }
    assert.strictEqual(list.size, tailItemsReverse.length);
    assert.deepStrictEqual(Array.from(list), tailItemsReverse);
  });
  test("Mix AddBefore and addBefore calls", () => {
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

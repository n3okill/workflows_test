import { describe, test } from "node:test";
import * as assert from "node:assert/strict";
import { arraySize, headItems, headItemsReverse, tailItems, tailItemsReverse } from "./common";
import { LinkedList } from "../../src";

describe("addAfter", () => {
  test("basic", () => {
    const list = new LinkedList<number>();
    list.addFirst(headItems[0]);
    assert.strictEqual(list.size, 1);
    assert.deepStrictEqual(Array.from(list), [headItems[0]]);
  });
  test("Call addFirst several times", () => {
    const list = new LinkedList<number>();

    for (let i = 0; i < arraySize; i++) {
      // eslint-disable-next-line security/detect-object-injection
      list.addFirst(headItems[i]);
    }
    assert.strictEqual(list.size, arraySize);
    assert.deepStrictEqual(Array.from(list), headItemsReverse);
  });
  test("Call addFirst several times remove some of the items", () => {
    const list = new LinkedList<number>();
    for (let i = 0; i < arraySize; i++) {
      // eslint-disable-next-line security/detect-object-injection
      list.addFirst(headItems[i]);
    }
    list.remove(headItems[2]);
    list.remove(headItems[1]);
    list.remove(headItems[headItems.length - 3]);
    list.remove(headItems[headItems.length - 2]);
    list.removeFirst();
    list.removeLast();

    const tempItems = headItemsReverse.slice(3, headItemsReverse.length - 3);

    assert.strictEqual(list.size, tempItems.length);
    assert.deepStrictEqual(Array.from(list), tempItems);

    for (let i = 0; i < arraySize; i++) {
      // eslint-disable-next-line security/detect-object-injection
      list.addFirst(tailItems[i]);
    }
    const tempItems2 = [...tailItemsReverse, ...tempItems];
    assert.strictEqual(list.size, tempItems2.length);
    assert.deepStrictEqual(Array.from(list), tempItems2);
  });

  test("Call addFirst several times then call Clear", () => {
    const list = new LinkedList<number>();
    for (let i = 0; i < arraySize; i++) {
      // eslint-disable-next-line security/detect-object-injection
      list.addFirst(headItems[i]);
    }
    list.clear();
    assert.strictEqual(list.size, 0);

    for (let i = 0; i < arraySize; i++) {
      // eslint-disable-next-line security/detect-object-injection
      list.addFirst(tailItems[i]);
    }
    assert.strictEqual(list.size, tailItemsReverse.length);
    assert.deepStrictEqual(Array.from(list), tailItemsReverse);
  });
  test("Mix addFirst and addLast calls", () => {
    const list = new LinkedList<number>();

    for (let i = 0; i < arraySize; ++i) {
      // eslint-disable-next-line security/detect-object-injection
      list.addFirst(headItems[i]);
      // eslint-disable-next-line security/detect-object-injection
      list.addLast(tailItems[i]);
    }
    const tempItems = [...headItemsReverse, ...tailItems];
    assert.strictEqual(list.size, tempItems.length);
    assert.deepStrictEqual(Array.from(list), tempItems);
  });
});

import { describe, test } from "node:test";
import * as assert from "node:assert/strict";
import { LinkedList } from "../../src";
import { arraySize, headItems, headItemsReverse, tailItems } from "./common";

describe("addLast", () => {
  test("basic", () => {
    const list = new LinkedList<number>();
    list.addLast(headItems[0]);
    assert.strictEqual(list.size, 1);
    assert.deepStrictEqual(Array.from(list), [headItems[0]]);
  });
  test("Call addLast several times", () => {
    const list = new LinkedList<number>();

    for (let i = 0; i < arraySize; i++) {
      // eslint-disable-next-line security/detect-object-injection
      list.addLast(headItems[i]);
    }
    assert.strictEqual(list.size, arraySize);
    assert.deepStrictEqual(Array.from(list), headItems);
  });
  test("Call addLast several times remove some of the items", () => {
    const list = new LinkedList<number>();
    for (let i = 0; i < arraySize; i++) {
      // eslint-disable-next-line security/detect-object-injection
      list.addLast(headItems[i]);
    }
    list.remove(headItems[2]);
    list.remove(headItems[1]);
    list.remove(headItems[headItems.length - 3]);
    list.remove(headItems[headItems.length - 2]);
    list.removeFirst();
    list.removeLast();

    const tempItems = headItems.slice(3, headItems.length - 3);

    assert.strictEqual(list.size, tempItems.length);
    assert.deepStrictEqual(Array.from(list), tempItems);

    for (let i = 0; i < arraySize; i++) {
      // eslint-disable-next-line security/detect-object-injection
      list.addLast(tailItems[i]);
    }
    const tempItems2 = [...tempItems, ...tailItems];
    assert.strictEqual(list.size, tempItems2.length);
    assert.deepStrictEqual(Array.from(list), tempItems2);
  });

  test("Call addLast several times then call Clear", () => {
    const list = new LinkedList<number>();
    for (let i = 0; i < arraySize; i++) {
      // eslint-disable-next-line security/detect-object-injection
      list.addLast(headItems[i]);
    }
    list.clear();
    assert.strictEqual(list.size, 0);

    for (let i = 0; i < arraySize; i++) {
      // eslint-disable-next-line security/detect-object-injection
      list.addLast(tailItems[i]);
    }
    assert.strictEqual(list.size, tailItems.length);
    assert.deepStrictEqual(Array.from(list), tailItems);
  });
  test("Mix addLast and addLast calls", () => {
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

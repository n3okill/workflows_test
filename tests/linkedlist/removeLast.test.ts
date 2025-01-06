import { describe, test } from "node:test";
import * as assert from "node:assert/strict";
import { LinkedList } from "../../src";
import { arraySize, headItems } from "./common";

describe("removeLast", () => {
  test("Call removeLast on a collection with one item in it", () => {
    const list = new LinkedList<number>();
    list.addLast(headItems[0]);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const tempNode = list.last!;
    list.removeLast();
    assert.strictEqual(list.size, 0);
    assert.strictEqual(tempNode.data, headItems[0]);
  });

  test("Call removeLast on a collection with two items in it", () => {
    const list = new LinkedList<number>();
    list.addFirst(headItems[0]);
    list.addLast(headItems[1]);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const tempNode = list.last!;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const tempNode2 = list.first!;
    list.removeLast();
    assert.strictEqual(list.size, 1);
    assert.deepStrictEqual(Array.from(list), [headItems[0]]);
    list.removeLast();
    assert.strictEqual(list.size, 0);
    assert.strictEqual(tempNode.data, headItems[1]);
    assert.strictEqual(tempNode2.data, headItems[0]);
  });
  test("Call removeLast on a collection with three items in it", () => {
    const list = new LinkedList<number>();
    list.addFirst(headItems[0]);
    list.addLast(headItems[1]);
    list.addLast(headItems[2]);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const tempNode = list.last!;
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain, @typescript-eslint/no-non-null-assertion
    const tempNode2 = list.last?.prev!;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const tempNode3 = list.first!;
    list.removeLast();
    assert.strictEqual(list.size, 2);
    assert.deepStrictEqual(Array.from(list), [headItems[0], headItems[1]]);
    list.removeLast();
    assert.strictEqual(list.size, 1);
    assert.deepStrictEqual(Array.from(list), [headItems[0]]);
    list.removeLast();
    assert.strictEqual(list.size, 0);
    assert.strictEqual(tempNode.data, headItems[2]);
    assert.strictEqual(tempNode2.data, headItems[1]);
    assert.strictEqual(tempNode3.data, headItems[0]);
  });

  test("Mix removeLast and removeLast call", () => {
    const list = new LinkedList<number>();

    for (let i = 0; i < arraySize; i++) {
      // eslint-disable-next-line security/detect-object-injection
      list.addLast(headItems[i]);
    }

    for (let i = 0; i < arraySize; i++) {
      if ((i & 1) === 0) {
        list.removeFirst();
      } else {
        list.removeLast();
      }
      const startIndex = i / 2 + 1;
      const length = arraySize - i - 1;
      const expectedItems = headItems.slice(startIndex, startIndex + length);
      assert.strictEqual(list.size, expectedItems.length);
      assert.deepStrictEqual(Array.from(list), expectedItems);
    }
  });
});

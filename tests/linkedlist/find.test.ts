import { describe, test } from "node:test";
import * as assert from "node:assert/strict";
import { LinkedList } from "../../src";
import { headItems, tailItems } from "./common";

describe("find", () => {
  function verifyFind(list: LinkedList<number>, items: Array<number>): void {
    for (const item of items) {
      const node = list.find(item);
      assert.ok(node, `Expected to find item ${item}`);
      assert.strictEqual(node.data, item);
    }
  }
  function verifyFindDuplicates(list: LinkedList<number>, items: Array<number>): void {
    const uniqueItems = Array.from(new Set(items));
    for (const item of uniqueItems) {
      const node = list.find(item);
      assert.ok(node, `Expected to find item ${item}`);
      assert.strictEqual(node.data, item);
    }
  }
  test("empty list", () => {
    const list = new LinkedList<number>();
    assert.strictEqual(list.find(headItems[0]), undefined);
  });

  test("single item", () => {
    const list = new LinkedList<number>();
    list.addLast(headItems[0]);
    assert.strictEqual(list.find(headItems[1]), undefined);
    verifyFind(list, [headItems[0]]);
  });

  test("two items", () => {
    const list = new LinkedList<number>();
    list.addFirst(headItems[0]);
    list.addLast(headItems[1]);
    assert.strictEqual(list.find(headItems[2]), undefined);
    verifyFind(list, [headItems[0], headItems[1]]);
  });

  test("three items", () => {
    const list = new LinkedList<number>();
    list.addFirst(headItems[0]);
    list.addLast(headItems[1]);
    list.addLast(headItems[2]);
    assert.strictEqual(list.find(headItems[3]), undefined);
    verifyFind(list, [headItems[0], headItems[1], headItems[2]]);
  });

  test("multiple items", () => {
    const list = new LinkedList<number>();
    for (const item of headItems) {
      list.addLast(item);
    }
    assert.strictEqual(list.find(tailItems[0]), undefined);
    verifyFind(list, headItems);
  });

  test("duplicate items", () => {
    const list = new LinkedList<number>();
    for (const item of headItems) {
      list.addLast(item);
    }
    for (const item of headItems) {
      list.addLast(item);
    }
    assert.strictEqual(list.find(tailItems[0]), undefined);
    const tempItems = [...headItems, ...headItems];
    verifyFindDuplicates(list, tempItems);
  });

  test("undefined at beginning", () => {
    const list = new LinkedList<number>();
    list.addFirst(undefined as never);
    for (const item of headItems) {
      list.addLast(item);
    }
    assert.strictEqual(list.find(tailItems[0]), undefined);
    const tempItems = [undefined, ...headItems];
    verifyFind(list, tempItems as Array<number>);
  });

  test("undefined in middle", () => {
    const list = new LinkedList<number>();
    for (const item of headItems) {
      list.addLast(item);
    }
    list.addLast(undefined as never);
    for (const item of tailItems) {
      list.addLast(item);
    }
    assert.strictEqual(list.find(-1), undefined);
    const tempItems = [...headItems, undefined, ...tailItems];
    verifyFind(list, tempItems as Array<number>);
  });
});

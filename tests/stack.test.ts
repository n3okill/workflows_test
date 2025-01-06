import { describe, test } from "node:test";
import * as assert from "node:assert/strict";
import { EmptyStackException, Stack } from "../src";

describe("Stack", () => {
  const arr = Array.from({ length: 10 }, (_, i) => i);

  test("empty stack", () => {
    const stack = new Stack();
    assert.strictEqual(stack.size, 0);
    assert.deepStrictEqual(stack.toArray(), []);
  });
  test("pre-load values from iterable", () => {
    const stack = new Stack(arr);
    assert.deepStrictEqual(stack.toArray(), [...arr].reverse());
    assert.strictEqual(stack.size, arr.length);
  });
  test("pop all elements", () => {
    const stack = new Stack(arr);
    for (const item of [...arr].reverse()) {
      assert.strictEqual(stack.pop(), item);
    }
  });
  test("pop empty stack", () => {
    const stack = new Stack();
    assert.throws(() => stack.pop(), EmptyStackException);
  });
  test("toArray", () => {
    const stack = new Stack(arr);
    assert.strictEqual(stack.size, arr.length);
    assert.deepStrictEqual(stack.toArray(), [...arr].reverse());
  });
  test("peek all elements", () => {
    const stack = new Stack(arr);
    for (const item of [...arr].reverse()) {
      assert.strictEqual(stack.peek(), item);
      stack.pop();
    }
  });
  test("try pop all elements", () => {
    const stack = new Stack(arr);
    for (const item of [...arr].reverse()) {
      const result = stack.tryPop();
      assert.strictEqual(result[0], true);
      assert.strictEqual(result[1], item);
    }
  });
  test("tryPop empty stack", () => {
    const stack = new Stack();
    assert.strictEqual(stack.tryPop()[0], false);
  });
  test("tryPeek all elements", () => {
    const stack = new Stack(arr);
    for (const item of [...arr].reverse()) {
      const result = stack.tryPeek();
      assert.strictEqual(result[0], true);
      assert.strictEqual(result[1], item);
      stack.pop();
    }
  });
  test("tryp Peek empty stack", () => {
    const stack = new Stack();
    assert.strictEqual(stack.tryPeek()[0], false);
  });
});

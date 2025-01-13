import * as assert from "node:assert/strict";
import { test, describe } from "node:test";
import { add } from "../src/index";

describe("add", () => {
  test("add 2 + 2", () => {
    assert.equal(add(2, 2), 4);
  });
});

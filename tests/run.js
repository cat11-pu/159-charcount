import assert from "node:assert";
import { kindOf } from "../classify.js";
import { countKinds } from "../count.js";
import { render } from "../app.js";

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("kindOf returns text", () => {
  assert.strictEqual(typeof kindOf("a"), "string");
});

check("countKinds returns four counts", () => {
  assert.strictEqual(countKinds("ab").counts.length, 4);
});

check("countKinds returns longest run", () => {
  assert.strictEqual(typeof countKinds("ab").longest_run, "number");
});

check("render returns names", () => {
  assert.strictEqual(render({ text: "ab" }).names.length, 4);
});

check("render exposes same total", () => {
  assert.strictEqual(typeof render({ text: "ab" }).same_total, "boolean");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);

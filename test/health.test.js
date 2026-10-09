const test = require("node:test");
const assert = require("node:assert/strict");

test("project package defines a start script", () => {
  const pkg = require("../package.json");
  assert.equal(pkg.scripts.start, "node server.js");
});

test("dashboard files exist", () => {
  const fs = require("node:fs");
  assert.equal(fs.existsSync("public/index.html"), true);
  assert.equal(fs.existsSync("public/app.js"), true);
  assert.equal(fs.existsSync("public/styles.css"), true);
});

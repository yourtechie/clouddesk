const test = require("node:test");
const assert = require("node:assert/strict");
const app = require("../app");

test("health endpoint returns healthy status", async () => {
  const server = app.listen(0);
  try {
    const address = server.address();
    const response = await fetch(`http://127.0.0.1:${address.port}/api/health`);
    const body = await response.json();

    assert.equal(response.status, 200);
    assert.equal(body.status, "healthy");
    assert.equal(body.service, "CloudDesk");
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});

test("dashboard page is served", async () => {
  const server = app.listen(0);
  try {
    const address = server.address();
    const response = await fetch(`http://127.0.0.1:${address.port}/`);
    const html = await response.text();

    assert.equal(response.status, 200);
    assert.match(html, /CloudDesk/);
    assert.match(html, /Infrastructure overview/);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});

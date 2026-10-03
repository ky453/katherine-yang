import test from "node:test";
import assert from "node:assert/strict";
import { locationPath, resolveRoute } from "../src/lib/routes.js";
import { PROJECTS, PROJECT_ORDER, FEATURED_PROJECTS } from "../src/data/projects.js";

test("main pages resolve independently of the GitHub Pages base path", () => {
  for (const [hash, page] of [["#/", "home"], ["#/work", "work"], ["#/about", "about"], ["#/playground", "playground"]]) {
    const path = locationPath(new URL(`https://ky453.github.io/katherine-yang/${hash}`));
    assert.equal(resolveRoute(path, PROJECTS).page, page);
  }
});

test("every published project has a direct detail route", () => {
  for (const id of PROJECT_ORDER) {
    const route = resolveRoute(`/projects/${id}`, PROJECTS);
    assert.equal(route.page, "project");
    assert.equal(route.projectId, id);
    assert.equal(route.title, PROJECTS[id].title);
  }
});

test("existing query-string project links still resolve", () => {
  for (const id of PROJECT_ORDER) {
    const path = locationPath(new URL(`https://ky453.github.io/?view=${id}`));
    assert.equal(resolveRoute(path, PROJECTS).projectId, id);
  }
});

test("new routes take precedence over a legacy query string", () => {
  assert.equal(locationPath(new URL("https://example.com/?view=cloudsky#/about")), "/about");
});

test("legacy section links and trailing slashes are normalized", () => {
  assert.equal(locationPath(new URL("https://example.com/#work")), "/work");
  assert.equal(locationPath(new URL("https://example.com/#/projects/cloudsky/")), "/projects/cloudsky");
  assert.equal(locationPath(new URL("https://example.com/")), "/");
});

test("unknown pages and project ids have a not-found route", () => {
  for (const path of ["/missing", "/projects/missing", "/projects/cloudsky/extra", "/projects/toString", "/constructor"]) {
    assert.equal(resolveRoute(path, PROJECTS).page, "not-found");
  }
});

test("adding Duolingo to project data automatically enables its route", () => {
  const projects = { ...PROJECTS, duolingo: { id: "duolingo", title: "Duolingo" } };
  assert.deepEqual(resolveRoute("/projects/duolingo", projects), {
    page: "project", projectId: "duolingo", title: "Duolingo",
  });
});

test("Home remains curated independently of the complete project list", () => {
  assert.ok(FEATURED_PROJECTS.length >= 2 && FEATURED_PROJECTS.length <= 3);
  assert.ok(FEATURED_PROJECTS.length < PROJECT_ORDER.length);
  for (const id of FEATURED_PROJECTS) assert.ok(PROJECT_ORDER.includes(id));
});

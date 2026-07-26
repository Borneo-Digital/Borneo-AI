import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { routeMetadata } from "../src/seo.js";

const clientUrl = new URL("../dist/client/", import.meta.url);

function countMatches(value, expression) {
  return value.match(expression)?.length || 0;
}

for (const [pathname, metadata] of Object.entries(routeMetadata)) {
  const fileName = pathname === "/" ? "index.html" : `${pathname.slice(1)}.html`;

  test(`emits complete static SEO metadata for ${pathname}`, async () => {
    const html = await readFile(new URL(fileName, clientUrl), "utf8");

    assert.match(html, new RegExp(`<title[^>]*>${metadata.title.replace("&", "&amp;")}</title>`));
    assert.ok(html.includes(`content="${metadata.description.replace("&", "&amp;")}"`));
    assert.ok(html.includes(`rel="canonical" href="${metadata.canonical}"`));
    assert.ok(html.includes(`property="og:url" content="${metadata.canonical}"`));
    assert.ok(html.includes(`property="og:image" content="${metadata.image.url}"`));
    assert.ok(html.includes('name="twitter:card" content="summary_large_image"'));
    assert.ok(html.includes('id="structured-data"'));
    assert.ok(html.includes('"@context":"https://schema.org"'));
    assert.ok(html.includes('"@type":"Organization"'));
    const structuredDataMatch = html.match(
      /<script[^>]*id="structured-data"[^>]*>([\s\S]*?)<\/script>/,
    );
    assert.ok(structuredDataMatch);
    assert.doesNotThrow(() => JSON.parse(structuredDataMatch[1]));
    assert.equal(countMatches(html, /<title\b/gi), 1);
    assert.equal(countMatches(html, /rel="canonical"/gi), 1);
    assert.equal(countMatches(html, /name="description"/gi), 1);
  });
}

test("keeps search snippets distinct and within useful editorial ranges", () => {
  const titles = new Set();
  const descriptions = new Set();

  for (const metadata of Object.values(routeMetadata)) {
    assert.ok(metadata.title.length >= 30 && metadata.title.length <= 60);
    assert.ok(metadata.description.length >= 120 && metadata.description.length <= 160);
    assert.ok(!titles.has(metadata.title));
    assert.ok(!descriptions.has(metadata.description));
    titles.add(metadata.title);
    descriptions.add(metadata.description);
  }
});

test("publishes robots.txt with the canonical sitemap", async () => {
  const robots = await readFile(new URL("robots.txt", clientUrl), "utf8");
  assert.match(robots, /^User-agent: \*/m);
  assert.match(robots, /^Allow: \/$/m);
  assert.match(robots, /^Sitemap: https:\/\/borneoai\.org\/sitemap\.xml$/m);
});

test("publishes only canonical public routes in the sitemap", async () => {
  const sitemap = await readFile(new URL("sitemap.xml", clientUrl), "utf8");
  const sitemapUrls = [...sitemap.matchAll(/<loc>(https:\/\/borneoai\.org\/[^<]*)<\/loc>/g)]
    .map((match) => match[1])
    .filter((url) => !url.includes("/images/"));
  const canonicalUrls = Object.values(routeMetadata).map((metadata) => metadata.canonical);

  assert.deepEqual(sitemapUrls, canonicalUrls);
  assert.ok(sitemap.includes('xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"'));
});

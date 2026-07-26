#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  DEFAULT_ROBOTS,
  SITE_NAME,
  getStructuredData,
  routeMetadata,
} from "../src/seo.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const clientDir = path.join(root, "dist", "client");
const indexPath = path.join(clientDir, "index.html");
const baseHtml = readFileSync(indexPath, "utf8");

function escapeAttribute(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeText(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function renderHead(pathname) {
  const metadata = routeMetadata[pathname];
  const image = metadata.image;
  const structuredData = JSON.stringify(getStructuredData(pathname)).replace(/</g, "\\u003c");

  return `    <title data-seo="true">${escapeText(metadata.title)}</title>
    <meta data-seo="true" name="description" content="${escapeAttribute(metadata.description)}" />
    <meta data-seo="true" name="robots" content="${DEFAULT_ROBOTS}" />
    <meta data-seo="true" name="application-name" content="${SITE_NAME}" />
    <link data-seo="true" rel="canonical" href="${metadata.canonical}" />
    <link data-seo="true" rel="alternate" hreflang="en" href="${metadata.canonical}" />
    <link data-seo="true" rel="alternate" hreflang="x-default" href="${metadata.canonical}" />
    <meta data-seo="true" property="og:type" content="website" />
    <meta data-seo="true" property="og:site_name" content="${SITE_NAME}" />
    <meta data-seo="true" property="og:locale" content="en_MY" />
    <meta data-seo="true" property="og:title" content="${escapeAttribute(metadata.title)}" />
    <meta data-seo="true" property="og:description" content="${escapeAttribute(metadata.description)}" />
    <meta data-seo="true" property="og:url" content="${metadata.canonical}" />
    <meta data-seo="true" property="og:image" content="${image.url}" />
    <meta data-seo="true" property="og:image:secure_url" content="${image.url}" />
    <meta data-seo="true" property="og:image:width" content="${image.width}" />
    <meta data-seo="true" property="og:image:height" content="${image.height}" />
    <meta data-seo="true" property="og:image:alt" content="${escapeAttribute(image.alt)}" />
    <meta data-seo="true" name="twitter:card" content="summary_large_image" />
    <meta data-seo="true" name="twitter:title" content="${escapeAttribute(metadata.title)}" />
    <meta data-seo="true" name="twitter:description" content="${escapeAttribute(metadata.description)}" />
    <meta data-seo="true" name="twitter:image" content="${image.url}" />
    <meta data-seo="true" name="twitter:image:alt" content="${escapeAttribute(image.alt)}" />
    <script data-seo="true" id="structured-data" type="application/ld+json">${structuredData}</script>`;
}

function renderNoScript(pathname) {
  const metadata = routeMetadata[pathname];
  return `    <noscript data-seo="true">
      <main>
        <h1>${escapeText(metadata.title.replace(/\s*[|—-]\s*BorneoAI.*$/i, ""))}</h1>
        <p>${escapeText(metadata.description)}</p>
        <nav aria-label="Public pages">
          <a href="/">BorneoAI home</a>
          <a href="/learn">Learn practical AI</a>
          <a href="/business">AI for business</a>
          <a href="/community">BorneoAI community</a>
        </nav>
      </main>
    </noscript>`;
}

function stripSeo(html) {
  return html
    .replace(/\s*<title\b[^>]*data-seo="true"[^>]*>[\s\S]*?<\/title>/gi, "")
    .replace(/\s*<(?:meta|link)\b[^>]*data-seo="true"[^>]*>/gi, "")
    .replace(/\s*<script\b[^>]*data-seo="true"[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/\s*<noscript\b[^>]*data-seo="true"[^>]*>[\s\S]*?<\/noscript>/gi, "")
    .replace(/\s*<title\b[^>]*>[\s\S]*?<\/title>/gi, "")
    .replace(/\s*<meta\b[^>]*name="description"[^>]*>/gi, "");
}

function renderPage(pathname) {
  const stripped = stripSeo(baseHtml);
  return stripped
    .replace("</head>", `${renderHead(pathname)}\n  </head>`)
    .replace("</body>", `${renderNoScript(pathname)}\n  </body>`);
}

for (const pathname of Object.keys(routeMetadata)) {
  const fileName = pathname === "/" ? "index.html" : `${pathname.slice(1)}.html`;
  writeFileSync(path.join(clientDir, fileName), renderPage(pathname));
}

console.log("Generated route-specific SEO pages: index.html, learn.html, business.html, community.html");

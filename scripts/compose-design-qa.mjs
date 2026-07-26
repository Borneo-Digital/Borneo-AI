import { readFile, writeFile } from "node:fs/promises";
import { PNG } from "pngjs";

const [leftPath, rightPath, outputPath] = process.argv.slice(2);

if (!leftPath || !rightPath || !outputPath) {
  throw new Error(
    "Usage: node scripts/compose-design-qa.mjs <source.png> <implementation.png> <output.png>",
  );
}

const [left, right] = await Promise.all(
  [leftPath, rightPath].map(async (path) => PNG.sync.read(await readFile(path))),
);
const gutter = 24;
const width = left.width + right.width + gutter;
const height = Math.max(left.height, right.height);
const output = new PNG({ width, height, fill: true });

output.data.fill(244);
PNG.bitblt(left, output, 0, 0, left.width, left.height, 0, 0);
PNG.bitblt(
  right,
  output,
  0,
  0,
  right.width,
  right.height,
  left.width + gutter,
  0,
);

await writeFile(outputPath, PNG.sync.write(output));

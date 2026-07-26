import { readFile, writeFile } from "node:fs/promises";
import jpeg from "jpeg-js";
import { PNG } from "pngjs";

const [inputPath, outputPath, widthArg, heightArg, xArg = "0", yArg = "0"] = process.argv.slice(2);

if (!inputPath || !outputPath || !widthArg || !heightArg) {
  throw new Error(
    "Usage: node scripts/crop-browser-capture.mjs <input> <output> <width> <height> [x] [y]",
  );
}

const file = await readFile(inputPath);
const isJpeg = file[0] === 0xff && file[1] === 0xd8;
const source = isJpeg ? jpeg.decode(file, { useTArray: true }) : PNG.sync.read(file);
if (!Buffer.isBuffer(source.data)) source.data = Buffer.from(source.data);
const width = Math.min(Number(widthArg), source.width);
const height = Math.min(Number(heightArg), source.height);
const x = Math.max(0, Math.min(Number(xArg), source.width - width));
const y = Math.max(0, Math.min(Number(yArg), source.height - height));
const cropped = new PNG({ width, height });

PNG.bitblt(source, cropped, x, y, width, height, 0, 0);
await writeFile(outputPath, PNG.sync.write(cropped));

import { readFile, writeFile } from "node:fs/promises";

const appSource = await readFile(new URL("../src/App.jsx", import.meta.url), "utf8");

function parseCards(block) {
  return [...block.matchAll(/kanji: ("(?:\\.|[^"])*")/g)].map((match) => JSON.parse(match[1]));
}

const n5Block = appSource.match(/const n5Cards = \[(.*?)\];\n\nconst n4Cards/s)?.[1] ?? "";
const n4Block = appSource.match(/const n4Cards = \[(.*?)\];\n\nconst n4SourceKanji/s)?.[1] ?? "";
const n4Source = [...(appSource.match(/const n4SourceKanji = "([^"]+)"/)?.[1] ?? "")];
const n5Kanji = parseCards(n5Block);
const n4Kanji = parseCards(n4Block).filter((kanji) => n4Source.includes(kanji) && !n5Kanji.includes(kanji));
const kanji = [...n5Kanji, ...n4Kanji];

async function loadComponents(character) {
  const codePoint = character.codePointAt(0).toString(16).padStart(5, "0");
  const url = `https://cdn.jsdelivr.net/gh/KanjiVG/kanjivg@master/kanji/${codePoint}.svg`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Không tải được ${character}: ${response.status}`);

  const svg = await response.text();
  const documentRoot = { children: [] };
  const stack = [documentRoot];

  for (const match of svg.matchAll(/<g\b([^>]*)>|<\/g>/g)) {
    if (match[0] === "</g>") {
      stack.pop();
      continue;
    }

    const attributes = match[1];
    const node = {
      element: attributes.match(/kvg:element="([^"]+)"/)?.[1],
      original: attributes.match(/kvg:original="([^"]+)"/)?.[1],
      children: [],
    };
    stack.at(-1).children.push(node);
    stack.push(node);
  }

  function findCharacterNode(node) {
    if (node.element === character) return node;
    for (const child of node.children) {
      const result = findCharacterNode(child);
      if (result) return result;
    }
    return null;
  }

  const characterNode = findCharacterNode(documentRoot);
  if (!characterNode) throw new Error(`Không tìm thấy cây cấu tạo của ${character}`);

  const components = new Set([character]);
  function collectTopLevelElements(node) {
    for (const child of node.children) {
      if (child.element) {
        components.add(child.element);
        if (child.original) components.add(child.original);
      } else {
        collectTopLevelElements(child);
      }
    }
  }
  collectTopLevelElements(characterNode);

  return [character, [...components]];
}

const entries = [];
for (let index = 0; index < kanji.length; index += 16) {
  entries.push(...(await Promise.all(kanji.slice(index, index + 16).map(loadComponents))));
}

const output = `// Generated from top-level KanjiVG kvg:element/kvg:original data.\n// Source: https://kanjivg.tagaini.net/ (CC BY-SA 3.0)\nexport const kanjiComponents = ${JSON.stringify(Object.fromEntries(entries), null, 2)};\n`;

await writeFile(new URL("../src/kanjiComponents.js", import.meta.url), output);
console.log(`Đã cập nhật thành phần cho ${entries.length} Kanji.`);

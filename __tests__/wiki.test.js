const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");

describe("百科文章", () => {
  test("所有百科文件都位于正确的文件夹中", () => {
    const content = fs.readdirSync(path.resolve(__dirname, "../content"));
    const wiki = fs.readdirSync(path.resolve(__dirname, "../content/wiki"));

    expect(content).toContain("wiki");
    expect(wiki.length > 0).toBe(true);
  });

  const wikis = fs.readdirSync(path.resolve(__dirname, "../content/wiki"));

  for (let name of wikis) {
    const markdown = fs.readFileSync(
      path.resolve(__dirname, "../content/wiki/" + name),
      "utf-8"
    );
    const re = /---(.*?)---/gs;
    const source = re.exec(markdown)[1];
    const frontMatter = yaml.load(source);
    const keys = Object.keys(frontMatter);

    test(`文件 "${name}" 的页头至少包含 title 与 description`, () => {
      expect(keys).toContain("title");
      expect(keys).toContain("description");
    });

    test(`文件 "${name}" 的页头不包含不存在的值`, () => {
      const expectKeys = [
        "title",
        "description",
        "introduction",
        "info",
        "img",
        "tags",
        "alias",
      ];
      for (let key of keys) {
        expect(expectKeys.includes(key)).toBe(true);
      }
    });

    test(`  "${name}" 页头的 "title" 为 string 类型`, () => {
      expect(Object.prototype.toString.call(frontMatter.title)).toBe(
        "[object String]"
      );
    });

    test(`  "${name}" 页头的 "description" 为 string 类型`, () => {
      expect(Object.prototype.toString.call(frontMatter.description)).toBe(
        "[object String]"
      );
    });

    if (keys.includes("introduction")) {
      test(`  "${name}" 页头的 "introduction" 为 string 类型`, () => {
        expect(Object.prototype.toString.call(frontMatter.introduction)).toBe(
          "[object String]"
        );
      });
    }

    if (keys.includes("img")) {
      test(`  "${name}" 页头的 "img" 为 string 类型`, () => {
        expect(Object.prototype.toString.call(frontMatter.img)).toBe(
          "[object String]"
        );
      });
    }

    if (keys.includes("info")) {
      test(`  "${name}" 页头的 "info" 为 object 类型`, () => {
        expect(Object.prototype.toString.call(frontMatter.info)).toBe(
          "[object Object]"
        );
      });
    }

    if (keys.includes("tags")) {
      test(`  "${name}" 页头的 "tags" 为 array 类型`, () => {
        expect(Object.prototype.toString.call(frontMatter.tags)).toBe(
          "[object Array]"
        );
      });
    }

    if (keys.includes("alias")) {
      test(`  "${name}" 页头的 "alias" 为 array 类型`, () => {
        expect(Object.prototype.toString.call(frontMatter.alias)).toBe(
          "[object Array]"
        );
      });
    }
  }
});

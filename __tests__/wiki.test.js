const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");

describe("所有百科文章", () => {
  it("位于正确的文件夹中", () => {
    const content = fs.readdirSync(path.resolve(__dirname, "../content"));
    expect(content).toContain("wiki");

    const wiki = fs.readdirSync(path.resolve(__dirname, "../content/wiki"));
    expect(wiki.length > 0).toBe(true);
  });
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

  describe(`${name.split(".")[0]}`, () => {
    it(`页头至少包含 title 与 description`, () => {
      expect(keys).toContain("title");
      expect(keys).toContain("description");
    });

    it(`页头不包含不存在的值`, () => {
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

    it(`"title" 为 string 类型`, () => {
      expect(Object.prototype.toString.call(frontMatter.title)).toBe(
        "[object String]"
      );
    });

    it(`"description" 为 string 类型`, () => {
      expect(Object.prototype.toString.call(frontMatter.description)).toBe(
        "[object String]"
      );
    });

    if (keys.includes("introduction")) {
      it(`"introduction" 为 string 类型`, () => {
        expect(Object.prototype.toString.call(frontMatter.introduction)).toBe(
          "[object String]"
        );
      });
    }

    if (keys.includes("img")) {
      it(`"img" 为 string 类型`, () => {
        expect(Object.prototype.toString.call(frontMatter.img)).toBe(
          "[object String]"
        );
      });
    }

    if (keys.includes("info")) {
      it(`"info" 为 object 类型`, () => {
        expect(Object.prototype.toString.call(frontMatter.info)).toBe(
          "[object Object]"
        );
      });
    }

    if (keys.includes("tags")) {
      it(`"tags" 为 array 类型`, () => {
        expect(Object.prototype.toString.call(frontMatter.tags)).toBe(
          "[object Array]"
        );
      });
    }

    if (keys.includes("alias")) {
      it(`"alias" 为 array 类型`, () => {
        expect(Object.prototype.toString.call(frontMatter.alias)).toBe(
          "[object Array]"
        );
      });
    }
  });
}

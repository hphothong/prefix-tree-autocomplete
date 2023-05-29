import { PrefixTree } from "./prefix-tree";

describe("PrefixTree", () => {
  it("should create a tree without defaults", () => {
    const prefixTree = new PrefixTree();

    expect(prefixTree.has("")).toBeFalsy();
  });

  [
    { values: ["hello"], search: "ello", expected: false },
    { values: ["hello", "hi"], search: "hi", expected: true },
  ].forEach(({ values, search, expected }) => {
    it(`should return ${expected} when word ${expected ? "is" : "is not"
      } present`, () => {
        const prefixTree = new PrefixTree(values);

        expect(prefixTree.has(search)).toBe(expected);
      });
  });

  describe("finding words", () => {
    const words = ["hi", "high", "higher", "highest"];
    let prefixTree: PrefixTree;

    beforeEach(() => {
      prefixTree = new PrefixTree(words);
    });

    it("should limit the number of words returned from search", () => {
      const returnedWords = prefixTree.getWords("hi", { maxWords: 2 });

      expect(returnedWords).toStrictEqual(["hi", "high"]);
    });

    it("should return empty array if no words match", () => {
      const returnedWords = prefixTree.getWords("fail");

      expect(returnedWords).toStrictEqual([]);
    });

    it("should return the longest word when reaching the end of the tree", () => {
      const longestWord = words[words.length - 1];

      const returnedWords = prefixTree.getWords(longestWord);

      expect(returnedWords).toStrictEqual([longestWord]);
    });

    it("should return all words when max is greater than word list", () => {
      const returnedWords = prefixTree.getWords("", {
        maxWords: words.length + 1,
      });

      expect(returnedWords).toStrictEqual(words);
    });
  });
});

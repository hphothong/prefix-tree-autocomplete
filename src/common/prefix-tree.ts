export interface PrefixTreeNode {
  [key: string]: PrefixTreeNode | boolean;
}

export type FlattenedPrefixTreeNodes = Array<
  Array<{ [PrefixTree.terminator]: boolean; key: string }>
>;

export class PrefixTree {
  public static readonly terminator = "isWord";
  private root: PrefixTreeNode = { [PrefixTree.terminator]: false };

  public constructor(values?: string[]) {
    values?.forEach(this.add);
  }

  public add = (value: string): void => {
    let node = this.root;
    for (const letter of value) {
      if (!(letter in node)) {
        node[letter] = { [PrefixTree.terminator]: false };
      }
      node = node[letter] as PrefixTreeNode;
    }
    node[PrefixTree.terminator] = true;
  };

  public has = (value: string): boolean => {
    let node = this.root;
    for (const letter of value) {
      if (!(letter in node)) {
        return false;
      }
      node = node[letter] as PrefixTreeNode;
    }
    return node[PrefixTree.terminator] === true;
  };

  public getNode = (prefix: string): PrefixTreeNode | null => {
    let node = this.root;
    for (const letter of prefix) {
      if (!(letter in node)) {
        return null;
      }
      node = node[letter] as PrefixTreeNode;
    }
    return node;
  };

  public getWords = (
    prefix: string,
    options: { maxWords: number } = { maxWords: 3 }
  ): string[] => {
    const node = this.getNode(prefix);
    if (!node) {
      return [];
    }
    return this.getWordsRecursively(prefix, options, node);
  };

  private getWordsRecursively = (
    prefix: string,
    { maxWords }: { maxWords: number },
    node: PrefixTreeNode,
    words: string[] = []
  ): string[] => {
    if (words.length === maxWords) {
      return words;
    }
    if (node[PrefixTree.terminator]) {
      words.push(prefix);
    }
    for (const key in node) {
      if (key === PrefixTree.terminator) {
        continue;
      }
      this.getWordsRecursively(
        `${prefix}${key}`,
        { maxWords },
        node[key] as PrefixTreeNode,
        words
      );
    }
    return words;
  };
}

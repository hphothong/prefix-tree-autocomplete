export interface PrefixTreeNode {
  [key: string]: PrefixTreeNode | boolean;
}

export class PrefixTree {
  private readonly terminator = "isWord";
  private root: PrefixTreeNode = { [this.terminator]: false };

  public constructor(values?: string[]) {
    values?.forEach(this.add);
  }

  public add = (value: string): void => {
    let node = this.root;
    for (const letter of value) {
      if (!(letter in node)) {
        node[letter] = { [this.terminator]: false };
      }
      node = node[letter] as PrefixTreeNode;
    }
    node[this.terminator] = true;
  };

  public has = (value: string): boolean => {
    let node = this.root;
    for (const letter of value) {
      if (!(letter in node)) {
        return false;
      }
      node = node[letter] as PrefixTreeNode;
    }
    return node[this.terminator] === true;
  };

  public getWords = (
    prefix: string,
    options: { maxWords: number } = { maxWords: 3 }
  ): string[] => {
    let node = this.root;
    for (const letter of prefix) {
      if (!(letter in node)) {
        return [];
      }
      node = node[letter] as PrefixTreeNode;
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
    if (node[this.terminator]) {
      words.push(prefix);
    }
    for (const key in node) {
      if (key === this.terminator) {
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

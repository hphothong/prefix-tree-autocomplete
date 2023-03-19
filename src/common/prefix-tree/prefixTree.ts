import { PrefixTreeNode } from './prefixTreeNode'

export class PrefixTree {
  private readonly root: PrefixTreeNode

  public constructor() {
    this.root = new PrefixTreeNode('')
  }

  public add(...words: string[]): void {
    let node: PrefixTreeNode = this.root
    for (const word of words) {
      for (const char of word) {
        if (!node.children.has(char)) {
          node.children.set(char, new PrefixTreeNode(char))
        }
        node = node.children.get(char) as PrefixTreeNode
      }
      node.isWord = true
      node = this.root
    }
  }

  public includes(word: string): boolean {
    let node: PrefixTreeNode | undefined = this.root
    for (const char of word) {
      node = node.children.get(char)
      if (node === undefined) {
        return false
      }
    }
    return node.isWord
  }

  public remove(word: string): void {
    let node: PrefixTreeNode | undefined = this.root
    for (const char of word) {
      node = node.children.get(char)
      if (node === undefined) {
        return
      }
    }
    node.isWord = false
  }

  public get words(): string[] {
    const words: string[] = []
    const keyIterator = this.root.children.keys()
    for (let i = 0; i < this.root.children.size; i++) {
      const { value: key } = keyIterator.next()
      const node = this.root.children.get(key)
      if (node === undefined) {
        continue
      }
      words.push(...this.getWords(node))
    }
    return words
  }

  private getWords(node: PrefixTreeNode, prefix: string = '', words: string[] = []): string[] {
    if (node.isWord) {
      words.push(prefix + node.data)
    }
    const keyIterator = node.children.keys()
    for (let i = 0; i < node.children.size; i++) {
      const { value: key } = keyIterator.next()
      const childNode = node.children.get(key)
      if (childNode === undefined) {
        continue
      }
      this.getWords(childNode, prefix + node.data, words)
    }
    return words
  }
}

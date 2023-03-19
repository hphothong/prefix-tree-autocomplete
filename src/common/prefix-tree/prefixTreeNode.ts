export class PrefixTreeNode {
  public readonly data: string
  public readonly children: Map<string, PrefixTreeNode>
  public isWord: boolean

  public constructor(data: string, isWord: boolean = false) {
    this.data = data
    this.children = new Map()
    this.isWord = isWord
  }
}

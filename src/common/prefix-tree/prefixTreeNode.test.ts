import { PrefixTreeNode } from './prefixTreeNode'

describe('PrefixTreeNode', () => {
  it('should initialize values', () => {
    const data: string = 'data'

    const node = new PrefixTreeNode(data)

    expect(node.data).toBe(data)
    expect(node.children.size).toBe(0)
    expect(node.isWord).toBe(false)
  })
})

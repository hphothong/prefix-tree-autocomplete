import { PrefixTree } from './prefixTree'

describe('PrefixTree', () => {
  it('should add and remove word', () => {
    const word = 'word'

    const tree = new PrefixTree()
    expect(tree.includes(word)).toBeFalsy()

    tree.add(word)
    expect(tree.includes(word)).toBeTruthy()

    tree.remove(word)
    expect(tree.includes(word)).toBeFalsy()
  })

  it('should get all words', () => {
    const words: string[] = ['a', 'app', 'apt', 'abs']

    const tree = new PrefixTree()
    tree.add(...words)

    expect(tree.words).toStrictEqual(words)
  })
})

import styles from "./PrefixTreeViewNode.module.css";
import { PrefixTree, PrefixTreeNode } from "@/common/prefix-tree";

export type PrefixTreeViewNodeProps = {
  prefix: string;
  node: PrefixTreeNode;
};

export default function PrefixTreeViewNode({
  prefix,
  node,
}: PrefixTreeViewNodeProps) {
  const isWord = node[PrefixTree.terminator];
  const title = prefix ? prefix : "root";
  return (
    <div className={styles.prefixTreeNodeWrapper}>
      <span
        className={[
          styles.prefixTreeNode,
          isWord && styles.prefixTreeNodeWord,
        ].join(" ")}
      >
        {title}
      </span>
      <div className={styles.prefixTreeNodeChildren}>
        {Object.entries(node)
          .filter(([key]) => key !== PrefixTree.terminator)
          .map(([key, node]) => (
            <PrefixTreeViewNode
              key={key}
              prefix={prefix + key}
              node={node as PrefixTreeNode}
            />
          ))}
      </div>
    </div>
  );
}

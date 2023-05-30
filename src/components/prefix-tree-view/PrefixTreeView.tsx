import styles from "./PrefixTreeView.module.css";
import { PrefixTree } from "@/common/prefix-tree";
import { useMemo } from "react";
import PrefixTreeViewNode from "./PrefixTreeViewNode";

export type PrefixTreeViewProps = {
  prefixTree: PrefixTree;
  prefix?: string;
};

export default function PrefixTreeView({
  prefixTree,
  prefix = "",
}: PrefixTreeViewProps) {
  const subtree = useMemo(() => {
    const subtree = prefixTree.getNode(prefix);
    if (!subtree) {
      return null;
    }
    return <PrefixTreeViewNode prefix={prefix} node={subtree} />;
  }, [prefixTree, prefix]);

  return <div className={styles.prefixTree}>{subtree}</div>;
}

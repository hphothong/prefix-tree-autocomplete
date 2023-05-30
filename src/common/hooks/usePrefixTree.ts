import { useEffect, useRef, useState } from "react";
import { PrefixTree } from "../prefix-tree";

export function usePrefixTree(values?: string[]) {
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const prefixTree = useRef(new PrefixTree(values));
  const originalAdd = useRef(prefixTree.current.add);

  useEffect(() => {
    if (isDirty) {
      setIsDirty(false);
    }
  }, [setIsDirty, isDirty]);

  prefixTree.current.add = function(value: string) {
    setIsDirty(true);
    originalAdd.current(value);
  };

  return prefixTree.current;
}

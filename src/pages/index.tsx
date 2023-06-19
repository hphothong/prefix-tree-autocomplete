import Head from "next/head";
import styles from "./index.module.css";
import { usePrefixTree } from "@/common/hooks/usePrefixTree";
import PrefixTreeView from "@/components/prefix-tree-view/PrefixTreeView";
import { useState } from "react";
import TextInput from "@/components/text-input/TextInput";
import { Button } from "@/components/button/Button";

export default function Home() {
  const [prefix, setPrefix] = useState<string>("");
  const prefixTree = usePrefixTree([
    "welcome",
    "to",
    "my",
    "auto",
    "complete",
    "project",
  ]);

  function handleAddWord() {
    prefixTree.add(prefix);
    setPrefix("");
  }

  return (
    <>
      <Head>
        <title>Prefix Tree Autocomplete</title>
        <meta
          name="description"
          content="Prefix tree display for autocomplete"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.inputWrapper}>
          <TextInput
            placeholder="Enter words to store in the prefix tree..."
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddWord()}
            autoCompleteWords={prefixTree.getWords(prefix, { maxWords: 5 })}
          />
          <Button className={styles.addButton} onClick={handleAddWord}>
            Add
          </Button>
        </div>
        <PrefixTreeView prefixTree={prefixTree} prefix={prefix} />
      </main>
    </>
  );
}

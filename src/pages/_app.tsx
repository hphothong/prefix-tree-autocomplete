import "@/styles/globals.css";
import Head from "next/head";
import styles from "./_app.module.css";
import { usePrefixTree } from "@/common/hooks/usePrefixTree";
import PrefixTreeView from "@/components/prefix-tree-view/PrefixTreeView";
import { useState } from "react";
import TextInput from "@/components/text-input/TextInput";

export default function App() {
  const [prefix, setPrefix] = useState<string>("");
  const prefixTree = usePrefixTree();

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
        <h1 className={styles.title}>Prefix Tree Autocomplete</h1>
        <div className={styles.inputWrapper}>
          <TextInput
            placeholder="Enter words to store in the prefix tree..."
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddWord()}
            autoCompleteWords={prefixTree.getWords(prefix, { maxWords: 5 })}
          />
        </div>
        <PrefixTreeView prefixTree={prefixTree} prefix={prefix} />
      </main>
    </>
  );
}
import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  useRef,
  useState,
} from "react";
import styles from "./TextInput.module.css";

export interface TextInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  autoCompleteWords?: string[];
}

export default function TextInput({
  autoCompleteWords = [],
  ...props
}: TextInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isAutoCompleteEnabled, setIsAutoCompleteEnabled] =
    useState<boolean>(false);
  const hasAutoComplete: boolean =
    props.value !== "" && isAutoCompleteEnabled && autoCompleteWords.length > 0;

  return (
    <div className={styles.inputWrapper}>
      <input
        {...props}
        className={[styles.input, props.className].join(" ")}
        ref={inputRef}
        onFocus={() => setIsAutoCompleteEnabled(true)}
        onBlur={() => setIsAutoCompleteEnabled(false)}
        onKeyDown={(e) => {
          if (e.key === "Tab") {
            e.preventDefault();
          }
          if (e.key === "Escape") {
            e.preventDefault();
            inputRef.current?.blur();
          }
          props.onKeyDown?.(e);
        }}
      />
      {hasAutoComplete && <div>{autoCompleteWords[0]}</div>}
    </div>
  );
}

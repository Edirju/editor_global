import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { oneDark } from "@codemirror/theme-one-dark";
import { EditorView } from "@codemirror/view";
import { useEditorStore } from "../../store/useEditorStore";

export const CodeEditor = () => {
  const { content, updateContent, theme, setEditorView } = useEditorStore();

  EditorView.domEventHandlers({
    scroll(event, view) {
      const element = event.target as HTMLElement;
      const percent =
        element.scrollTop / (element.scrollHeight - element.clientHeight);
      useEditorStore.getState().setScrollPercentage(percent);
    },
  });

  return (
    <div className="size-full bg-[rgb(var(--color),0.02)] transition-colors duration-300">
      <CodeMirror
        value={content}
        height="100%"
        theme={theme === "dark" ? oneDark : "light"}
        extensions={[
          markdown({ base: markdownLanguage, codeLanguages: languages }),
          EditorView.lineWrapping,
          EditorView.domEventHandlers({
            scroll(event) {
              const element = event.target as HTMLElement;
              const percent =
                element.scrollTop /
                (element.scrollHeight - element.clientHeight);
              // Guardamos el porcentaje en el store sin causar re-renders masivos
              useEditorStore.getState().setScrollPercentage(percent);
            },
          }),
          EditorView.theme({
            "&": { fontSize: "16px", height: "100%" },
            ".cm-content": {
              padding: "32px 16px",
              fontFamily: "var(--font-inconsolata)",
              lineHeight: "1.6",
              fontWeight: "300",
            },
            ".cm-gutters": {
              backgroundColor: "transparent",
              border: "none",
              color: "rgb(var(--color),0.35)",
            },
            ".cm-activeLine": {
              backgroundColor: "rgb(var(--color),0.05)",
            },
          }),
        ]}
        onChange={(value) => updateContent(value)}
        onCreateEditor={(view) => setEditorView(view)}
        basicSetup={{
          lineNumbers: true,
          foldGutter: true,
          dropCursor: true,
          autocompletion: true,
        }}
        className="h-full outline-none "
      />
    </div>
  );
};
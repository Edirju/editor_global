import { create } from "zustand";
import { EditorView } from "@codemirror/view";
import { db } from "../lib/db";


interface EditorState {
  content: string;
  viewMode: "code" | "preview";
  theme: "light" | "dark";
  editorView: EditorView | null;
  scrollPercentage: number;

  updateContent: (newContent: string) => void;
  loadInitialContent: () => Promise<void>;
  toggleViewMode: () => void;
  setTheme: (theme: "light" | "dark") => void;
  setEditorView: (view: EditorView) => void;
  setScrollPercentage: (percent: number) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  content: "",
  viewMode: "code",
  theme: "dark",
  editorView: null,
  scrollPercentage: 0,

  loadInitialContent: async () => {
    const lastNote = await db.notes.get("last_draft");
    if (lastNote) {
      set({ content: lastNote.content });
    } else {
      set({ content: "# Mi primera nota\nEmpieza a escribir..." });
    }
  },

  updateContent: (newContent) => {
    set({ content: newContent });

    // Guardamos en la DB con ID fijo 'last_draft'
    db.notes.put({
      id: "last_draft",
      content: newContent,
      updatedAt: Date.now(),
    });
  },
  toggleViewMode: () =>
    set((state) => ({
      viewMode: state.viewMode === "code" ? "preview" : "code",
    })),

  setTheme: (newTheme) => {
    localStorage.setItem("theme", newTheme);
    set({ theme: newTheme });
  },
  setEditorView: (newView) => set({ editorView: newView }),

  setScrollPercentage: (percent) => set({ scrollPercentage: percent }),
}));
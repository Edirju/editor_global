import React from "react";
import * as ToolbarPrimitive from "@radix-ui/react-toolbar";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  Type,
  Pilcrow,
  Plus,
  Eye,
  Code2,
  Download,
  ChevronDown,
  Bold,
  Italic,
  Strikethrough,
  List,
  Heading1,
  Heading2,
  Table as TableIcon,
  Minus, 
  ListOrdered,
  Heading3,
  Heading4, Code, Highlighter, Sigma, MessageSquare, Eraser, Quote
} from "lucide-react";
import { useEditorStore } from "../../store/useEditorStore";
import { ThemeToggle } from "./ThemeToggle";
import FileSaver from "file-saver";
import { parseMarkdownToHtml, wrapInHtmlShell } from "../../lib/markdown";

export const Toolbar = () => {
  const { viewMode, toggleViewMode, content, editorView } = useEditorStore();

  const insertMarkdown = (before: string, after: string = "") => {
    if (!editorView) return;

    const selection = editorView.state.selection.main;
    const selectedText = editorView.state.sliceDoc(
      selection.from,
      selection.to,
    );

    // Si es una lista numerada y hay múltiples líneas
    if (before === "1. " && selectedText.includes("\n")) {
      const lines = selectedText.split("\n");
      const numberedLines = lines
        .map((line, i) => `${i + 1}. ${line}`)
        .join("\n");

      editorView.dispatch({
        changes: {
          from: selection.from,
          to: selection.to,
          insert: numberedLines,
        },
      });
    } else {
      // Lógica normal para negritas, títulos, etc.
      editorView.dispatch({
        changes: {
          from: selection.from,
          to: selection.to,
          insert: `${before}${selectedText}${after}`,
        },
        selection: {
          anchor: selection.from + before.length + selectedText.length,
        },
      });
    }

    editorView.focus();
  };

  // Exportar a HTML
  const downloadHTML = async () => {
    const htmlContent = await parseMarkdownToHtml(content);
    const fullDoc = wrapInHtmlShell(htmlContent, "Nota Exportada");
    const blob = new Blob([fullDoc], { type: "text/html" });
    FileSaver.saveAs(blob, "nota.html");
  }

  // Función para descargar el archivo .md
  const downloadMarkdown = () => {
    const blob = new Blob([content], { type: "text/markdown" });
    FileSaver.saveAs(blob, "nota.md");
  };

  const clearFormat = () => {
    if (!editorView) return;
    const selection = editorView.state.selection.main;
    const selectedText = editorView.state.sliceDoc(
      selection.from,
      selection.to,
    );

    // Regex para quitar los símbolos más comunes de Markdown
    const cleanText = selectedText.replace(/(\*\*|__|\*|_|~~|==|%%|\$)/g, "");

    editorView.dispatch({
      changes: { from: selection.from, to: selection.to, insert: cleanText },
    });
    editorView.focus();
  };

  return (
    <ToolbarPrimitive.Root className="flex w-full items-center justify-between p-2 sticky top-0 z-50 bg-[rgb(var(--light),0.10)] dark:bg-[rgb(var(--dark),0.10)] border-b border-[rgb(var(--color),0.15)] backdrop-blur-md backdrop-saturate-150 ">
      {/* SECCIÓN IZQUIERDA: Formato y Herramientas */}
      <div className="flex items-center gap-1">
        {/* Menú Formato */}
        <MenuSection icon={<Type size={16} />} label="Formato">
          <MenuItem
            icon={<Bold size={16} />}
            label="Negrita"
            shortcut="**"
            onClick={() => insertMarkdown("**", "**")}
          />
          <MenuItem
            icon={<Italic size={16} />}
            label="Cursiva"
            shortcut="*"
            onClick={() => insertMarkdown("*", "*")}
          />
          <MenuItem
            icon={<Strikethrough size={16} />}
            label="Tachado"
            onClick={() => insertMarkdown("~~", "~~")}
          />
          <MenuItem
            icon={<Highlighter size={16} />}
            label="Resaltado"
            onClick={() => insertMarkdown("==", "==")}
          />
          <DropdownMenu.Separator className="h-px bg-[rgb(var(--color),0.08)] my-1" />
          <MenuItem
            icon={<Code2 size={16} />}
            label="Código"
            onClick={() => insertMarkdown("`", "`")}
          />
          <MenuItem
            icon={<Sigma size={16} />}
            label="Fórmula matemática"
            onClick={() => insertMarkdown("$", "$")}
          />
          <MenuItem
            icon={<MessageSquare size={16} />}
            label="Comentario"
            onClick={() => insertMarkdown("%%", "%%")}
          />
          <MenuItem
            icon={<Eraser size={16} />}
            label="Limpiar formato"
            onClick={clearFormat}
          />
        </MenuSection>

        {/* Menú Párrafo */}
        <MenuSection icon={<Pilcrow size={18} />} label="Párrafo">
          <MenuItem
            icon={<Heading1 size={16} />}
            label="Título 1"
            onClick={() => insertMarkdown("# ")}
          />
          <MenuItem
            icon={<Heading2 size={16} />}
            label="Título 2"
            onClick={() => insertMarkdown("## ")}
          />
          <MenuItem
            icon={<Heading3 size={16} className="rotate-0" />}
            label="Título 3"
            onClick={() => insertMarkdown("### ")}
          />
          <MenuItem
            icon={<Heading4 size={16} className="rotate-0" />}
            label="Título 4"
            onClick={() => insertMarkdown("#### ")}
          />
          <DropdownMenu.Separator className="h-px bg-[rgb(var(--color),0.08)] my-1" />
          <MenuItem
            icon={<List size={16} />}
            label="Lista"
            onClick={() => insertMarkdown("- ")}
          />
          <MenuItem
            icon={<ListOrdered size={16} />}
            label="Lista numerada"
            onClick={() => insertMarkdown("1. ")}
          />
          <MenuItem
            icon={<List size={16} />}
            label="Lista Tareas"
            onClick={() => insertMarkdown("- [ ] ")}
          />
          <MenuItem
            icon={<Quote size={16} />}
            label="Cita"
            onClick={() => insertMarkdown("> ")}
          />
        </MenuSection>

        {/* Menú Insertar */}
        <MenuSection icon={<Plus size={18} />} label="Insertar">
          <MenuItem
            icon={<TableIcon size={16} />}
            label="Tabla"
            onClick={() =>
              insertMarkdown(
                "| Col 1 | Col 2 |\n|-------|-------|\n| Dato  | Dato  |",
              )
            }
          />
          <MenuItem
            icon={<Minus size={16} />}
            label="Separador"
            onClick={() => insertMarkdown("\n---\n")}
          />
          <MenuItem
            icon={<Code size={16} />}
            label="Bloque de código"
            onClick={() => insertMarkdown("```\n", "\n```")}
          />
        </MenuSection>

        {/* Menú Exportar */}
        <MenuSection icon={<Download size={18} />} label="Exportar">
          <MenuItem
            icon={<Download size={16} />}
            label="Descargar .MD"
            onClick={downloadMarkdown}
          />
          <MenuItem
            icon={<Download size={16} />}
            label="Descargar .HTML"
            onClick={downloadHTML}
          />
        </MenuSection>

        <ToolbarPrimitive.Separator className="w-px h-6 bg-[rgb(var(--color),0.35)] mx-2" />

        {/* Botón rápido de Negrita (opcional) */}
        <ToolbarPrimitive.Button className="p-2 hover:bg-[rgb(var(--color),0.15)] rounded transition-colors duration-300 cursor-pointer">
          <Bold size={16} />
        </ToolbarPrimitive.Button>
      </div>

      {/* SECCIÓN DERECHA: Vista, Tema y Exportar */}
      <div className="flex items-center gap-2">
        {/* Toggle Modo Lectura / Código */}
        <button
          onClick={toggleViewMode}
          className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-[rgb(var(--color),0.15)] text-[rgb(var(--color),0.85)] hover:bg-[rgb(var(--dark))] hover:text-[rgb(var(--light),0.85)] dark:hover:bg-[rgb(var(--light))] dark:hover:text-[rgb(var(--dark),0.85)]  transition-all duration-300 border border-transparent "
        >
          {viewMode === "code" ? (
            <>
              <Eye size={16} />{" "}
              <span className="hidden sm:inline text-xs font-light uppercase tracking-tight">
                Lectura
              </span>
            </>
          ) : (
            <>
              <Code2 size={16} />{" "}
              <span className="text-xs font-light uppercase tracking-tight">
                Código
              </span>
            </>
          )}
        </button>

        <ThemeToggle />

        {/* <button
          onClick={downloadMarkdown}
          className="p-2 bg-[rgb(var(--color),0.15)] text-[rgb(var(--color),0.85)] hover:bg-[rgb(var(--color))] hover:text-[rgb(var(--light),0.85)] dark:hover:text-[rgb(var(--dark),0.85)] rounded-full transition-colors "
          title="Descargar Documento"
        >
          <Download size={16} />
        </button> */}
      </div>
    </ToolbarPrimitive.Root>
  );
};

// --- Sub-componentes para limpiar el código ---
const MenuSection = ({ children, icon, label }: { children: React.ReactNode, icon: React.ReactNode, label: string }) => (
  <DropdownMenu.Root>
    <DropdownMenu.Trigger asChild>
      <button className="flex items-center justify-center gap-1 px-3 py-1.5 hover:bg-[rgb(var(--color),0.08)] rounded-md transition-colors text-sm font-light font-inter tracking-tighter ">
        {icon}
        <span className="hidden sm:inline">{label}</span>
        <ChevronDown size={14} className="opacity-50" />
      </button>
    </DropdownMenu.Trigger>

    <DropdownMenu.Portal>
      <DropdownMenu.Content 
        className="min-w-50 bg-[rgb(var(--light),0.15)] dark:bg-[rgb(var(--dark),0.15)] backdrop-blur-2xl backdrop-saturate-100 border border-[rgb(var(--color),0.15)] rounded-xl p-1 shadow-xl animate-in fade-in zoom-in duration-300 z-100"
        sideOffset={5}
      >
        {children}
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  </DropdownMenu.Root>
);

const MenuItem = ({ icon, label, shortcut, onClick }: { icon: any, label: string, shortcut?: string, onClick?: () => void }) => (
  <DropdownMenu.Item className="flex items-center justify-between px-3 py-2 text-sm font-inter font-light outline-none cursor-pointer hover:bg-[rgb(var(--color),0.08)] rounded-lg transition-colors" onClick={onClick} >
    <div className="flex items-center gap-3">
      <span className="text-[rgb(var(--color),0.85)]">{icon}</span>
      {label}
    </div>
    {shortcut && <span className="text-[10px] text-[rgb(var(--color),0.65)] font-light font-inconsolata">{shortcut}</span>}
  </DropdownMenu.Item>
);

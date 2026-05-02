import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeKatex from "rehype-katex";
import rehypeStringify from "rehype-stringify";


export async function parseMarkdownToHtml(markdown: string): Promise<string> {
  try {
    
    const highlightedMarkdown = markdown.replace(
      /==(.+?)==/g,
      "<mark>$1</mark>",
    );

    const result = await remark()
      .use(gfm)       
      .use(remarkMath)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeKatex)
      .use(rehypeStringify, { allowDangerousHtml: true })
      .process(highlightedMarkdown);
    
    return result.toString();
  } catch (error) {
    console.error("Error procesando Markdown:", error);
    return '<p class="text-red-500">Error al renderizar el contenido</p>';
  }
}

/**
 * Función extra para exportar a un documento HTML completo
*/
export function wrapInHtmlShell(
  content: string,
  title: string = "Nota Exportada",
) {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>${title}</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css">
    <style>
        body { font-family: sans-serif; line-height: 1.6; padding: 2rem; max-width: 800px; margin: auto; }
        mark { background-color: #fff3bf; padding: 0 2px; }
        .dark mark { background-color: #ffec99; color: #000; }
        pre { background: #fffefe; padding: 1rem; border-radius: 5px; overflow-x: auto; }
        blockquote { border-left: 4px solid #ddd; padding-left: 1rem; color: #666; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    </style>
</head>
<body>
    ${content}
</body>
</html>`;
}


import React, { useState, useEffect, useRef } from "react";
import { useEditorStore } from "../../store/useEditorStore";
import { parseMarkdownToHtml } from "../../lib/markdown";

export const Previewer = () => {
  const { content, viewMode, scrollPercentage } = useEditorStore();
  const [html, setHtml] = useState("");  
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const renderContent = async () => {
      const processedHtml = await parseMarkdownToHtml(content);
      setHtml(processedHtml);
    };
    renderContent();
  }, [content]);

  useEffect(() => {
    if (containerRef.current && viewMode === "preview") {
      const { scrollHeight, clientHeight } = containerRef.current;
      // Aplicamos el porcentaje guardado
      containerRef.current.scrollTop =
        scrollPercentage * (scrollHeight - clientHeight);
    }
  }, [viewMode, scrollPercentage]); 

  return (
    <div className="size-full overflow-y-auto transition-colors duration-300 bg-[rgb(var(--color),0.02)] ">
      <div
        className="max-w-3xl mx-auto px-10 py-16 font-inter tracking-tight text-[rgb(var(--color),0.9)] 
          /* Estilos manuales para un control total sin depender de plugins de terceros */
          [&>h1]:text-4xl [&>h1]:font-bold [&>h1]:mb-6 [&>h1]:mt-8
          [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:mb-4 [&>h2]:mt-6 [&>h2]:border-b [&>h2]:border-slate-200
          [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:mb-4 [&>h3]:mt-6
          [&>h4]:text-lg [&>h4]:font-semibold [&>h4]:mb-4 [&>h4]:mt-6
          [&>p]:mb-4 [&>p]:leading-relaxed [&>p]:text-base [&>p]:font-light
          [&>ul]:list-disc [&>ul]:ml-6 [&>ul]:mb-4
          [&>ol]:list-decimal [&>ol]:ml-6 [&>ol]:mb-4
          [&>blockquote]:border-l-4 [&>blockquote]:border-secondary-500 [&>blockquote]:pl-4 [&>blockquote]:italic
          [&>pre]:bg-slate-100 dark:[&>pre]:bg-slate-800/15 [&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:overflow-x-auto
          [&>table]:w-full [&>table]:border-collapse [&>table]:mb-4
          [&>table_td]:border [&>table_td]:p-2 [&>table_th]:border [&>table_th]:p-2 [&>table_th]:bg-slate-50/15"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};

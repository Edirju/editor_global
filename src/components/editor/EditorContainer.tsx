import React, { useEffect } from 'react'
import { useEditorStore } from '../../store/useEditorStore'
import { CodeEditor } from './CodeEditor'
import { Previewer } from './Previewer'

export const EditorContainer = () => {
  const { viewMode, loadInitialContent } = useEditorStore();
  
  useEffect(() => {
    // Cargamos la nota guardada al iniciar la app
    loadInitialContent();
  }, []);
  
  return (
    <div className="flex-1 h-[calc(100vh-64px)] overflow-hidden relative">
      {/* 
          Usamos renderizado condicional para el modo lectura/escritura.
          Calculamos la altura restando la altura de la Toolbar (aprox 57px)
      */}
      {viewMode === "code" ? <CodeEditor /> : <Previewer />}
    </div>
  );
}



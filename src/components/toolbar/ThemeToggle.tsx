import React, { useEffect } from 'react'
import { useEditorStore } from '../../store/useEditorStore'

export const ThemeToggle = () => {
  const { theme, setTheme } = useEditorStore();
  // Sincronizar el estado inicial con el DOM
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  },[])

  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    const switchTheme = () => {
      setTheme(newTheme);
      document.documentElement.classList.toggle("dark", newTheme === "dark");
    };
    // Si el navegador no soporta View Transitions, cambia directamente
    if (!document.startViewTransition) {
      switchTheme();
      return;
    }
    // Con View Transitions — usa el efecto definido en global.css
    document.startViewTransition(switchTheme);
  };

  return (
    <button
      id="theme-toggle"
      onClick={handleThemeToggle}
      className="relative size-8 border border-transparent rounded-full flex items-center justify-center bg-[rgb(var(--color),0.15)] text-[rgb(var(--color),0.85)] cursor-pointer transition-all duration-300 hover:bg-[rgb(var(--dark),0.85)] dark:hover:bg-[rgb(var(--light))] hover:text-white/85 dark:hover:text-[rgb(var(--dark),0.85)] hover:shadow-[0_0_12px_rgb(var(--color),0.25)] "
      aria-label="Toggle theme"
    >
      <div className="relative size-4 overflow-hidden">
        {/* SVG Luna - Aparece en modo claro */}
        <svg
          className={`absolute h-full w-full transition-all duration-500 ${
            theme === "dark"
              ? "scale-0 -rotate-90 opacity-0"
              : "scale-100 rotate-0 opacity-100"
          }`}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
            fill="currentColor"
          ></path>
        </svg>

        {/* SVG Sol - Aparece en modo oscuro */}
        <svg
          className={`absolute h-full w-full transition-all duration-500 ${
            theme === "dark"
              ? "scale-100 rotate-0 opacity-100"
              : "scale-0 rotate-90 opacity-0"
          }`}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2V4M12 20V22M4 12H2M6.31412 6.31412L4.8999 4.8999M17.6859 6.31412L19.1001 4.8999M6.31412 17.69L4.8999 19.1042M17.6859 17.69L19.1001 19.1042M22 12H20M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </div>
    </button>
  );
}




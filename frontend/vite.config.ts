import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  const isProduction = mode === "production";

  return {
    resolve: {
      alias: isProduction
        ? { "react-dom/client": "react-dom/profiling" }
        : ({} as Record<string, string>),
    },
    define: {
      "process.env.REACT_PROFILING": JSON.stringify(isProduction), // Enables profiling mode
    },
  };
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "react-dom$": path.resolve(
        process.cwd(),
        "node_modules/react-dom/profiling"
      ),

      "scheduler/tracing": path.resolve(
        process.cwd(),
        "node_modules/scheduler/tracing-profiling"
      ),
    },
  },
});

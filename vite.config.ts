import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig(({ mode }) => {
  const isDev = mode === "development";

  const remotes = {
    music_library_ui_remote_components: isDev
      ? "http://localhost:4173/assets/remoteEntry.js"
      : "https://music-library-ui-remote.vercel.app/assets/remoteEntry.js",
  };

  return {
    plugins: [
      react(),
      federation({
        name: "main-host",
        remotes,
        shared: ["react"],
      }),
    ],
    build: {
      modulePreload: false,
      target: "esnext",
      minify: false,
      cssCodeSplit: false,
    },
  };
});

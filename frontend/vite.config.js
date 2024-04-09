// import { defineConfig } from "vite";
// import vue from "@vitejs/plugin-vue";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue()],
// });

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    chunkSizeWarningLimit: 2000, // Sesuaikan dengan kebutuhan Anda
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Pisahkan modul tertentu ke dalam "chunk" tertentu jika diperlukan
          if (id.includes("your-special-library")) {
            return "special-library";
          }
        },
      },
    },
  },
});

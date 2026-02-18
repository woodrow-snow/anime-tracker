import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",
  server: {
    proxy: {
      '/api/anime-facts': {
        target: 'https://anime-facts-rest-api.herokuapp.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api\/anime-facts/, '/api/v1'),
      },
    },
  },
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        // cart: resolve(__dirname, "src/cart/index.html"),
        // checkout: resolve(__dirname, "src/checkout/index.html"),
        // product: resolve(__dirname, "src/product_pages/index.html"),
        // listing: resolve(__dirname, "src/product_listing/index.html"),
        show: resolve(__dirname, "src/shows/index.html"),
        showAdd: resolve(__dirname, "src/shows/add.html"),
        showEdit: resolve(__dirname, "src/shows/update.html"),
        confirm: resolve(__dirname, 'src/shows/confirm.html'),
        data: resolve(__dirname, "src/data/index.html"),
      },
    },
  },
});

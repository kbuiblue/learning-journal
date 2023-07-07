import { defineConfig } from "vite";

export default defineConfig({
    base: '/',
    plugins: [],
    server: {
        port: 5173,
    },
    css: {
        devSourcemap: true, 
        preprocessorOptions: {
            scss: {
                additionalData: `@import "./src/scss/style.scss";`,
            },
        },
    },
    build: {
        sourcemap: true,
        rollupOptions: {
            input: {
              main: 'index.html',
              "about-me": '/src/html/about-me.html',
              'hero-blog': '/src/html/hero-blog.html',
            }
          }
    },
    optimizeDeps: {
        entries: ["./index.html", "./src/index.js"],
        include: ["sass"],
    },
});


import { defineConfig } from "vite";

export default defineConfig({
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
    },
    optimizeDeps: {
        entries: ["./index.html", "./src/index.js"],
        include: ["sass"],
    },
});


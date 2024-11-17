// vite.config.ts
import path from "path";
import { unheadVueComposablesImports } from "file:///home/garand_plg/Projects/garands-world-game/node_modules/@unhead/vue/dist/index.mjs";
import vue from "file:///home/garand_plg/Projects/garands-world-game/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import AutoImport from "file:///home/garand_plg/Projects/garands-world-game/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///home/garand_plg/Projects/garands-world-game/node_modules/unplugin-vue-components/dist/vite.js";
import VueRouter from "file:///home/garand_plg/Projects/garands-world-game/node_modules/unplugin-vue-router/dist/vite.js";
import { defineConfig } from "file:///home/garand_plg/Projects/garands-world-game/node_modules/vite/dist/node/index.js";
import vueDevTools from "file:///home/garand_plg/Projects/garands-world-game/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
import autoprefixer from "file:///home/garand_plg/Projects/garands-world-game/node_modules/autoprefixer/lib/autoprefixer.js";
import tailwind from "file:///home/garand_plg/Projects/garands-world-game/node_modules/tailwindcss/lib/index.js";
var __vite_injected_original_dirname = "/home/garand_plg/Projects/garands-world-game";
var vite_config_default = defineConfig({
  plugins: [
    VueRouter({
      dts: "./src/types/typed-router.d.ts",
      importMode: "async"
    }),
    vue(),
    vueDevTools(),
    AutoImport({
      dts: "./types/auto-imports.d.ts",
      dirs: ["./composables", "./stores", "./components/ui/**/*.ts"],
      imports: [
        "vue",
        "vue-router",
        "pinia",
        "@vueuse/core",
        "vitest",
        unheadVueComposablesImports
      ],
      eslintrc: {
        enabled: true
      },
      packagePresets: ["pocketbase"]
    }),
    Components({
      dts: "./types/components.d.ts",
      dirs: ["./components/**"],
      directoryAsNamespace: true,
      collapseSamePrefixes: true,
      extensions: ["vue"],
      deep: true,
      include: [/\.vue$/, /\.vue\?vue/],
      exclude: [/node_modules/]
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()]
    }
  },
  server: {
    proxy: {
      "/pb": {
        target: "http://localhost:8090/",
        changeOrigin: true,
        rewrite: (path2) => path2.replace(/^\/pb/, "")
      }
    }
  },
  root: "src",
  build: {
    outDir: "../dist"
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9nYXJhbmRfcGxnL1Byb2plY3RzL2dhcmFuZHMtd29ybGQtZ2FtZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvZ2FyYW5kX3BsZy9Qcm9qZWN0cy9nYXJhbmRzLXdvcmxkLWdhbWUvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvZ2FyYW5kX3BsZy9Qcm9qZWN0cy9nYXJhbmRzLXdvcmxkLWdhbWUvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcblxuaW1wb3J0IHsgdW5oZWFkVnVlQ29tcG9zYWJsZXNJbXBvcnRzIH0gZnJvbSAnQHVuaGVhZC92dWUnO1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnO1xuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSc7XG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJztcbmltcG9ydCBWdWVSb3V0ZXIgZnJvbSAndW5wbHVnaW4tdnVlLXJvdXRlci92aXRlJztcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHZ1ZURldlRvb2xzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1kZXZ0b29scyc7XG4vLyBpbXBvcnQgeyBWdWVSb3V0ZXJBdXRvSW1wb3J0cyB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1yb3V0ZXInO1xuXG5pbXBvcnQgYXV0b3ByZWZpeGVyIGZyb20gJ2F1dG9wcmVmaXhlcic7XG5pbXBvcnQgdGFpbHdpbmQgZnJvbSAndGFpbHdpbmRjc3MnO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcblx0cGx1Z2luczogW1xuXHRcdFZ1ZVJvdXRlcih7XG5cdFx0XHRkdHM6ICcuL3NyYy90eXBlcy90eXBlZC1yb3V0ZXIuZC50cycsXG5cdFx0XHRpbXBvcnRNb2RlOiAnYXN5bmMnXG5cdFx0fSksXG5cdFx0dnVlKCksXG5cdFx0dnVlRGV2VG9vbHMoKSxcblx0XHRBdXRvSW1wb3J0KHtcblx0XHRcdGR0czogJy4vdHlwZXMvYXV0by1pbXBvcnRzLmQudHMnLFxuXHRcdFx0ZGlyczogWycuL2NvbXBvc2FibGVzJywgJy4vc3RvcmVzJywgJy4vY29tcG9uZW50cy91aS8qKi8qLnRzJ10sXG5cdFx0XHRpbXBvcnRzOiBbXG5cdFx0XHRcdCd2dWUnLFxuXHRcdFx0XHQndnVlLXJvdXRlcicsXG5cdFx0XHRcdCdwaW5pYScsXG5cdFx0XHRcdCdAdnVldXNlL2NvcmUnLFxuXHRcdFx0XHQndml0ZXN0Jyxcblx0XHRcdFx0dW5oZWFkVnVlQ29tcG9zYWJsZXNJbXBvcnRzXG5cdFx0XHRdLFxuXHRcdFx0ZXNsaW50cmM6IHtcblx0XHRcdFx0ZW5hYmxlZDogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdHBhY2thZ2VQcmVzZXRzOiBbJ3BvY2tldGJhc2UnXVxuXHRcdH0pLFxuXHRcdENvbXBvbmVudHMoe1xuXHRcdFx0ZHRzOiAnLi90eXBlcy9jb21wb25lbnRzLmQudHMnLFxuXHRcdFx0ZGlyczogWycuL2NvbXBvbmVudHMvKionXSxcblx0XHRcdGRpcmVjdG9yeUFzTmFtZXNwYWNlOiB0cnVlLFxuXHRcdFx0Y29sbGFwc2VTYW1lUHJlZml4ZXM6IHRydWUsXG5cdFx0XHRleHRlbnNpb25zOiBbJ3Z1ZSddLFxuXHRcdFx0ZGVlcDogdHJ1ZSxcblx0XHRcdGluY2x1ZGU6IFsvXFwudnVlJC8sIC9cXC52dWVcXD92dWUvXSxcblx0XHRcdGV4Y2x1ZGU6IFsvbm9kZV9tb2R1bGVzL11cblx0XHR9KVxuXHRdLFxuXHRyZXNvbHZlOiB7XG5cdFx0YWxpYXM6IHtcblx0XHRcdCdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJylcblx0XHR9XG5cdH0sXG5cdGNzczoge1xuXHRcdHBvc3Rjc3M6IHtcblx0XHRcdHBsdWdpbnM6IFt0YWlsd2luZCgpLCBhdXRvcHJlZml4ZXIoKV1cblx0XHR9XG5cdH0sXG5cdHNlcnZlcjoge1xuXHRcdHByb3h5OiB7XG5cdFx0XHQnL3BiJzoge1xuXHRcdFx0XHR0YXJnZXQ6ICdodHRwOi8vbG9jYWxob3N0OjgwOTAvJyxcblx0XHRcdFx0Y2hhbmdlT3JpZ2luOiB0cnVlLFxuXHRcdFx0XHRyZXdyaXRlOiBwYXRoID0+IHBhdGgucmVwbGFjZSgvXlxcL3BiLywgJycpXG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHRyb290OiAnc3JjJyxcblx0YnVpbGQ6IHtcblx0XHRvdXREaXI6ICcuLi9kaXN0J1xuXHR9XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBc1QsT0FBTyxVQUFVO0FBRXZVLFNBQVMsbUNBQW1DO0FBQzVDLE9BQU8sU0FBUztBQUNoQixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGVBQWU7QUFDdEIsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxpQkFBaUI7QUFHeEIsT0FBTyxrQkFBa0I7QUFDekIsT0FBTyxjQUFjO0FBWnJCLElBQU0sbUNBQW1DO0FBZXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzNCLFNBQVM7QUFBQSxJQUNSLFVBQVU7QUFBQSxNQUNULEtBQUs7QUFBQSxNQUNMLFlBQVk7QUFBQSxJQUNiLENBQUM7QUFBQSxJQUNELElBQUk7QUFBQSxJQUNKLFlBQVk7QUFBQSxJQUNaLFdBQVc7QUFBQSxNQUNWLEtBQUs7QUFBQSxNQUNMLE1BQU0sQ0FBQyxpQkFBaUIsWUFBWSx5QkFBeUI7QUFBQSxNQUM3RCxTQUFTO0FBQUEsUUFDUjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRDtBQUFBLE1BQ0EsVUFBVTtBQUFBLFFBQ1QsU0FBUztBQUFBLE1BQ1Y7QUFBQSxNQUNBLGdCQUFnQixDQUFDLFlBQVk7QUFBQSxJQUM5QixDQUFDO0FBQUEsSUFDRCxXQUFXO0FBQUEsTUFDVixLQUFLO0FBQUEsTUFDTCxNQUFNLENBQUMsaUJBQWlCO0FBQUEsTUFDeEIsc0JBQXNCO0FBQUEsTUFDdEIsc0JBQXNCO0FBQUEsTUFDdEIsWUFBWSxDQUFDLEtBQUs7QUFBQSxNQUNsQixNQUFNO0FBQUEsTUFDTixTQUFTLENBQUMsVUFBVSxZQUFZO0FBQUEsTUFDaEMsU0FBUyxDQUFDLGNBQWM7QUFBQSxJQUN6QixDQUFDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1IsT0FBTztBQUFBLE1BQ04sS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLElBQ3JDO0FBQUEsRUFDRDtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0osU0FBUztBQUFBLE1BQ1IsU0FBUyxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUM7QUFBQSxJQUNyQztBQUFBLEVBQ0Q7QUFBQSxFQUNBLFFBQVE7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNOLE9BQU87QUFBQSxRQUNOLFFBQVE7QUFBQSxRQUNSLGNBQWM7QUFBQSxRQUNkLFNBQVMsQ0FBQUEsVUFBUUEsTUFBSyxRQUFRLFNBQVMsRUFBRTtBQUFBLE1BQzFDO0FBQUEsSUFDRDtBQUFBLEVBQ0Q7QUFBQSxFQUNBLE1BQU07QUFBQSxFQUNOLE9BQU87QUFBQSxJQUNOLFFBQVE7QUFBQSxFQUNUO0FBQ0QsQ0FBQzsiLAogICJuYW1lcyI6IFsicGF0aCJdCn0K

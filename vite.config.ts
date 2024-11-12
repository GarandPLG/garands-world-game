import path from 'path';

import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import VueRouter from 'unplugin-vue-router/vite';
import { defineConfig } from 'vite';
import vueDevTools from 'vite-plugin-vue-devtools';
// import { VueRouterAutoImports } from 'unplugin-vue-router';

import autoprefixer from 'autoprefixer';
import tailwind from 'tailwindcss';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		VueRouter({
			dts: './src/types/typed-router.d.ts',
			importMode: 'async'
		}),
		vue(),
		vueDevTools(),
		AutoImport({
			dts: './types/auto-imports.d.ts',
			dirs: ['./composables', './stores', './components/ui/**/*.ts'],
			imports: ['vue', 'vue-router', 'pinia', '@vueuse/core', 'vitest'],
			eslintrc: {
				enabled: true
			},
			packagePresets: ['pocketbase']
		}),
		Components({
			dts: './types/components.d.ts',
			dirs: ['./components/**'],
			directoryAsNamespace: true,
			collapseSamePrefixes: true,
			extensions: ['vue'],
			deep: true,
			include: [/\.vue$/, /\.vue\?vue/],
			exclude: [/node_modules/]
		})
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src')
		}
	},
	css: {
		postcss: {
			plugins: [tailwind(), autoprefixer()]
		}
	},
	server: {
		proxy: {
			'/pb': {
				target: 'http://localhost:8090/',
				changeOrigin: true,
				rewrite: path => path.replace(/^\/pb/, '')
			}
		}
	},
	root: 'src'
});

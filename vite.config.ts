import path from 'path';

import { unheadVueComposablesImports } from '@unhead/vue';
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
			dts: './src/auto-types/typed-router.d.ts',
			importMode: 'async'
		}),
		vue(),
		vueDevTools(),
		AutoImport({
			include: [
				/\.(d\.ts|[tj]sx?)$/, // .ts, .tsx, .js, .jsx
				/\.vue$/,
				/\.vue\?vue/, // .vue
				/\.md$/ // .md
			],
			imports: [
				'vue',
				'vue-router',
				'pinia',
				'@vueuse/core',
				'vitest',
				unheadVueComposablesImports
			],
			dirs: [
				'./composables',
				'./stores',
				'./components/ui/**/*.ts',
				'./data',
				'./types',
				'./auto-types'
			],
			dts: './auto-types/auto-imports.d.ts',
			vueTemplate: true,
			eslintrc: {
				enabled: true
			},
			packagePresets: ['pocketbase']
		}),
		Components({
			dts: './auto-types/components.d.ts',
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
	root: 'src',
	build: {
		outDir: '../dist'
	}
});

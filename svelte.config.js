import evidencePreprocess from '@evidence-dev/preprocess'
import adapter from '@sveltejs/adapter-static';
import FullReload from 'vite-plugin-full-reload'

/** @type {import('@sveltejs/kit').Config} */

export const config = {
	extensions: ['.svelte', ".md"],
	preprocess: evidencePreprocess(),
	kit: {
		adapter: adapter(),
		files: {
			routes: 'src/pages',
			lib: 'src/components'
		},
		vite: {
			optimizeDeps: {
				include: ['echarts-stat'],
				exclude: ['@evidence-dev/components']
			},
            server: {
				hmr: {
					clientPort: process.env.HMR_HOST ? 443 : 24678,
					host: process.env.HMR_HOST ? process.env.HMR_HOST.substring("https://".length) : "localhost"
				}
			},
			ssr: {
				external: ['@evidence-dev/db-orchestrator']
			},
			plugins: [
				FullReload.default(['./.evidence/build/queries/**'], {delay: 150}),
			]
		}
	}
};

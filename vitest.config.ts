import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
	test: {
		include: ['src/tests/**/*.test.ts'],
		environment: 'jsdom', // Next.js のコンポーネントをテストするなら jsdom
	},
	resolve: {
		alias: {
			'@': resolve(__dirname, './src'),
		},
	},
});

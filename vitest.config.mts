/// <reference types="vitest" />
/// <reference types="vite/client" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	css: { postcss: { plugins: [] } },
	test: {
		passWithNoTests: true,
		globals: true,
		coverage: {
			include: ['(app|components|utils)/**/*.{ts,tsx}'],
			all: true,
		},
		environment: 'jsdom',
		include: ['./tests/__tests__/**/*.test.{ts,tsx}'],
		setupFiles: ['./tests/setup-tests.ts'],
		watchExclude: ['.*\\/node_modules\\/.*', '.*\\/build\\/.*', '.*\\/postgres-data\\/.*'],
	},
});

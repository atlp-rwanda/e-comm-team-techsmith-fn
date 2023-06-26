import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [eslint()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', 'scss'],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.js',
    coverage: {
      reporter: ['text', 'json', 'html', 'lcov'],
    },
    exclude: [
      ...configDefaults.exclude,
      'src/states/**/*.js',
      'src/states/**/*.jsx',
      'src/stories/**/*.js',
      'src/__tests__/**/*.js',
    ],
    testTimeout: 30000,
  }
});

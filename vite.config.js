import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [eslint()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', 'scss'],
  },
  build: {
    chunkSizeWarningLimit: 10000, // Adjust the limit to your desired value
  }
});

import react from '@vitejs/plugin-react';
import WindiCSS from 'vite-plugin-windicss';
// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
export default {
  plugins: [react(), WindiCSS()],
  cors: false,
  test: {
    globals: true,
    environment: 'jsdom'
  }
};
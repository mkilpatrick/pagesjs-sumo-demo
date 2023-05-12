import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import yextSSG from "@yext/pages/vite-plugin";
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [
    react({
      // jsxImportSource: '@emotion/react',
    }), 
    yextSSG(),
    nodePolyfills(),
  ],
});

// import { defineConfig } from "vite";
// import reactRefresh from "@vitejs/plugin-react-refresh";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [reactRefresh()],
//   build: {
//     target: "es2018",
//   },
  
// });

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2018',
  },
});


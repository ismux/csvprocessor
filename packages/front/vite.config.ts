import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
/*export default defineConfig({
  plugins: [react()],
  server: { port: import.meta.env.VITE_APP_PORT !== undefined ? Number(import.meta.env.VITE_APP_PORT) : 5000 }
})
*/

process.env = {...process.env, ...loadEnv("", process.cwd())};

export default defineConfig({
    plugins: [react()],
    server: {
        port: process.env.VITE_APP_PORT !== undefined ? parseInt(process.env.VITE_APP_PORT) : 5000,
    }
});
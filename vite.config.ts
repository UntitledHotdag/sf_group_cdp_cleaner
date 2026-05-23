import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/sf_group_cdp_cleaner/',
  plugins: [react(), tailwindcss()],
})

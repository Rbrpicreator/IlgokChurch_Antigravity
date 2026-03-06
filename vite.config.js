import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // 반드시 양옆에 슬래시(/)가 있어야 합니다!
  base: '/IlgokChurch_Antigravity/', 
})
